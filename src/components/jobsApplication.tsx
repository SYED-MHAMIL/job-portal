import Link from "next/link";
import { MdMarkEmailRead } from "react-icons/md";
import { PiReadCvLogoFill } from "react-icons/pi";
import Image from "next/image";
type jobSapplicationType = {
  name: string;
  pic: string;
  email: string;
  resume: string;
  address: string;
  applicationText: string;
  companyName: string;
  jobTitle: string;
};

export default function JobsApplication({
  name,
  pic,
  email,
  resume,
  address,
  applicationText,

  jobTitle,
}: jobSapplicationType) {

  return (
    <>
      

      <div className="bg-white border border-white shadow-lg  rounded-3xl p-6 m-4  hover:scale-105 duration-500 ">
        <div className="flex-none sm:flex">
          <div className=" relative h-42 w-32 lg:min-w-32  sm:mb-0 mb-3">
            <Image
              width={200}
              height={200}
              src={pic}
              alt="aji"
              className=" w-70 h-52 object-cover rounded-2xl"
            />
            <a
              href="#"
              className="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </a>
          </div>
          <div className="flex-auto sm:ml-5 justify-evenly">
            <div className="flex items-center justify-between sm:mt-2">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="w-full flex-none text-lg mb-3 text-gray-800 font-bold leading-none">
                    {name}
                  </div>
                  <div className="flex-auto text-gray-500 my-1 ">
                    <div className="mr-3 bg-green-50 rounded-full mb-2 hover:bg-green-100 p-2">
                      {jobTitle}
                    </div>
                   
                    <div>
                      
                    <p className="bg-blue-50 p-2  text-wrap   mt-2 rounded-md hover:bg-blue-100">
                      {address}
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-gray-500   ">
              <p className="text-wrap">
                <span className="text-lg font-medium">application:</span>
                {applicationText + "Dsfsdfdskjfsdfj,sdfdsjfsd,jfsd,jfsd,jsdfjhsdj,fsdsds"}
              </p>
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <div className="flex items-center gap-1 text-gray-500 text-xl">
                <MdMarkEmailRead />
                <p>{email}</p>
              </div>

              <button className="flex items-center gap-1  text-white bg-blue-500 hover:bg-blue-600 shadow-sm rounded-md p-1">
                <PiReadCvLogoFill />
                <Link href={resume} target="_blank">
                  Get CV
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
