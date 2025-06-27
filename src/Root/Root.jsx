import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ScrollToTop } from "../Components/ScrollToTop";

const Root = () => {
  return (
    <div className="relative">
      <header className="fixed top-0 right-0 left-0 z-10">
        <NavBar />
      </header>
      <main className="min-h-[100vh]  w-11/12 mx-auto mb-10">
        <ScrollToTop/>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;