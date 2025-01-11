"use client";
import AuthForm from "@/components/auth-form";
import { auth, db } from "@/firebase/firebaseConfig";
import { UserRoleType } from "@/types/userRoleType";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { Bounce, toast } from "react-toastify";

export default function Signup() {
  const signupHandler = async (
    email: string,
    password: string,
    role?: UserRoleType
  ) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up

        const user = userCredential.user;
        saveUser(email, role!, user.uid);
        toast.success("Registration Succesfully",{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });

        // ...
      })
      .catch(() => {

        toast.error("User can't sucessfully sign up",{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        // ..
      });
  };

  const saveUser = async (email: string, role: UserRoleType, uid: string) => {
    const docRef = doc(db, "users", uid);
    const user = { email, role, uid };
    await setDoc(docRef, user);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <AuthForm isSign={true} func={signupHandler} />
      </div>
    </>
  );
}
