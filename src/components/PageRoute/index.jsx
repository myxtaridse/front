import React from "react";
import { Route } from "react-router-dom";
import Main from "../../pages/Main";
import User from "../../pages/User";

const index = () => {
  return (
    <>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<User />} />
    </>
  );
};

export default index;
