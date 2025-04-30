import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { routes } from "./components/routes";
import {ToastContainer} from 'react-toastify'
import { ClerkProvider } from "@clerk/clerk-react";

const renderRoutes = (routes) =>
  routes.map(({ path, element, children, index }, idx) => (
    <Route key={idx} path={path} element={element} index={index}>
      {children && renderRoutes(children)}
    </Route>
  ));

const App = () => {
  return (
    <Layout>
      <ToastContainer/>
      <Routes>{renderRoutes(routes)}</Routes>
    </Layout>
  );
};

export default App;
