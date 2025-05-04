import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import DashFooter from "../../components/DashFooter";

export default function DashLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <DashHeader />
      <main className="dash-container flex-grow-1">
        <Outlet />
      </main>
      <DashFooter />
    </div>
  );
}
