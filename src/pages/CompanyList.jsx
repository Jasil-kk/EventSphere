import React from "react";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { CategoryList } from "../components/CategoryList/CategoryList";

export const CompanyList = () => {
  return (
    <div>
      <Header />
      <CategoryList />
      <Footer />
    </div>
  );
};
