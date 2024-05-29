import React from "react";
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className="loading">
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loading;
