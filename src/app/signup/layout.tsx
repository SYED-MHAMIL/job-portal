
import LoginSignupProtectedRoute from "@/HOC/login-signup-protected-rote";
import { ReactNode } from "react";


type LaayoutLoginTYpe={
    children :ReactNode
}


export default function LoginLayout({children}:LaayoutLoginTYpe){
  
     

    return (
        <>
        <LoginSignupProtectedRoute>
         {children}
         </LoginSignupProtectedRoute>
        </>
    )


    
}


