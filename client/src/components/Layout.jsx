import React from "react";
import StudentNavbar from "./students/Navbar";
import EducatorNavbar from "./educator/Navbar";
import StudentFooter from "./students/Footer";
import EducatorFooter from "./educator/Footer";
import { useMatch } from "react-router-dom";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

const Layout = ({ children }) => {
  const isEducationRoute = useMatch("/educator/*");
  return (
    <div className="text-default min-h-screen bg-white">
      {isEducationRoute ? <EducatorNavbar /> : <StudentNavbar />}
      <SignInModal />
      <SignUpModal />
      <main>{children}</main>
      {isEducationRoute ? <EducatorFooter /> : <StudentFooter />}
    </div>
  );
};

export default Layout;
