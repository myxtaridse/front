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
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          zIndex: "100",
        },
        content: {
          border: "none",
          outline: "none",
        },
      }}
    >
      <div className={styles.loading}>
        <span className={styles.loading__loader}></span>
      </div>
    </Modal>
  );
};

export default Loading;
