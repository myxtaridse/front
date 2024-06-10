import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "../../axios";
import styles from "./DetailedCard.module.scss";
import Comment from "../Comment";
import avatarDemo from "../../assets/avatar-demo.png";
import Loading from "../Loading";
import errorPost from "../../assets/errorPost.png";
import LikedView from "../LikedView";

const DetailedCard = ({
  id,
  likes,
  comments,
  user,
  imageUrl,

  title,

  createdAt,
  isChangePost,
  setIsChangePost,
  setCopyAlert,

  allUsers,
}) => {
  const [isOpenComments, setIsOpenComments] = useState(true);
  const [isRemoveComment, setIsRemoveComment] = React.useState(false);
  const [text, setText] = useState("");
  const textRef = React.useRef();
  const [isLikedView, setIsLikedView] = React.useState(false);

  const [year, month, day] = createdAt.substr(0, 10).split("-");
  const date = `${day}.${month}.${year}`;

  const sortedImage = imageUrl?.split("").splice(0, 8)?.join("");
  const sortedAvatar = user?.avatarUrl?.split("").splice(0, 8)?.join("");

  const myId = useSelector((state) => state.userSlice.dataMyAcc?._id);
  const success = useSelector((state) => state.userSlice.status);

  const viewComments = [...comments];
  const splicedComments = viewComments.splice(
    comments.length - 2,
    comments.length
  );

  React.useEffect(() => {
    if (comments?.length <= 2) {
      setIsRemoveComment(true);
    }
  }, [comments?.length]);

  const onSendComment = () => {
    const reqComment = async () => {
      try {
        const commentsPushed = [...comments];
        commentsPushed.push({ nickname: myId, text });

        const { data } = await Axios.patch(`/posts/${id}`, {
          comments: [...commentsPushed],
        });
        setTimeout(() => {
          setIsChangePost(!isChangePost);
        }, 100);
        return data;
      } catch (err) {
        console.warn(err);
        window.location.reload();
      }
    };
    reqComment();
    setText("");
  };

  const onLikeClick = async () => {
    try {
      let likesPushed = [...likes];
      if (likesPushed.includes(myId)) {
        likesPushed = likesPushed.filter((likes) => likes !== myId);
      } else {
        likesPushed.push(myId);
      }
      const { data } = await Axios.patch(`/posts/${id}`, {
        likes: [...likesPushed],
      });
      setTimeout(() => {
        setIsChangePost(!isChangePost);
      }, 100);
      return data;
    } catch (err) {
      console.warn(err);
      window.location.reload();
    }
  };

  const copyHttp = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_API_URL}/${user?._id}`
    );
    setCopyAlert(true);
  };

  const sortedVideo = imageUrl
    ?.split("")
    .splice(imageUrl?.length - 3, imageUrl?.length)
    ?.join("");

  if (!success) {
    return <Loading />;
  }

  return (
    <div className={styles.card}>
      <Link to={`/${user._id}`}>
        <div className={styles.card__header}>
          <img
            width={40}
            src={
              sortedAvatar === "/uploads"
                ? `${process.env.REACT_APP_API_URL}${user?.avatarUrl}` !==
                  `undefined${user?.avatarUrl}`
                  ? `${process.env.REACT_APP_API_URL}${user?.avatarUrl}`
                  : avatarDemo
                : user?.avatarUrl
                ? user?.avatarUrl
                : avatarDemo
            }
            alt="avatarUser"
          />

          <h3>{user?.nickname?.toLowerCase()}</h3>
        </div>
      </Link>
      <div className={styles.card__image}>
        {sortedVideo === "mp4" || sortedVideo === "MOV" ? (
          <video controls autoplay loop width="100%">
            <source
              src={
                `${process.env.REACT_APP_API_URL}${imageUrl}` !==
                `undefined/${imageUrl}`
                  ? `${process.env.REACT_APP_API_URL}${imageUrl}`
                  : errorPost
              }
              type={`video/${sortedVideo}`}
            />
          </video>
        ) : (
          // <video
          //   autoPlay
          //   controls
          //   loop
          //   width="100%"
          //   height="100%"
          //   type={`video/${sortedVideo}`}
          //   src={

          //   }
          //   alt={errorPost}
          // ></video>
          <img
            src={
              sortedImage === "/uploads"
                ? // ? `http://localhost:4444${imageUrl}`
                  `${process.env.REACT_APP_API_URL}${imageUrl}` !==
                  `undefined${imageUrl}`
                  ? `${process.env.REACT_APP_API_URL}${imageUrl}`
                  : errorPost
                : imageUrl || errorPost
            }
            width={240}
            alt="card-post"
          />
        )}
      </div>
      <p className={styles.card__description}>{title}</p>
      <div className={styles.card__detalies}>
        <div onClick={onLikeClick}>
          {likes?.includes(myId) ? (
            <div className={styles.card__detalies__active}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
              >
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
              </svg>
            </div>
          ) : (
            <div className={styles.card__detalies__like}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="rgba(92,92,232,1)"
              >
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
              </svg>
            </div>
          )}
        </div>

        <div
          onClick={() => textRef.current.focus()}
          className={styles.card__detalies__like}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="">
            <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
          </svg>
        </div>
        <div onClick={copyHttp} className={styles.card__detalies__send}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="">
            <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
          </svg>
        </div>
      </div>
      <p
        onClick={() => {
          if (likes?.length > 0) {
            setIsLikedView(true);
          }
        }}
        className={styles.card__likesNum}
      >
        Оценили {likes?.length} человек
      </p>
      <div className={styles.card__comments}>
        {comments.length > 2 && isOpenComments ? (
          <>
            <span
              onClick={() => {
                setIsOpenComments(false);
                setIsRemoveComment(true);
              }}
              className={styles.card__comments__btn}
            >
              Показать остальные комментарии
            </span>
            {splicedComments.map((comment, i) =>
              allUsers
                ?.filter((user) => user._id === comment?.nickname)
                ?.map((user, i) => (
                  <Comment
                    key={i}
                    text={comment?.text}
                    nickname={user?.nickname}
                  />
                ))
            )}
          </>
        ) : (
          comments.map((comment) =>
            allUsers
              ?.filter((user) => user._id === comment?.nickname)
              .map((user, i) => (
                <Comment
                  key={i}
                  text={comment?.text}
                  nickname={user?.nickname}
                  isRemoveComment={isRemoveComment}
                  comments={comments}
                  id={comment?.nickname}
                  isChangePost={isChangePost}
                  setIsChangePost={setIsChangePost}
                  postId={id}
                />
              ))
          )
        )}
      </div>
      <div className={styles.card__commentsAdd}>
        <textarea
          ref={textRef}
          placeholder="Написать комментарий..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSendComment();
            }
          }}
        ></textarea>
        <button onClick={onSendComment}>Отправить</button>
      </div>
      <div className={styles.card__createDate}>
        <p>Создано {date}</p>
      </div>
      {isLikedView && (
        <LikedView
          isLikedView={isLikedView}
          setIsLikedView={setIsLikedView}
          likes={likes}
          allUsers={allUsers}
        />
      )}
    </div>
  );
};

export default DetailedCard;
