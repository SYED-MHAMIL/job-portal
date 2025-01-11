"use client"
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JobSeekerNavbar() {
  const route = useRouter()
  return (
<div className="navbar bg-base-100 border-b">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><Link href={"/jobseeker/"}>All jobs</Link></li>
          <li><Link href={"/jobseeker/applied-jobs"}>Applied jobs</Link></li>
          <li><Link href={`/jobseeker/favourite-jobs`}>favorite</Link></li>
    
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <a className="btn btn-ghost text-2xl">Job Portal</a>
    </div>
    <div className="navbar-end">
      <button className="btn btn-ghost  hover:bg-red-600  hover:text-white border-red-600 lg:text-xl text-red-600 text-md  " onClick={()=>{
        signOut(auth)
        route.push("/login")
      }}>
         
           Logout
     
      </button>
    </div>
  </div>
  );
}
