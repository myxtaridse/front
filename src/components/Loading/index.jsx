import React from "react";
import styles from "./Loading.module.scss";
import Modal from "react-modal";

const Loading = ({ isLoading, setIsLoading }) => {
  const closeModal = () => {
    setIsLoading(false);
  };

  if (isLoading === "success") {
    closeModal();
  }

  return (
    <Modal
      className="popupModalLoading"
      isOpen={isLoading}
      onRequestClose={isLoading === false}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        content: {
          border: "none",
          outline: "none",
        },
      }}
    >
      <div className="loading">
        <span className={styles.loader}></span>
      </div>
    </Modal>
  );
};

export default Loading;
