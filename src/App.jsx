import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./app.scss";

import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Main from "./pages/Main";
import User from "./pages/User";
import Register from "./pages/Register";
import { Loading } from "./components";
import NotFound from "./pages/NotFound";

const App = () => {
  const auth = localStorage.getItem("token");

  const Main = React.lazy(() =>
    import(/* webpackChunkName: "Main" */ "./pages/Main")
  );
  const User = React.lazy(() =>
    import(/* webpackChunkName: "User" */ "./pages/User")
  );
  const NotFound = React.lazy(() =>
    import(/* webpackChunkName: "User" */ "./pages/NotFound")
  );

  return (
    <Routes>
      <Route path="" element={auth ? <MainLayout /> : <Login />}>
        <>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<Loading />}>
                <Main />
              </React.Suspense>
            }
          />
          <Route
            path="/:id"
            element={
              <React.Suspense fallback={<Loading />}>
                <User />
              </React.Suspense>
            }
          />
          <Route
            path="/404"
            element={
              <React.Suspense fallback={<Loading />}>
                <NotFound />
              </React.Suspense>
            }
          />
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
