import React from "react";
import Navbar from "./students/Navbar";
import Footer from "./students/Footer";
import { useMatch } from "react-router-dom";

const Layout = ({ children }) => {
const isEducationRoute = useMatch("/educator/*");
  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducationRoute && <Navbar />}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;