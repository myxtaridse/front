import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserUpdate } from "../../redux/slices/authSlice";
import styles from "./Subs.module.scss";
import avatarDemo from "../../assets/avatar-demo.png";
import { fetchMeUpdate } from "../../redux/slices/userSlice";

const Subs = ({ user }) => {
  const sortedAvatar = user?.avatarUrl?.split("").splice(0, 8)?.join("");
  const dispatch = useDispatch();
  const removeSubs = () => {
    // if (window.confirm("Вы действительно хотите убрать подписку?")) {
    //     try {
    //         let subscribersPushed = [...subscribers];
    //           subscribersPushed = subscribersPushed.filter((sub) => sub !== myId);
    //         let subscribedChange = [...myData.subscribed];
    //           subscribedChange = subscribedChange.filter((sub) => sub !== id);
    //         const userEdit = {
    //           subscribed: [...subscribedChange],
    //         };
    //         dispatch(fetchUserUpdate({ id, subscribersPushed }));
    //         dispatch(fetchMeUpdate({ userEdit }));
    //         setIsChangePost(!isChangePost);
    //       } catch (err) {
    //         console.warn(err);
    //       }
  };

  return (
    <div className={styles.subs}>
      <div className={styles.subs__imnick}>
        <img
          src={
            sortedAvatar === "/uploads"
              ? // ? `http://localhost:4444${imageUrl}`
                `${process.env.REACT_APP_API_URL}${user?.avatarUrl}` !==
                `undefined${user?.avatarUrl}`
                ? `${process.env.REACT_APP_API_URL}${user?.avatarUrl}`
                : avatarDemo
              : user?.avatarUrl || avatarDemo
          }
          alt="avatar"
        />
        <p className={styles.subs__imnick__nickname}>{user?.nickname}</p>
      </div>
      <p className={styles.subs__description}>{user?.description}</p>
      <div onClick={removeSubs} className={styles.subs__iconRem}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="rgba(92,92,255,1)"
        >
          <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Subs;
