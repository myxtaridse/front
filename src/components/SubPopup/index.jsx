import React from "react";
import Modal from "react-modal";
import styles from "./SubPopup.module.scss";
import Subs from "../Subs";

const SubPopup = ({
  isSubPopup,
  setIsSubPopup,

  isChangePost,
  setIsChangePost,
  isSubscribed,
  myData,
  titleModal,
  setIsSubscribed,
  setIsSubscribers,
  subs,
  allUsers,
}) => {
  const closeModal = () => {
    setIsSubPopup(false);
    setIsSubscribed(false);
    setIsSubscribers(false);
    setTimeout(() => {
      setIsChangePost(!isChangePost);
    }, 100);
  };

  return (
    <Modal
      className="popupModal"
      isOpen={isSubPopup}
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
      <div className={styles.edit}>
        <h2>{titleModal}</h2>
        {subs?.length > 0 &&
          subs?.map((subId) =>
            allUsers
              ?.filter((user) => user._id === subId)
              .map((user) => (
                <Subs
                  user={user}
                  isSubscribed={isSubscribed}
                  myData={myData}
                  isChangePost={isChangePost}
                  setIsChangePost={setIsChangePost}
                  closeModal={closeModal}
                />
              ))
          )}
      </div>
    </Modal>
  );
};

export default SubPopup;
