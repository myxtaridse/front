import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = ({ dataUser }) => {
  return (
    <div className="wrapper">
      <Header dataUser={dataUser} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
