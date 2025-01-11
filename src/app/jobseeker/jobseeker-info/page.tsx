

"use client";

import { auth, db, storage } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompanyInfo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const uploadData = async () => {
    setError(""); // Clear previous errors

    if (!name || !description || !address || !phone || !pic || !resume) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const [picURL, resumeURL] = await Promise.all([
        uploadFile(pic, "images"),
        uploadFile(resume, "resumes"),
      ]);

      await saveJobSeekerInfo(picURL, resumeURL);
      router.push("/jobseeker");
    } catch (error) {
      console.error(error);
      setError("An error occurred while uploading data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fileName = `${auth.currentUser?.uid}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error), // Handle upload error
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const saveJobSeekerInfo = async (picURL: string, resumeURL: string) => {
    const docId = auth.currentUser?.uid;
    if (!docId) {
      throw new Error("User is not authenticated.");
    }

    const jobseeker = {
      name,
      description,
      address,
      phone,
      pic: picURL,
      resume: resumeURL,
    };

    const userRef = doc(db, "users", docId);
    await setDoc(userRef, jobseeker, { merge: true });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-black">
        Job Seeker{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          Information
        </span>
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 tracking-wide lg:tracking-wider">
        Please enter the job seeker details.
      </p>

      <div className="card bg-base-100 lg:w-[500px] w-96 shadow-xl mx-4 p-8 gap-2">
        {error && <p className="text-red-500">{error}</p>}

          <h3 className="text-gray-500 font-semibold">Name:</h3>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

          <h3 className="text-gray-500 font-semibold">Description:</h3>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

          <h3 className="text-gray-500 font-semibold">Address:</h3>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

          <h3 className="text-gray-500 font-semibold">Phone:</h3>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

          <h3 className="text-gray-500 font-semibold">Your Pic:</h3>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="file"
            className="file-input w-full"
            onChange={(e) => setPic(e.target.files?.[0] || null)}
          />
        </label>

          <h3 className="text-gray-500 font-semibold">Resume:</h3>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="file"
            className="file-input w-full"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
          />
        </label>

        <button className="btn btn-primary" onClick={uploadData} disabled={loading}>
          {loading ? "Uploading..." : "Save Job Seeker Details"}
        </button>
      </div>
    </div>
  );
}
