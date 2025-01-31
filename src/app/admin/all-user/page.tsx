"use client";
import { db } from "@/firebase/firebaseConfig";
import { collection, DocumentData, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export default function Page() {
  const [fetchAllJobs, setFetchAllJobs] = useState<DocumentData[]>([]);
  const [isLoding, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const collectionRef = collection(db, "users");
    const snaper=query(collectionRef,where("role" ,"!=", "admin"))
    const unsub = onSnapshot(snaper, (snaps) => {
      const todos = snaps.docs.map((docDataSnap) => {
        return docDataSnap.data();
      });

      setIsLoading(false);
      setFetchAllJobs(todos);
      console.log(todos);
    });

    return unsub;
  };

  return (
    <>
      <div>
        {
          isLoding ? (
            <div
              role="status"
              className="flex items-center justify-center w-full h-screen"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            fetchAllJobs.length > 0 && (
              <div className="font-[sans-serif] overflow-x-auto m-2">
                <table className="min-w-full bg-white">
                  <thead className="whitespace-nowrap">
                    <tr>
                      <th className="pl-4 w-8">
                        <input
                          id="checkbox"
                          type="checkbox"
                          className="hidden peer"
                        />
                        <label
                          htmlFor="checkbox"
                          className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full fill-white"
                            viewBox="0 0 520 520"
                          >
                            <path
                              d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                              data-name="7-Check"
                              data-original="#000000"
                            />
                          </svg>
                        </label>
                      </th>
                      <th className="p-4 text-left text-sm font-semibold text-black">
                        Name
                      </th>
                      <th className="p-4 text-left text-sm font-semibold text-black">
                        Role
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2"
                          viewBox="0 0 401.998 401.998"
                        >
                          <path
                            d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                            data-original="#000000"
                          />
                        </svg>
                      </th>
                      <th className="p-4 text-left text-sm font-semibold text-black">
                        Active
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2"
                          viewBox="0 0 401.998 401.998"
                        >
                          <path
                            d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                            data-original="#000000"
                          />
                        </svg>
                      </th>
                      <th className="p-4 text-left text-sm font-semibold text-black">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="whitespace-nowrap">
                    {fetchAllJobs.map(({ email, name, pic, role },i) => (
                      <tr key={i} className="odd:bg-blue-50">
                        <td className="pl-4 w-8">
                          <input
                            id="checkbox1"
                            type="checkbox"
                            className="hidden peer"
                          />
                          <label
                            htmlFor="checkbox1"
                            className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full fill-white"
                              viewBox="0 0 520 520"
                            >
                              <path
                                d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                                data-name="7-Check"
                                data-original="#000000"
                              />
                            </svg>
                          </label>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="flex items-center cursor-pointer w-max">
                            <Image
                              height={200}
                              width={200}
                              alt="df"
                              src={pic || "/img.png"}
                              className="w-9 h-9 object-contain rounded-full shrink-0"
                            />
                            <div className="ml-4">
                              <p className="text-sm text-black">{name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-black">{role}</td>
                        <td className="p-4">
                          <label className="relative cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
                          </label>
                        </td>
                        <td className="p-4">
                          <button className="mr-4" title="Edit">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 fill-blue-500 hover:fill-blue-700"
                              viewBox="0 0 348.882 348.882"
                            >
                              <path
                                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                data-original="#000000"
                              />
                              <path
                                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                data-original="#000000"
                              />
                            </svg>
                          </button>
                          <button title="Delete">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 fill-red-500 hover:fill-red-700"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000"
                              />
                              <path
                                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )

         
        }
      </div>
    </>
  );
}
