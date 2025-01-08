"use client"
import AppliedJobCard from "@/components/applied-job-card"
import { useAuthContext } from "@/context/auth.context"
import { auth, db } from "@/firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button, Result } from 'antd';


export default function AppliedJob(){
 
    const [fetchApplcate,setFetchApplcate]=useState<DocumentData[]>([]);
const [isLoding,setIsLoading]=useState(false)
const {user}=useAuthContext()!
  const router=useRouter()
          
    useEffect(()=>{
      if(user && user?.role === "job seeker" && !( "name" in user)){
        router.push("/jobseeker/jobseeker-info");
      }
        fetchData()
    },[])

    const fetchData= async()=>{
        setIsLoading(true)

        const applidRef=collection(db,"application");

        
          let uid=auth.currentUser?.uid
        let q = where("jobseekerUid", "==", uid);
        let jobQuery = query(applidRef, q);
        let unsub=onSnapshot(jobQuery,async(snaps)=>{  
 
          let todos=snaps.docs.map(async(docDataSnap)=>{
            let applicationData =docDataSnap.data();
            let jobDocId=docDataSnap.data().jobId;
            let  applicatedId=docDataSnap.id;
         
console.log(jobDocId);

           const jobRef= doc(db,"jobs",jobDocId);
        const  jobData= await  getDoc(jobRef) ;
        console.log(jobData);
        

        const allDataJobs={
            ...jobData.data(),
             applicationData,
             applicatedId,
              
        }
                   return allDataJobs;
         

        });
             console.log(todos);

             let setAllData=  await Promise.all(todos)
             console.log(setAllData);

             setIsLoading(false)
             setFetchApplcate(setAllData)
             
    
    
        })

        return ()=>unsub;

}




    
    return (
        <>
        {isLoding ? 
        <div role="status" className="flex items-center justify-center w-full h-screen">
    <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div> : 
 fetchApplcate.length > 0  ?
                <>
                <h1 className="mb-4 text-2xl text-center my-5 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black">Applied <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">Jobs</mark> </h1>
                <div className=" flex flex-wrap justify-center ">
                    {fetchApplcate.length > 0 &&
                        fetchApplcate.map(({ jobTitle, jobDescription, jobType, address, salaryRange, docId }) => (
                            <AppliedJobCard key={docId} jobTitle={jobTitle} jobDescription={jobDescription} jobType={jobType} address={address} salary={salaryRange} />
                        ))}
                </div></>

               :  
               <Result
               status="404"
               title="404"
               subTitle="Sorry, You have not applied for the job  yet"
               extra={<Button type="primary"  onClick={()=>{
                 router.push("/jobseeker")
               }}  >Go for Apply</Button>}
             />
             
              
        }
        </>
    )

}