import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/index";
import { ThemeProvider } from "../provider/ThemeProvider";

const MainLayout = ({ dataUser }) => {
  return (
    <ThemeProvider>
      <div className="wrapper">
        <Header dataUser={dataUser} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
