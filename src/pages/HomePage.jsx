import React from "react";
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import { MainCategories } from "../components/MainCategories/MainCategories";
import { Popular } from "../components/Popular/Popular";
import { Footer } from "../components/Footer/Footer";

export const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <MainCategories />
      <Popular />
      <Footer />
    </div>
  );
};
