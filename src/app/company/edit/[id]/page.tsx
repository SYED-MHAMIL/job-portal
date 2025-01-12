"use client";

import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

type ParamsType = {
  params: { id: string };
};

export default function EditJobs({ params: { id } }: ParamsType) {
//   const [index, setIndex] = useState("");3
 
  const [jobTitle, setJobTitle] = useState("");
  const [jd, setJD] = useState("");
  const [qualification, setQualification] = useState("");
  const [skillSet, setSkillSet] = useState("");
  const [otherReq, setOtherReq] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [address, setAddress] = useState("");

  const  route =  useRouter();

 const updateData=async()=>{
    const docRef = doc(db, "jobs", id);
         
    await updateDoc(docRef , {jobTitle,jd,qualification,skillSet,otherReq,jobType,salaryRange
,address
    })
  
    toast.success("successfully Update !" ,{
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

    
route.push("/company/all-jobs")

 }



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const docRef = doc(db, "jobs", id);

    try {
      const dataSnaps = await getDoc(docRef);
      const address1 = dataSnaps.data()?.address;
      const jobDescription1 = dataSnaps.data()?.jobDescription;
      const jobTitle1 = dataSnaps.data()?.jobTitle;
      const jobType1 = dataSnaps.data()?.jobType;
      const otherRequirements1 = dataSnaps.data()?.otherRequirements;
      const qualification1 = dataSnaps.data()?.qualification;
      const salaryRange1 = dataSnaps.data()?.salaryRange;
      const skillSet1 = dataSnaps.data()?.skillSet;

      
      setAddress(address1);
      setJD(jobDescription1);
      setJobTitle(jobTitle1);
      setJobType(jobType1);
      setOtherReq(otherRequirements1);
      setQualification(qualification1);
      setSalaryRange(salaryRange1);
      setSkillSet(skillSet1)


    } catch (error) {
     toast.error(`don't edit : ${error}` ,{
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
  };

  return <>
  
  <div className="flex flex-col justify-center items-center mt-20 ">
  <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-black">Jobs  <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Requirement</span></h1>
<p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 tracking-widest mb-2	"> Please enter the jobs requirement</p>


        <div className="card bg-base-100 lg:w-[500px]     w-96  shadow-xl gap-2 p-4 border">
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => { setJobTitle(e.target.value) }}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Job Description"
                    value={jd}
                    onChange={(e) => { setJD(e.target.value) }}
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Qualification"
                    value={qualification}
                    onChange={(e) => { setQualification(e.target.value) }}
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Skill Set"
                    value={skillSet}
                    onChange={(e) => { setSkillSet(e.target.value) }}
                />
            </label>


            <textarea className="textarea border border-gray-300  " placeholder="Other Requirements"
                value={otherReq}
                onChange={(e) => { setOtherReq(e.target.value) }}
            >

            </textarea>

            <select
                className="select select-bordered w-full"
                value={jobType}
                defaultValue={"Job Type"}
                onChange={(e) => { setJobType(e.target.value) }}
            >
                <option disabled>
                    Job Type
                </option>
                <option value={"internship"}>Internship</option>
                <option value={"contract"}>Contract</option>
                <option value={"part time"}>Part Time</option>
                <option value={"full time"}>Full Time</option>
            </select>

            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Salary Range"
                    value={salaryRange}
                    onChange={(e) => { setSalaryRange(e.target.value) }}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                />
            </label>
            <button className="btn btn-primary"
                onClick={updateData}
            >Update Job</button>


        </div>


    </div>
    </>
}
