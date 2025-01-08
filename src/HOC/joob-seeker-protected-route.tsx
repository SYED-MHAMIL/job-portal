import { useAuthContext } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";




export default function JobseekerProtectedRoute({children}:{children :ReactNode}){

    const {user}=useAuthContext()!
 const route =useRouter()
 
    useEffect(()=>{
        

        if (user?.role === "job seeker") {
            route.push("/jobseeker");
          } else if (user?.role === "admin") {
            route.push("/admin");
          }
          
          if(user && user?.role === "job seeker" && !( "name" in user)){
            route.push("/jobseeker/jobseeker-info");
          }else if(user && user?.role === "job seeker" && ( "name" in user)){
            route.push("/jobseeker")
          }
      

    },[user])




     return <>
         {children}
     </>


}