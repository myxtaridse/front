import React from "react";
import styles from "./HeaderAccount.module.scss";
import Popup from "../Popup";

import avatarDemo from "../../assets/avatar-demo.png";
import { fetchUserUpdate } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeUpdate } from "../../redux/slices/userSlice";

const HeaderAccount = ({
  avatarUrl,
  nickname,
  description,
  postsLength,
  url,
  subscribed,
  subscribers,
  isMyPage,
  isOpenModal,
  setIsOpenModal,
  setIsOpenNewPost,
  setIsIdRequest,
  setIsSubPopup,
  myId,
  id,
  isChangePost,
  setIsChangePost,
  setIsSubscribed,
  setIsSubscribers,
}) => {
  const dispatch = useDispatch();
  const clickRef = React.useRef();
  const sortedAvatar = avatarUrl?.split("").splice(0, 8)?.join("");
  const isMySubscription = subscribers?.includes(myId);
  const myData = useSelector((state) => state.userSlice.dataMyAcc);
  const [isPopup, setIsPopup] = React.useState(false);

  const subscribMy = async () => {
    try {
      let subscribersPushed = [...subscribers];
      if (subscribersPushed.includes(myId)) {
        subscribersPushed = subscribersPushed.filter((sub) => sub !== myId);
      } else {
        subscribersPushed.push(myId);
      }

      let subscribedChange = [...myData.subscribed];
      if (subscribedChange.includes(id)) {
        subscribedChange = subscribedChange.filter((sub) => sub !== id);
      } else {
        subscribedChange.push(id);
      }
      const userEdit = {
        subscribed: [...subscribedChange],
      };
      dispatch(fetchUserUpdate({ id, subscribersPushed }));

      dispatch(fetchMeUpdate({ userEdit }));
    } catch (err) {
      console.warn(err);
    }
    setIsChangePost(!isChangePost);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickRef.current &&
        !event.composedPath().includes(clickRef.current)
      ) {
        setIsPopup(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={clickRef} className={styles.header}>
      <div className={styles.header__img}>
        <img
          src={
            sortedAvatar === "/uploads"
              ? `${process.env.REACT_APP_API_URL}${avatarUrl}` !==
                `undefined${avatarUrl}`
                ? `${process.env.REACT_APP_API_URL}${avatarUrl}`
                : avatarDemo
              : avatarUrl
              ? avatarUrl
              : avatarDemo
          }
          alt="avatar"
        />
      </div>
      <div className={styles.header__detailes}>
        <div className={styles.header__detailes__setting}>
          <h1>{nickname}</h1>
          {isMyPage ? (
            <Popup
              setIsIdRequest={setIsIdRequest}
              isPopup={isPopup}
              setIsPopup={setIsPopup}
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
              setIsOpenNewPost={setIsOpenNewPost}
            />
          ) : isMySubscription ? (
            <button
              onClick={subscribMy}
              className={styles.header__detailes__setting__unsubscribe}
            >
              Отписаться
            </button>
          ) : (
            <button
              onClick={subscribMy}
              className={styles.header__detailes__setting__subscribe}
            >
              Подписаться
            </button>
          )}
        </div>
        <div className={styles.header__detailes__static}>
          <div>
            <h3>{postsLength}</h3>
            <p>публикаций</p>
          </div>
          <div
            onClick={() => {
              if (subscribers.length > 0) {
                setIsSubPopup(true);
                setIsSubscribers(true);
              }
            }}
          >
            <h3>{subscribers ? subscribers.length : 0}</h3>
            <p>подписчиков</p>
          </div>
          <div
            onClick={() => {
              if (subscribed.length > 0) {
                setIsSubPopup(true);
                setIsSubscribed(true);
              }
            }}
          >
            <h3>{subscribed ? subscribed.length : 0}</h3>
            <p>подписки</p>
          </div>
        </div>
        <div className={styles.header__detailes__about}>
          <p>{description}</p>
          <a href={url} target="_blank" rel="noreferrer">
            <div width={200}>{url}</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderAccount;
