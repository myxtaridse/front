import Modal from "react-modal";
import styles from "./SubPopup.module.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Subs from "../Subs";
import { fetchUserAll } from "../../redux/slices/authSlice";

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
}) => {
  const dispatch = useDispatch();
  const dataSub = useSelector((state) => state.authSlice.dataUserAll);

  const closeModal = () => {
    setIsSubPopup(false);
    setIsSubscribed(false);
    setIsSubscribers(false);
    setIsChangePost(!isChangePost);
    window.location.reload();
  };

  React.useEffect(() => {
    dispatch(fetchUserAll());
  }, [dispatch]);

  return (
    <Modal
      className="popupModal"
      isOpen={isSubPopup}
      onRequestClose={closeModal}
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
      <div className={styles.edit}>
        <h2>{titleModal}</h2>
        {subs?.length > 0 &&
          subs?.map((subId) =>
            dataSub
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
