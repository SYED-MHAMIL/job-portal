"use client";

import { db } from "@/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

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
  hold?: boolean;
  deleted?: boolean;
};

export default function AdminCard({
  jobTitle,
  jobDescription,
  qualification,
  jobType,
  companyName,
  companyLogo,
  salary,
  hold,
  deleted,
  jobID,
}: JobCardType) {
  const jobRef = doc(db, "jobs", jobID);
  const holdStatus = async () => {
    if (hold) {
      await updateDoc(jobRef, { hold: false });
    } else {
      await updateDoc(jobRef, { hold: true });
    }
  };

  const deletedStatus = async () => {
    if (deleted) {
      await updateDoc(jobRef, { deleted: false });
    } else {
      await updateDoc(jobRef, { deleted: true });
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
              <Image 
               height={100}
               width={100}
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
              <div className="dropdown dropdown-top">
                <div
                  tabIndex={0}
                  role="button"
                  className=" flex text-center justify-center items-center text-white bg-blue-600 hover:bg-blue-700 rounded-full py-2 pl-3 px-2"
                >
                  action
                  <IoIosArrowDown />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li className="bg-gray-100 rounded-md" onClick={holdStatus}>
                    <a>{hold ? "Publish" : "Hold"}</a>
                  </li>
                  <li onClick={deletedStatus}>
                    <a>{deleted ? "Recover" : "Delete"}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
