import React from "react";
import { useDispatch } from "react-redux";
import { fetchUserUpdate } from "../../redux/slices/authSlice";
import { fetchMeUpdate } from "../../redux/slices/userSlice";
import styles from "./Subs.module.scss";
import avatarDemo from "../../assets/avatar-demo.png";

const Subs = ({ user, isSubscribed, myData, closeModal }) => {
  const dispatch = useDispatch();
  const sortedAvatar = user?.avatarUrl?.split("").splice(0, 8)?.join("");

  const removeSubs = ({ setIsChangePost, isChangePost }) => {
    if (window.confirm("Вы действительно хотите убрать подписку?")) {
      try {
        let subscribedFilter = [...myData?.subscribed];
        subscribedFilter = subscribedFilter.filter((sub) => sub !== user?._id);

        let subscribersPushed = [...user?.subscribed];
        subscribersPushed = subscribersPushed.filter(
          (sub) => sub !== myData?._id
        );

        const userEdit = {
          subscribed: [...subscribedFilter],
        };
        const id = user?._id;
        dispatch(fetchUserUpdate({ id, subscribersPushed }));
        dispatch(fetchMeUpdate({ userEdit }));
        setTimeout(() => {
          setIsChangePost(!isChangePost);
        }, 100);
      } catch (err) {
        console.warn(err);
      }
      closeModal();
    }
  };

  return (
    <div className={styles.subs}>
      <div className={styles.subs__imnick}>
        <img
          src={
            sortedAvatar === "/uploads"
              ? `${process.env.REACT_APP_API_URL}${user?.avatarUrl}` !==
                `undefined${user?.avatarUrl}`
                ? `${process.env.REACT_APP_API_URL}${user?.avatarUrl}`
                : avatarDemo
              : user?.avatarUrl || avatarDemo
          }
          alt="avatar"
        />
        <p className={styles.subs__imnick__nickname}>{user?.nickname}</p>
      </div>
      {isSubscribed && (
        <div onClick={removeSubs} className={styles.subs__iconRem}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(92,92,255,1)"
          >
            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Subs;
