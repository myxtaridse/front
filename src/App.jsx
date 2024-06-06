import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./app.scss";

import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Main from "./pages/Main";
import User from "./pages/User";
import Register from "./pages/Register";

const App = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");

  // React.useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/auth");
  //   }
  // }, [navigate]);

  return (
    <Routes>
      <Route path="" element={auth ? <MainLayout /> : <Login />}>
        <>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<User />} />
        </>
      </Route>
      <>
        <Route path="/auth" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </>
    </Routes>
  );
};

export default App;
