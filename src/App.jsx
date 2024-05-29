import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./app.scss";

import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Main from "./pages/Main";
import User from "./pages/User";
import Register from "./pages/Register";
import axios from "axios";

const App = () => {
  React.useEffect(() => {
    const req = async () => {
      const res = await axios.get("http://localhost:4444/posts");
      console.log(res);
    };
    req();
  }, []);

  const [isIdRequest, setIsIdRequest] = React.useState(true);
  const navigate = useNavigate();
  const [dataUser, setDataUser] = React.useState();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route
        path=""
        element={<MainLayout dataUser={dataUser} isIdRequest={isIdRequest} />}
      >
        <>
          <Route
            path="/"
            element={localStorage.getItem("token") ? <Main /> : <Login />}
          />
          <Route
            path="/:id"
            element={
              <User dataUser={dataUser} setIsIdRequest={setIsIdRequest} />
            }
          />
        </>

        <>
          <Route path="/auth" element={<Login setDataUser={setDataUser} />} />
          <Route
            path="/register"
            element={<Register setDataUser={setDataUser} />}
          />
        </>
      </Route>
    </Routes>
  );
};

export default App;
