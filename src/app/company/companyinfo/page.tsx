"use client";

import { useAuthContext } from "@/context/auth.context";
import { auth, db, storage } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState, } from "react";
import { Bounce, toast } from "react-toastify";

export default function CompanyInfo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState<File>();
   
 const router=useRouter();
 const {user}=useAuthContext()!


 useEffect(()=>{
  if(user && user?.role === "company" && ( "name" in user)){
    router.push("/company/create-new-job");
  }
 },[])





  const uploadLogo = () => {
    if (!name || !description || !address || !phone || !logo) {
      toast.error("All fields are required.",{
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
      return;
    }

    const storageRef = ref(storage, `images/${makeImageName(logo)}`);
    const uploadTask = uploadBytesResumable(storageRef, logo);

    uploadTask.on("state_changed", async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        saveCompanyInfo(downloadURL);
        router.push('/company/create-new-job')




      } catch (error) {
       toast.error(`Error getting download URL${error}`,{
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
      }
    });
  };

  const saveCompanyInfo = async (logoURL: string) => {
    const company = {
      name,
      description,
      address,
      phone,
      logo: logoURL,
    };

    const docId = auth?.currentUser?.uid;
    if (!docId) {
      console.log("User not authenticated.");
      return;
    }

    const userRef = doc(db, "users", docId);

    try {
      await setDoc(userRef, company, { merge: true });
      console.log("Company information saved successfully.");
    } catch (error) {
      console.error("Error saving company information:", error);
    }
  };

  const makeImageName = (file: File) => {
    const imageName = file.name.split(".");
    const lastIndex = imageName.length - 1;
    const imageType = imageName[lastIndex];
    const newName = `${auth?.currentUser?.uid || "default_user"}.${imageType}`;
    return newName;
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 ">
      <h1 className="mb-4  text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-black">
        Jobs{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          Company Information
        </span>
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 tracking-widest">
        Please enter your company details.
      </p>

      <div className="card bg-base-100 w-96  lg:w-[500px]  shadow-xl p-6">
        <h3 className="text-gray-500 font-semibold">Name:</h3>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="text"
            className="grow"
            placeholder="Company Name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <h3 className="text-gray-500 font-semibold">Description:</h3>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="text"
            className="grow"
            placeholder="Company Description"
            value={description}
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <h3 className="text-gray-500 font-semibold">Adress:</h3>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            required
            type="text"
            className="grow"
            placeholder="Company Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </label>
        <h3 className="text-gray-500 font-semibold">Phone no:</h3>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            required
            type="number"
            className="grow"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </label>
        <h3 className="text-gray-500 font-semibold">Pic:</h3>
        <label className="input input-bordered flex items-center gap-2 mb-4 p-2">
          <input
            type="file"
            required
            className="file-input w-full "
            onChange={(e) => {
              const files = e.target.files;
              if (files?.length) {
                setLogo(files[0]);
              }
            }}
          />
        </label>
        <button className="btn btn-primary" onClick={uploadLogo}>
          Save Company Details
        </button>
      </div>
    </div>
  );
}































// "use client";

// import { auth, db, storage } from "@/firebase/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"; 
// import { useState } from "react";

// export default function CompanyInfo() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [logo, setLogo] = useState<File>();

//   const uploadLogo = () => {
//     if (!name || !description || !address || !phone || !logo) return;

//     const storageRef = ref(storage, `images/${makeImageName()}`);
//     const uploadTask = uploadBytesResumable(storageRef, logo!);
//     uploadTask.on(
//       "state_changed",
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log("File available at", downloadURL);
//           saveCompanyInfo(downloadURL);
//         });
//       }
//     );
//   };

//   const saveCompanyInfo = async (logoURL: string) => {
//     const company = {
//       name,
//       description,
//       address,
//       phone,
//       logo: logoURL,
//     };
//     const docId = auth?.currentUser?.uid;
//     const userRef = doc(db, "users", docId!);

//     try {
//       await setDoc(userRef, company, { merge: true });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const makeImageName = () => {
//     const imageName = logo!?.name.split(".");
//     const lastIndex = imageName?.length - 1;
//     const imageType = imageName[lastIndex];
//     const newName = `${auth.currentUser?.uid}.${imageType}`;
//     return newName;
//   };

//   return (
//     <div className="flex flex-col justify-center items-center mt-20 ">
//       <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-black">Jobs  <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Company Information</span></h1>
// <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 tracking-widest	"> Please enter your company details.</p>

   
//       <div className="card bg-base-100 w-96  lg:w-[500px]  shadow-xl p-6">
//        <h3  className="text-gray-500 font-semibold">Name:</h3>
//         <label className="input input-bordered flex items-center gap-2 mb-4">
           
//           <input
//             type="text"
//             className="grow"
//             placeholder="Company Name"
//             required
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//           />
//         </label>
//        <h3  className="text-gray-500 font-semibold">Description:</h3>

//         <label className="input input-bordered flex items-center gap-2 mb-4">
//           <input
//             type="text"
//             className="grow"
//             placeholder="Company Description"
//             value={description}
//             required
//             onChange={(e) => {
//               setDescription(e.target.value);
//             }}
//           />
//         </label>
//         <h3 className="text-gray-500 font-semibold">Adress:</h3>

//         <label className="input input-bordered flex items-center gap-2 mb-4">
//           <input
//           required
//             type="text"
//             className="grow"
//             placeholder="Company Address"
//             value={address}
//             onChange={(e) => {
//               setAddress(e.target.value);
//             }}
//           />
//         </label>
//         <h3 className="text-gray-500 font-semibold">Phone no:</h3>

//         <label className="input input-bordered flex items-center gap-2 mb-4">
//           <input
//           required
//             type="number"
//             className="grow"
//             placeholder="Phone number"
//             value={phone}
//             onChange={(e) => {
//               setPhone(e.target.value);
//             }}
//           />
//         </label>
//         <h3 className="text-gray-500 font-semibold">Pic:</h3>

//         <label className="input input-bordered flex items-center gap-2 mb-4 p-2">
//           <input
//             type="file"
//             required
//             className="file-input w-full "
//             onChange={(e) => {
//               const files = e.target.files;
//               if (files?.length) {
//                 setLogo(files[0]);
//               }
//             }}
//           />
//         </label>
//         <button className="btn btn-primary" onClick={uploadLogo}>
//           Save Company Details
//         </button>
//       </div>
//     </div>
//   );
// }

