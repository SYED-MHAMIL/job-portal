
"use client";
import { auth, db } from "@/firebase/firebaseConfig";
import { UserType } from "@/types/user-type";
import { UserRoleType } from "@/types/userRoleType";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ChildrenType = {
  children: ReactNode;
};

type ContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

const AuthContext = createContext<ContextType | null>(null);

export default function AuthContextProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<UserType | null>(null);

  const route = useRouter();

  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        fetchuserData(uid);
      } else {
        setUser(null);
      }
    });
    console.log(user, "Sdsadsaasdasdasdasd");
  }, []);

  
  const fetchuserData = async (uid: string) => {
    let docRef = doc(db, "users", uid);
    try {
      let userFound = await getDoc(docRef);
      let userOne = userFound.data();
      
      if (!userOne) return;
      setUser(userOne as UserType);
      console.log(user,"conUsser");

     
      
    } catch (e) {
      console.error("error:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
