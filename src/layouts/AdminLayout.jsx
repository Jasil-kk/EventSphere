import React from "react";
import {Header} from "../components/Header/Header"
import {AdminSidebar} from "../components/AdminSidebar/AdminSidebar"

export const AdminLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <AdminSidebar />
        {children}
      </div>
    </div>
  );
};
