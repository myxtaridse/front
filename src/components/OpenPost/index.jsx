import React from "react";
import Modal from "react-modal";
import Axios from "../../axios";
import { useDispatch } from "react-redux";
import styles from "./OpenPost.module.scss";
import { fetchPostsRemove } from "../../redux/slices/postsSlice";
import errorPost from "../../assets/errorPost.png";
import Comment from "../Comment";
import LikedView from "../LikedView";
import VideoPlayer from "../VideoPlayer";
import { dateFunc } from "../../utils";

const OpenPost = ({
  post,
  modalIsOpen,
  setIsOpen,
  isChangePost,
  setIsChangePost,
  allUsers,
  id,
  myData,
}) => {
  const dispatch = useDispatch();
  const widthRef = React.useRef();
  const commentRef = React.useRef();
  const [isOpenComments, setIsOpenComments] = React.useState(true);
  const [text, setText] = React.useState("");
  const [isRemoveComment, setIsRemoveComment] = React.useState(false);
  const sortedImage = post?.imageUrl?.split("").splice(0, 8)?.join("");
  const myId = myData?._id;
  const [isLikedView, setIsLikedView] = React.useState(false);

  const createdAt = post?.createdAt;

  const { date, dayMonth, createMonth, daysBetween, declOfNum } = dateFunc({
    createdAt,
  });

  React.useEffect(() => {
    if (id === myId) {
      setIsRemoveComment(true);
    }
  }, [id, myId]);

  let i = 0;
  let placeholder = "";
  const txt = "Написать комментарий...";
  const speed = 120;

  const type = () => {
    placeholder += txt.charAt(i);
    commentRef?.current?.setAttribute("placeholder", placeholder);
    i++;
    setTimeout(type, speed);
  };

  const comments = post?.comments;
  const viewComments = [...comments];
  const splicedComments = viewComments.splice(
    comments.length - 2,
    comments.length
  );

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSendComment = () => {
    const reqComment = async () => {
      try {
        const commentsPushed = [...post.comments];
        commentsPushed.push({ nickname: myId, text });
        const { data } = await Axios.patch(`/posts/${post._id}`, {
          comments: [...commentsPushed],
        });
        setTimeout(() => {
          setIsChangePost(!isChangePost);
        }, 100);
        return data;
      } catch (err) {
        console.warn(err);
      }
    };
    reqComment();
    setText("");
  };

  const onLikeClick = async () => {
    try {
      let likesPushed = [...post.likes];
      if (likesPushed.includes(myId)) {
        likesPushed = likesPushed.filter((likes) => likes !== myId);
      } else {
        likesPushed.push(myId);
      }
      const { data } = await Axios.patch(`/posts/${post._id}`, {
        likes: [...likesPushed],
      });
      setTimeout(() => {
        setIsChangePost(!isChangePost);
      }, 100);
      return data;
    } catch (err) {
      console.warn(err);
    }
  };

  const deletePost = async () => {
    if (window.confirm("Вы действительно хотите удалить пост?")) {
      dispatch(fetchPostsRemove(post._id));
      setTimeout(() => {
        setIsChangePost(!isChangePost);
      }, 100);
    }
  };
  const sortedVideo = post?.imageUrl
    ?.split("")
    .splice(post?.imageUrl?.length - 3, post?.imageUrl?.length)
    ?.join("")
    .toLowerCase();

  React.useEffect(() => {
    if (comments?.length <= 2) {
      setIsRemoveComment(true);
    }
  }, [comments?.length]);

  const theme = window.localStorage?.getItem("theme");

  return (
    <Modal
      className="popupModal"
      isOpen={modalIsOpen}
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
        style={{ backgroundColor: theme === "dark" ? "#171717" : "#fff" }}
        className={styles.popup}
      >
        <div className={styles.popup__image}>
          {sortedVideo === "mp4" || sortedVideo === "" ? (
            `${process.env.REACT_APP_API_URL}${post?.imageUrl}` !==
            `undefined${post?.imageUrl}` ? (
              <div className={styles.popup__video}>
                <VideoPlayer
                  imageUrl={post?.imageUrl}
                  sortedVideo={sortedVideo}
                />
              </div>
            ) : (
              <img src={errorPost} />
            )
          ) : (
            // <div className={styles.popup__video}>
            //   <VideoPlayer
            //     imageUrl={post?.imageUrl}
            //     sortedVideo={sortedVideo}
            //   />
            // </div>
            <img
              src={
                sortedImage === "/uploads"
                  ? `http://localhost:4444${post?.imageUrl}`
                  : // `${process.env.REACT_APP_API_URL}${post?.imageUrl}` !==
                    // `undefined${post?.imageUrl}`
                    // ? `${process.env.REACT_APP_API_URL}${post?.imageUrl}`
                    // : errorPost
                    post?.imageUrl || errorPost
              }
              width={240}
              alt="post"
            />
          )}
        </div>
        <p
          style={{ color: theme === "dark" ? "#fff" : "#333" }}
          className={styles.popup__description}
        >
          {post?.title}
        </p>
        <div className={styles.popup__detalies}>
          <div className={styles.popup__detalies__icons}>
            <div onClick={onLikeClick}>
              {post?.likes.includes(myId) ? (
                <div className={styles.popup__detalies__icons__active}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(92,92,232,1)"
                  >
                    <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
                  </svg>
                </div>
              ) : (
                <div className={styles.popup__detalies__icons__like}>
                  <svg
                    style={{
                      fill: theme === "dark" ? "#fff" : "rgb(92, 92, 232)",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                  </svg>
                </div>
              )}
            </div>

            <div
              className={styles.popup__detalies__icons__like}
              onClick={() => {
                commentRef.current.focus();
                type();
              }}
            >
              <svg
                style={{
                  fill: theme === "dark" ? "#fff" : "rgb(92, 92, 232)",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
              </svg>
            </div>
            <div className={styles.popup__detalies__icons__send}>
              <svg
                style={{
                  fill: theme === "dark" ? "#fff" : "rgb(92, 92, 232)",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
              </svg>
            </div>
          </div>
          {myId === id && (
            <div
              onClick={deletePost}
              className={styles.popup__detalies__delete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
              </svg>
            </div>
          )}
        </div>
        <p
          style={{ color: theme === "dark" ? "#fff" : "#333" }}
          className={styles.popup__likesNum}
          onClick={() => {
            if (post?.likes?.length > 0) {
              setIsLikedView(true);
            }
          }}
        >
          Оценили {post?.likes.length} человек
        </p>
        {comments.length > 0 && (
          <div
            style={{ color: theme === "dark" ? "#fff" : "#333" }}
            className={styles.popup__comments}
          >
            {comments.length > 2 && isOpenComments ? (
              <>
                <span
                  onClick={() => {
                    setIsOpenComments(false);
                    setIsRemoveComment(true);
                  }}
                  className={styles.popup__comments__btn}
                >
                  Показать остальные комментарии
                </span>
                {splicedComments.map((comment, i) =>
                  allUsers
                    .filter((user) => user._id === comment?.nickname)
                    .map((user, i) => (
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
                  .filter((user) => user._id === comment?.nickname)
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
                      postId={post?._id}
                    />
                  ))
              )
            )}
          </div>
        )}
        <div className={styles.popup__commentsAdd}>
          <textarea
            style={{
              backgroundColor: theme === "dark" ? "#171717" : "#fff",
              color: theme === "dark" ? "#fff" : "#333",
            }}
            onChange={(e) => {
              e.target.style.height = e.target.scrollHeight + "px";
              setText(e.target.value);
            }}
            ref={commentRef}
            placeholder="Написать комментарий..."
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSendComment();
              }
            }}
          ></textarea>
          <button onClick={onSendComment}>Отправить</button>
        </div>
        <div className={styles.popup__createDate}>
          <p>
            Создано{" "}
            {dayMonth === createMonth
              ? `${daysBetween} ${declOfNum(daysBetween, [
                  "день",
                  "дня",
                  "дней",
                ])}  назад`
              : date}
          </p>
        </div>
      </div>
      {isLikedView && (
        <LikedView
          isLikedView={isLikedView}
          setIsLikedView={setIsLikedView}
          likes={post?.likes}
          allUsers={allUsers}
        />
      )}
    </Modal>
  );
};

export default OpenPost;
