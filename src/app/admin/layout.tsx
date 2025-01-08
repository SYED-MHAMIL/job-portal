"use client";

import AdminNavBar from "@/components/admin-navbar";
import JobSeekerNavbar from "@/components/jobseeker-navbar";
import AdminProtectedRoutes from "@/HOC/admin-protected-rote copy";
import CompanyProtectedRoutes from "@/HOC/company-protected-rote";

import { ReactNode } from "react";
type CompanyLayoutTypes = {
  children: ReactNode;
};



export default function CompanyLayout({ children }: CompanyLayoutTypes) {


  return (<AdminProtectedRoutes>
    <AdminNavBar />
    {children}
  </AdminProtectedRoutes>);


}
