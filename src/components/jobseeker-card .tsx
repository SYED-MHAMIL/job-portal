"use client";

import { useAuthContext } from "@/context/auth.context";
import { auth, db } from "@/firebase/firebaseConfig";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type JobCardType = {
  jobTitle: string;
  jobDescription: string;
  jobType: string;
  address: string;
  companyName: string;
  companyLogo: string;
  salary: string;
  jobID: string;
  qualification: string;
};

export default function JobseekerCard({
  jobTitle,
  jobDescription,
  jobType,
  address,
  companyName,
  companyLogo,
  salary,
  jobID,
  qualification,
}: JobCardType) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [exists, setExists] = useState<DocumentData[]>([]);
  const [favourite, setFavourite] = useState<DocumentData[]>([]);

  const { user } = useAuthContext()!;

  const fetchApplication = async () => {
    const collectionRef = collection(db, "application");
    const uid = user?.uid;
    const q = where("jobseekerUid", "==", uid);
    const q2 = where("jobId", "==", jobID);
    const jobQuery = query(collectionRef, q, q2);

    onSnapshot(jobQuery, async (snaps) => {
      const result = snaps.docs.map((data) => {
        return data.data();
      });

      setExists(result);
    });
  };
  //fetch fav who favourited users
  const FavJob = async () => {
    const collectionRef = collection(db, "favourite");
    const uid = user?.uid;
    const q = where("jobseekerUid", "==", uid);
    const q2 = where("jobID", "==", jobID);
    const jobQuery = query(collectionRef, q, q2);

    onSnapshot(jobQuery, async (snaps) => {
      const result = snaps.docs.map((data) => {
        return data.data();
      });

      setFavourite(result);
    });
  };

  const route = useRouter();
  // const jobIdHandler = () => {
  //   exists.length > 0
  //     ? exists.map((data) => {
  //         return (
  //           data.jobId === jobID &&
  //           toast.error("You have Already Applied job check other")
  //         );
  //       })
  //     : route.push(`/jobseeker/${jobID}`);
  // };


  const jobIdHandler = () => {
    // Check if the job ID already exists in the list
    const alreadyApplied = exists.some((data) => data.jobId === jobID);
  
    if (alreadyApplied) {
      // If already applied, show an error toast
      toast.error("You have already applied for this job. Check other jobs.");
    } else {
      // If not applied, navigate to the job details page
      route.push(`/jobseeker/${jobID}`);
    }
  };





  const favHandler = async () => {
    setIsDisabled(true); // Disable the button while the operation is ongoing
  
    const docRef = collection(db, "favourite");
  
    try {
      // Check if the job is already in the favourite list
      const alreadyFavourite = favourite.some((data) => data.jobID === jobID);
  
      if (alreadyFavourite) {
        // Show an error toast if the job is already marked as favourite
        toast.error("You have already favorited this job. Check others.");
      } else {
        // Add the job to the "favourite" collection
        await addDoc(docRef, {
          jobseekerUid: auth.currentUser?.uid,
          jobID,
          jobTitle,
          jobDescription,
          jobType,
          address,
          companyName,
          companyLogo,
          salary,
        });
  
        // Navigate to the "favourite jobs" page
        route.push(`/jobseeker/favourite-jobs`);
      }
    } catch (error) {
      // Handle errors and display them to the user
      toast.error(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      // Re-enable the button after the operation
      setIsDisabled(false);
    }
  };
  



  // const favHandler = async () => {
  //   setIsDisabled(true);
  //   const docRed = collection(db, "favourite");
  //   try {
  //     favourite.length > 0
  //       ? favourite.map((data) => {
  //           return (
  //             data.jobID === jobID &&
  //             toast.error("You have Already favorite job check other")
  //           );
  //         })
  //       : await addDoc(docRed, {
  //           jobseekerUid: auth.currentUser?.uid,
  //           jobID,
  //           jobTitle,
  //           jobDescription,
  //           jobType,
  //           address,
  //           companyName,
  //           companyLogo,
  //           salary,
  //         });

  //     route.push(`/jobseeker/favourite-jobs`);
  //   } catch (error) {
  //     toast.error(error instanceof Error);
  //   }
  //   setIsDisabled(false);
  // };

  useEffect(() => {
    fetchAllJobs();
    fetchApplication();
    FavJob();
  }, []);

  const fetchAllJobs = async () => {
    const jobsRef = collection(db, "application");
    const uid = auth.currentUser?.uid;
    const q = where("jobseekerUid", "==", uid);
    const jobQuery = query(jobsRef, q);
    try {
      const allJobsSnapshot = await getDocs(jobQuery);
      const allJobs = allJobsSnapshot.docs.map((doc) => {
        const obj = doc.data();

        obj.id = doc.id;
        return obj;
      });
      console.log(allJobs);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="m-5  hover:scale-105 duration-500 ">
        <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto ">
          <a
            href="#"
            className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
          >
            <div className="group relative h-16 w-16 overflow-hidden rounded-lg m-3">
              <img
                src={companyLogo}
                alt=""
                className="h-full w-full object-cover text-gray-700"
              />
            </div>
          </a>
          <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
            <h3 className="text-sm text-gray-600">{companyName}</h3>
            <div className="flex justify-between items-center ">
              <a
                href="#"
                className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
              >
                {jobTitle}
              </a>
            </div>
            <div className="break-words whitespace-normal  pr-4 ">
              {jobDescription}
            </div>
            <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
              <div className="">
                Education:
                <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                  {qualification}
                </span>
              </div>

              <div className="">
                Salary:
                <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                  {salary}
                </span>
              </div>

              <div className="">
                <span className="bg-green-500 rounded-full uppercase text-white text-sm px-3 py-1 font-bold shadow-xl sm:text-base sm:px-4 sm:py-1.5 md:text-lg md:px-3 md:py-2 lg:text-xl lg:px-6 lg:py-2.5 xl:text-sm xl:px-3 xl:py-2">
                  {jobType}
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
              {
                <button
                  disabled={isDisabled}
                  className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
                  onClick={jobIdHandler}
                >
                  {exists.length > 0
                    ? exists.map((data) => {
                        return data.jobId === jobID && "Applied job";
                      })
                    : "Apply job"}
                </button>
                //  <button>applied</button>
              }
              <button
                disabled={isDisabled}
                className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
                onClick={favHandler}
              >
                {exists.length > 0
                  ? exists.map((data) => {
                      return data.jobId === jobID && "Favorite job!";
                    })
                  : isDisabled
                  ? "loading..."
                  : "Favourite job"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
