"use client";

import { auth, db, storage } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompanyInfo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState<File>();
  const [picURL, setPicURL] = useState("")
  const [resumeURL,setResumeURL]=useState("");
  const [resume,setResume]=useState<File>();
  const [loading,setLoading]=useState(false);

const router=useRouter()
  // const route = useRouter();

const uploadData=()=>{
  if (!name || !description || !address || !phone || !resume || !pic) return;
    
   uploadPic()
   uploadReseme()

}

   useEffect(()=>{
     
        if(picURL && resumeURL){
             saveJobSeekerInfo()
        }

   },[picURL,resumeURL])


  const uploadPic = () => {


    const storageRef = ref(storage, `images/${makeImageName(pic)}`);
    const uploadTask = uploadBytesResumable(storageRef, pic!);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setPicURL(downloadURL);
        });
      }
    );
  };


  const uploadReseme = () => {

    

    const storageRef = ref(storage, `images/${makeImageName(resume)}`);
    const uploadTask = uploadBytesResumable(storageRef, resume!);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setResumeURL(downloadURL);
        });
      }
    );
  };

  const saveJobSeekerInfo = async () => {
    setLoading(true)
    const jobseeker = {
      name,
      description,
      address,
      phone,
      pic:picURL,
      resume:resumeURL
    };
    let docId = auth.currentUser?.uid;
    let userRef = doc(db, "users", docId!);

    try {
      await setDoc(userRef, jobseeker , {merge: true});
      router.push('/jobseeker')
    } catch (e) {
      console.log(e);
    }
    setLoading(false)
  };

  const makeImageName = (image: File | undefined)=> {
    let imageName = image?.name.split(".");
    let lastIndex = imageName!?.length - 1;
    let imageType = imageName![lastIndex];
    let newName = `${auth.currentUser?.uid}.${imageType}`;
    return newName;
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 ">

    
      <h1 className="mb-4 text-2xl   font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-black">Job seeker  <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Information</span></h1>
<p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 tracking-wide	 lg:tracking-wider"> Please enter the jobseeker details.</p>

   

      <div className="card bg-base-100 lg:w-[500px] w-96 shadow-xl mx-4 p-2 gap-2">
       <h3  className="text-gray-500 font-semibold">Name:</h3>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
       <h3  className="text-gray-500 font-semibold">Description:</h3>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <h3  className="text-gray-500 font-semibold">Address:</h3>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </label>
        <h3  className="text-gray-500 font-semibold">Phone:</h3>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </label>
        <h3  className="text-gray-500 font-semibold">Your pic:</h3>

        <label className="input input-bordered flex items-center gap-2 ">
         
        <input
            type="file"
            className="file-input w-full "
            onChange={(e) => {
              let files = e.target.files;
              if (files?.length) {
                setPic(files[0]);
              }
            }}
          />   
        </label> 
        <h3  className="text-gray-500 font-semibold">Resume:</h3>
        
        <label className="input input-bordered flex items-center gap-2">
        <input
            type="file"
            className="file-input w-full "
            onChange={(e) => {
              let files = e.target.files;
              if (files?.length) {
                setResume(files[0]);
              }
            }}
          />
        </label>

        <button className="btn btn-primary" onClick={uploadData}>
       {   loading ? "loading ...." : "Save Company Details"}
        </button>
      </div>
    </div>
  );
}
