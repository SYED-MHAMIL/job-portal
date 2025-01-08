"use client"
import { auth, db } from "@/firebase/firebaseConfig"
import { addDoc, collection, doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Bounce, toast } from "react-toastify"


type paramsType={
   params : {jobId :string}
}


export default  function  JobId({params :{jobId}}:paramsType){

    const [applicationText,setApplicationText]=useState("");
    const [comapnyUid,setComapnyUid]=useState("");
    const [isDisabled,setIsDisabled]=useState(false);

    const route=useRouter();
   
useEffect(()=>{
   fetchData()
},[])

   const fetchData=async()=>{
      
   let jobRef=doc(db,"jobs",jobId);
   let data =await getDoc(jobRef);
let jobData=data.data()
console.log(jobData);
let CompanyUidForm =jobData?.uid
setComapnyUid(CompanyUidForm)

   }

   const SubmitAppliaction=async()=>{
       
      let jobseekerUid= auth.currentUser?.uid
    
      const application={
   jobId,
   comapnyUid,
   applicationText,
   jobseekerUid
    }

    console.log(application);
    

     const docRef= collection(db,"application")
     
     try {
            setIsDisabled(true)
          await addDoc(docRef,application);
          toast.success("Successfully Submit !",{
            position: "top-center",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,

          })

        route.push("/jobseeker")

         
     } catch (error) {
           console.log(error);
           
     }


   }


   return(


    <>
      

<div className="flex items-center  mt-40 pt-0 flex-col w-full h-screen">

<h1 className="mb-4 text-2xl text-center my-5 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black">Write a Cover <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">letter</mark> </h1>



  
  <div className="relative w-1/2 min-w-[200px]">
    <textarea
      className="peer h-full min-h-[100px] w-full resize-none border-gray-300 rounded-[7px] border-1 border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-600 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" ">
      </textarea>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[10px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 ">
       Write a Application
    </label>
  <button disabled={isDisabled} className="mr-2 my-1 uppercase tracking-wider px-2 w-full text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer" onClick={SubmitAppliaction}>Submit Appliaction</button>

  </div>





</div>




    
    </>
   )

}
