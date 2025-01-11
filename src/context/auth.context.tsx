
"use client";
import { auth, db } from "@/firebase/firebaseConfig";
import { UserType } from "@/types/user-type";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
    const docRef = doc(db, "users", uid);
    try {
      const userFound = await getDoc(docRef);
      const userOne = userFound.data();
      
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
