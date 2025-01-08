"use client"
import AuthForm from "@/components/auth-form";
import { auth } from "@/firebase/firebaseConfig";
import { UserRoleType } from "@/types/userRoleType"
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function  Login(){
 
    const loginHander= async(email:string,password:string)=>{
         
       await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          toast.success("Login Successfull"
          )
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          
          toast.error(errorMessage)
        });
    }
      

     

return(
    <>
    

    <div className="flex items-center justify-center  bg-white h-screen">
              <AuthForm isSign={false} func={loginHander}/>
              </div>
    
    
    </>
)


}