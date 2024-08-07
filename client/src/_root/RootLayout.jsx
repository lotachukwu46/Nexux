import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useTheme } from "./context/ThemeContext";
import "./rootLayout.scss";

const RootLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`root-layout ${theme}`}>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
