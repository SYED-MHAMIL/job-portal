"use client";


import { useAuthContext } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type CompanyProtectedRoutesTypes = {
  children: ReactNode;
};

export default function CompanyProtectedRoutes({
  children
}: CompanyProtectedRoutesTypes) {
  const { user } = useAuthContext()!;
  const route = useRouter();

  useEffect(() => {


    if (user?.role === "job seeker") {
      route.push("/jobseeker");
    } else if (user?.role === "admin") {
      route.push("/admin");
    }
    
    
    if(user && user?.role === "company" && !( "name" in user)){
      route.push("/company/companyinfo");
    }
    if(user && user?.role === "company" && ( "name" in user)){
      route.push("/company/create-new-job");
    }
   


  }, [user]);

  return <>
       {children}
  </>
}
