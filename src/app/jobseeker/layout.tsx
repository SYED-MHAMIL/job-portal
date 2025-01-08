"use client";

import JobSeekerNavbar from "@/components/jobseeker-navbar";
import JobseekerProtectedRoute from "@/HOC/joob-seeker-protected-route";

import { ReactNode } from "react";
type JobseekerLayoutTypes = {
  children: ReactNode;
};



export default function CompanyLayout({ children }: JobseekerLayoutTypes) {


  return (<JobseekerProtectedRoute>
    <JobSeekerNavbar />
    {children}
  </JobseekerProtectedRoute>);


}
