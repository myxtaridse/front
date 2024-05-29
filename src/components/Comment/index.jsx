import React from "react";
import styles from "./Comment.module.scss";

const index = ({ text, nickname }) => {
  return (
    <div className={styles.comments}>
      <p className={styles.comments__name}>{nickname.toLowerCase()}: </p>

      <p className={styles.comments__text}>{text}</p>
    </div>
  );
};

export default index;
