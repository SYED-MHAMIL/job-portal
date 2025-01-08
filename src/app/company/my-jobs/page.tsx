"use client";

import JobCard from "@/components/job-card";
import { useAuthContext } from "@/context/auth.context";
// import JobCard from "@/components/job-card";

import { auth, db } from "@/firebase/firebaseConfig";
 
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AllJobs() {
  const { user } = useAuthContext()!;
  const [companyJobs, setCompanyJobs] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    if (!user) return;
    fetchAllJobs();
  }, [user]);

  const fetchAllJobs = async () => {

    let jobsRef = collection(db, "jobs"); 
    let uid = user?.uid;
    let q = where("uid", "==", uid);
    let jobQuery = query(jobsRef, q);
    try {
      setIsLoading(true)

      // let allJobsSnapshot = await getDocs(jobQuery);
     
    let array=[]
   
      const unsubscribe = onSnapshot(jobQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
                         
            let id =change.doc.id

            array.push({...change.doc.data(),id})
            
            console.log(array);
                    
                  setIsLoading(false)
                  setCompanyJobs(array);
                  console.log(companyJobs);
                  
              // console.log("New city: ", change.doc.data());
          }
          if (change.type === "modified") {
              // console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {

              // console.log("Removed city: ", change.doc.data())
              setCompanyJobs((prev)=> prev.filter((item)=> item.id !== change.doc.id ))
              
            }
          });
        });
   
        
        
        
        setIsLoading(false);

    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <>
    {isLoading ? 
    <div role="status" className="flex items-center justify-center w-full h-screen">
<svg aria-hidden="true" className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
<span className="sr-only">Loading...</span>
</div> : 
companyJobs.length > 0  ?
            <>
            <h1 className="mb-4 text-2xl text-center my-5 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black">Created <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">Jobs!</mark> </h1>
            <div className=" flex flex-wrap justify-center ">
                {
  
  companyJobs.map(({ jobTitle, jobDescription,jobType ,address,id,deleted,hold}) => (
    <JobCard key={id} jobTitle={jobTitle} jobDescription={jobDescription} jobType={jobType} address={address} jobId={id} deleted={deleted} hold={hold}/>
  ))}
            </div></>

           :  
           <div className="flex w-full h-screen items-center justify-center p-4">
           <a
             href="#"
             className="block w-full max-w-sm p-9 border border-gray-200 rounded-lg shadow text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 lg:max-w-md sm:max-w-xs"
           >
             <h5 className="mb-2 text-xl sm:text-lg lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               No Data Found!
             </h5>
             <p className="font-normal text-white dark:text-white-400 text-sm sm:text-xs lg:text-base">
               Please Create  the jobs. After that, data will be shown.
             </p>
           </a>
         </div>
}
          
    
    </>
);

}
