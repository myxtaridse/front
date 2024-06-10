import React from "react";
import styles from "./Toast.module.scss";
import broke from "../../assets/folder-close-fill.svg";
import check from "../../assets/checkbox-circle-fill.svg";

const Toast = ({ copyAlert, setCopyAlert, title, subTitle }) => {
  if (copyAlert) {
    setTimeout(() => {
      setCopyAlert(false);
    }, 5000);
  }

  const closeIcon = () => {
    setCopyAlert(false);
  };

  return (
    <div className={styles.toast}>
      <div className={styles.toast__content}>
        <div className={styles.toast__check} width={40}>
          <img src={title === "Буфер обмена" ? check : broke} alt="message" />
        </div>

        <div className={styles.toast__content__message}>
          <span className={styles.toast__content__message__text1}>{title}</span>
          <span className={styles.toast__content__message__text2}>
            {subTitle}
          </span>
        </div>
      </div>
      <div className={styles.toast__close} width={30} onClick={closeIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
        </svg>
      </div>
      <div className={styles.toast__progress}></div>
    </div>
  );
};

export default Toast;
