"use client";



import { useAuthContext } from "@/context/auth.context";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {


  const { user } = useAuthContext()!;
  const route = useRouter();
  useEffect(() => {
  
    
    onAuthStateChanged(auth,(username)=>{
     if (username) {
        //  console.log(username,"username");
         
      if (user?.role === "job seeker") {
        route.push("/jobseeker");
      } else if (user?.role === "company") {
        route.push("/company/companyinfo");
      } else if (user?.role === "admin") {
        route.push("/admin/all-jobs");
      } 
     }else{
          route.push("/signup")
     }
  
  
    })
   
      

      }, [user]);



  

  return (
      <>
     <div className="w-full h-screen flex items-center justify-center">


      <div className="loader    font-bold font-mono text-[30px] w-fit">
      <span className="loader-text">Loading...</span>
    </div>
      </div>

{/* <AuthForm/> */}
      </>
 
  );
}
