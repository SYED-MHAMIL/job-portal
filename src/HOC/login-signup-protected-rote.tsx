
"use client";

import { useAuthContext } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type LoginSignupProtectedRouteTypes = {
  children: ReactNode;
};

export default function LoginSignupProtectedRoute({
  children
}: LoginSignupProtectedRouteTypes) {
  const { user } = useAuthContext()!;
  const route = useRouter();

  useEffect(() => {
   

        if (user?.role === "job seeker") {
          route.push("/jobseeker");
        } else if (user?.role === "company") {
          route.push("/company/companyinfo");
        }else if(user?.role === "admin"){
          route.push("/admin/all-jobs")
        }
    
  }, [user]);

  return <>
       {children}
  </>
}
