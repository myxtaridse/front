import React from "react";
import styles from "./Toast.module.scss";

const Toast = ({ copyAlert, setCopyAlert }) => {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(92,92,232,1)"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
          </svg>
        </div>

        <div className={styles.toast__content__message}>
          <span className={styles.toast__content__message__text1}>
            Буфер обмена
          </span>
          <span className={styles.toast__content__message__text2}>
            Ссылка на аккаунт скопирована!
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
