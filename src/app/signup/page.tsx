"use client"
import AuthForm from "@/components/auth-form";
import { auth, db } from "@/firebase/firebaseConfig";
import { UserRoleType } from "@/types/userRoleType";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function Signup(){
 
  const  [error ,setError]=useState("");
  const  [msg ,setMsg]=useState("");



    const signupHandler=async(email:string,password:string,role?:UserRoleType)=>{
     
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        
        const user = userCredential.user;
          toast.success("Registration Succesfully"
          )
        saveUser(email ,role!,user.uid)
        toast.success("Registration Succesfully"
          )

            
          
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

          toast.error(errorMessage)
            // ..
          });
    }


        const saveUser=async(email:string ,  role:UserRoleType, uid:string)=>{
              
             const docRef= doc(db,"users",uid);
              const user= {email , role , uid}
             await setDoc(docRef , user)
                    
        }


return(
    <>
    <div className="flex items-center justify-center mt-20">
              <AuthForm isSign={true} func={signupHandler}/>
              </div>
    
</>
)


}