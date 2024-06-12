import React from "react";
import styles from "./NotFound.module.scss";
import notFound from "../../assets/notFound.svg";
import logo from "../../assets/logo-white.svg";
import { Link } from "react-router-dom";
import { Header } from "../../components";

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <div className={styles.notfound__image}>
        <img width={80} src={notFound} alt="ничего не найдено" />
        <h2>Ничего не найдено</h2>
      </div>
    </div>
  );
};

export default NotFound;
