import React from "react";
import styles from "./Loading.module.scss";
import Modal from "react-modal";

const Loading = ({ isLoading, setIsLoading }) => {
  const closeModal = () => {
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (isLoading === "success") {
      closeModal();
    }
  }, [isLoading]);

  return (
    <Modal
      className="popupModalLoading"
      isOpen={isLoading}
      onRequestClose={!isLoading}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
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
