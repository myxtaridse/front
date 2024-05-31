import Modal from "react-modal";
import styles from "./SubPopup.module.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Axios from "../../axios";
import Subs from "../Subs";
import { fetchUserAll } from "../../redux/slices/authSlice";

const SubPopup = ({
  isSubPopup,
  setIsSubPopup,
  myData,
  isChangePost,
  setIsChangePost,
}) => {
  const closeModal = () => {
    setIsSubPopup(false);
    setIsChangePost(!isChangePost);
  };

  console.log("123");

  const [title, setTitle] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const status = useSelector((state) => state.authSlice.status);
  const dataSub = useSelector((state) => state.authSlice.dataUser);

  const subs = myData.subscribed;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserAll());
  }, []);

  // const subFiltered = dataSub.filter(
  //   (user) => user._id === subs.map((index) => index)
  // );

  console.log(dataSub, subs);

  const isAuth = Boolean(status === "success");

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

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
        <h2>Ваши подписки</h2>
        {dataSub?.length > 0 &&
          subs?.map((subId) =>
            dataSub
              ?.filter((user) => user._id === subId)
              .map((user) => <Subs user={user} />)
          )}
      </div>
    </Modal>
  );
};

export default SubPopup;
