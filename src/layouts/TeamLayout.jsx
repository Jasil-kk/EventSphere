import React from "react";
import { Header } from "../components/Header/Header";
import { TeamSidebar } from "../components/TeamSidebar/TeamSidebar";

export const TeamLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <TeamSidebar />
        {children}
      </div>
    </div>
  );
};
