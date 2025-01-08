"use client";

import JobsApplication from "@/components/jobsApplication";
import { app, auth,  } from "@/firebase/firebaseConfig";
import { collection, doc, DocumentData, getDoc, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
const db = getFirestore(app);

export default function SeeApplications() {
  


    const [fetchAllJobs,setFetchAllJobs]= useState<DocumentData[]>([]);
    const [isLoding,setIsLoading]=useState(false)
   
    let uid=auth.currentUser?.uid;
    useEffect(()=>{
        if(uid){

            fetchData()
        }
    },[])
       
    
    const fetchData= async()=>{

         setIsLoading(true)
         
         console.log(uid);
         
            let collectionRef=collection(db,"application");
            const q = query(collectionRef, where("comapnyUid", "==", uid));
try {

            let unsub=onSnapshot(q,async(snaps)=>{  
     
              let todos=snaps.docs.map(async(docDataSnap)=>{
    
                                let jobData =docDataSnap.data();
                                let companyUid=docDataSnap.data().comapnyUid;
                                let  docId=docDataSnap.id;
                                            
                               const companyRef= doc(db,"users",companyUid);
                            const  companyData= await  getDoc(companyRef) ;
    

                            const jobRef= doc(db,"users",docDataSnap.data()?.jobseekerUid);
                            const  jobRefSnaps= await  getDoc(jobRef) ;
                            const   jobseekerData = jobRefSnaps.data();
                             

                            const companyCreatedJob= doc(db,"jobs", docDataSnap.data()?.jobId);
                            const  companyJobSnap= await  getDoc(companyCreatedJob) ;
                            const   companyOffer = companyJobSnap.data();

    

                            const allDataJobs={
                                ...jobData,
                                docId,
                               companyAllData : companyData.data(),
                               ...jobseekerData,
                               companyOffer
                            }
                                       return allDataJobs;
                                    
                  
          
            });
                //  console.log(todos);
    
                 let setAllData=  await Promise.all(todos)
                 console.log(setAllData);
                 setIsLoading(false)
                 setFetchAllJobs(setAllData)
                 
        
        
            })
    
            return unsub;
    
    }
 catch (error) {
    console.log(error);
    
}

    
    
        }
    




    return (
        <>
        



        <h1 className="mb-4 text-2xl text-center my-5 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black">Jobs <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">Application</mark> </h1>

{/* 

<div className="relative overflow-x-auto shadow-md m-3 rounded-md bg-white border transform duration-500 hover:-translate-y-5 flex items-center justify-center ">
     */}

<div className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover">
	<div className="absolute opacity-80 inset-0 z-0"></div>

	<div className="max-w-3xl w-full mx-auto z-10">
		<div className="flex flex-col">

{
    fetchAllJobs.length > 0  &&
    fetchAllJobs.map(({name,pic,jobId,email,resume,address,applicationText,companyAllData,companyOffer},i)=>(
        
<JobsApplication key={jobId+1} name={name} pic={pic} email={email} resume={resume} address={address} applicationText={applicationText} companyName={companyAllData.name} jobTitle={companyOffer.jobTitle}/>
    ))
}


   
        
    </div>
    </div>
    </div>
    
{/* </div> */}


        
        
        </>
    )

}
