"use client"
import AuthForm from "@/components/auth-form";
import { auth } from "@/firebase/firebaseConfig";

import { signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

export default function  Login(){
 
    const loginHander= async(email:string,password:string)=>{
         
       await signInWithEmailAndPassword(auth, email, password)
        .then(() => {


          toast.success("Login Successfull",{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    }
          )
        })
        .catch(() => {;
       
          
          toast.error("User not Found",{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            })
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