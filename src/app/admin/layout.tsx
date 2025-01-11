"use client";

import AdminNavBar from "@/components/admin-navbar";

import AdminProtectedRoutes from "@/HOC/admin-protected-rote copy";

import { ReactNode } from "react";
type CompanyLayoutTypes = {
  children: ReactNode;
};

export default function CompanyLayout({ children }: CompanyLayoutTypes) {
  return (
    <AdminProtectedRoutes>
      <AdminNavBar />
      {children}
    </AdminProtectedRoutes>
  );
}
