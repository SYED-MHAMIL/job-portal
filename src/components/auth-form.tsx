"use client"

import { UserRoleType } from "@/types/userRoleType"
import Link from "next/link";
import { useState } from "react"

 type AuthFormType={
    
  isSign? : boolean;
  func:(email:string,password:string,role?:UserRoleType)=>void

 }



export default function AuthForm({isSign,func}:AuthFormType){

  const  [email,setEmail]=useState("");
  const  [password,setPassword]=useState("");
  const  [role,setRole]=useState<UserRoleType>();
  
   return (
    <>
    <div className="card bg-base-100 w-96 shadow-2xl border  p-4">
    <label className="input input-bordered flex items-center gap-2 mt-2">
  <input type="email" className="grow" placeholder="Email"value={email} onChange={(e)=> setEmail(e.target.value)} />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
<label className="input input-bordered flex items-center gap-2 mt-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="password" className="grow" placeholder="Password"  value={password} onChange={(e)=> setPassword(e.target.value)}/>
</label>

{isSign &&<select className="select w-full border-2  border-gray-300 mt-2" onChange={(e)=>setRole(e.target.value as UserRoleType)}>
  <option disabled selected>Save as ?</option>
  <option value={"company"}>company</option>
  <option value={"job seeker"}>Job seeker</option>
  
</select>}

{ !isSign ?<div>
  <p>     don't have an account? <span className="text-[#4b0082] font-bold"><Link href={"/signup"}>Signup here.</Link></span></p>
</div>

:<div>
  <p>         Already have an account? <span className="text-[#4b0082] font-bold"><Link href={"/login"} className="text-red">Login here.</Link></span></p>
</div>
}



<button className="btn btn-primary" onClick={()=> {func(email,password,role)}}>{isSign ? "Sign up" : "Login"}</button>
</div>


    </>
   )

}

