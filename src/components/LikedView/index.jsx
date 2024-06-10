import React from "react";
import Modal from "react-modal";
import styles from "../SubPopup/SubPopup.module.scss";
import Subs from "../Subs";

const LikedView = ({ isLikedView, setIsLikedView, likes, allUsers }) => {
  const closeModal = () => {
    setIsLikedView(false);

    // setTimeout(() => {
    //   setIsChangePost(!isChangePost);
    // }, 100);
  };
  const theme = window.localStorage?.getItem("theme");

  return (
    <Modal
      className="popupModal"
      isOpen={isLikedView}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: "100",
        },
        content: {
          border: "none",
          outline: "none",
        },
      }}
    >
      <div
        style={{
          backgroundColor: theme === "dark" ? "#171717" : "#fff",
          color: theme === "dark" ? "#fff" : "#171717",
        }}
        className={styles.edit}
      >
        <h2>Публикация понравилась : </h2>
        {likes?.length > 0 &&
          likes?.map((subId) =>
            allUsers
              ?.filter((user) => user._id === subId)
              .map((user) => <Subs user={user} theme={theme} />)
          )}
      </div>
    </Modal>
  );
};

export default LikedView;
