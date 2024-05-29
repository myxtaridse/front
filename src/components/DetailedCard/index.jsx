import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "../../axios";
import styles from "./DetailedCard.module.scss";
import Comment from "../Comment";
import avatarDemo from "../../assets/avatar-demo.png";

const DetailedCard = ({
  userId,
  id,
  likes,
  comments,
  user,
  imageUrl,
  viewsCount,
  title,
  tags,
  createdAt,
  isLikedByYou,
  setIsLikedByYou,
}) => {
  const [isOpenComments, setIsOpenComments] = useState(true);
  //const [isValue, setIsValue] = useState("");
  //const [isLikedByYou, setIsLikedByYou] = useState(false);
  const [setIsLoading] = React.useState(false);
  const [text, setText] = useState("");
  const textRef = React.useRef();

  const nickname = useSelector((state) => state.userSlice.dataMyAcc.nickname);
  const myId = useSelector((state) => state.userSlice.dataMyAcc._id);

  const viewComments = [...comments];
  const splicedComments = viewComments.splice(
    comments.length - 2,
    comments.length
  );

  const [year, month, day] = createdAt.substr(0, 10).split("-");
  const date = `${day}.${month}.${year}`;

  const sortedImage = imageUrl?.split("").splice(0, 8)?.join("");

  const sortedAvatar = user?.avatarUrl?.split("").splice(0, 8)?.join("");

  const onSendComment = () => {
    const reqComment = async () => {
      try {
        const commentsPushed = [...comments];
        commentsPushed.push({ nickname, text });
        console.log(commentsPushed);
        setIsLoading(true);
        const { data } = await Axios.patch(`/posts/${id}`, {
          comments: [...commentsPushed],
        });
        setIsLikedByYou(!isLikedByYou);
        console.log(comments, data);
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
      let likesPushed = [...likes];
      if (likesPushed.includes(myId)) {
        likesPushed = likesPushed.filter((likes) => likes !== myId);
      } else {
        likesPushed.push(myId);
      }

      console.log(likesPushed);
      setIsLoading(true);
      const { data } = await Axios.patch(`/posts/${id}`, {
        likes: [...likesPushed],
      });
      setIsLikedByYou(!isLikedByYou);
      console.log(likes, data);

      return data;
    } catch (err) {
      console.warn(err);
    }
  };

  // const onSendComment = async () => {
  //   if (isValue) {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/postsByUser/${userId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       const dataUser = JSON.parse(localStorage.getItem("data"));

  //       response.data.posts[id - 1].comments.push({
  //         nickname: `${dataUser.nickname}`,
  //         text: `${isValue}`,
  //       });

  //       console.log(response.data);
  //       const res = await axios.put(
  //         `http://localhost:3000/postsByUser/${userId}`,
  //         response.data,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   setIsValue("");
  // };

  // React.useEffect(() => {
  //   const isMyId = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/postsByUser/${userId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       const dataUser = JSON.parse(localStorage.getItem("data"));
  //       const isMyLike = response.data.posts[id - 1].likes.includes(
  //         dataUser.id
  //       );
  //       if (isMyLike) {
  //         setIsLikedByYou(true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   isMyId();
  // }, []);

  // const onLikeClick = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/postsByUser/${userId}`,
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     const dataUser = JSON.parse(localStorage.getItem("data"));
  //     const isMyLike = response.data.posts[id - 1].likes.includes(dataUser.id);
  //     console.log(dataUser.id);
  //     if (isMyLike) {
  //       // response.data.posts[id - 1].likes.filter(
  //       //   (likes) => likes.likes !== dataUser?.id
  //       // );
  //       response.data.posts[id - 1].likes = response.data.posts[
  //         id - 1
  //       ].likes.filter((like) => like !== dataUser?.id);
  //       setIsLikedByYou(false);
  //     } else {
  //       response.data.posts[id - 1].likes.push(dataUser.id);
  //       setIsLikedByYou(true);
  //     }
  //     console.log(response.data);
  //     const res = await axios.put(
  //       `http://localhost:3000/postsByUser/${userId}`,
  //       response.data,
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     console.log(res.data);
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className={styles.card}>
      <Link to={`/${user._id}`}>
        <div className={styles.card__header}>
          <img
            width={40}
            src={
              sortedAvatar === "/uploads"
                ? `http://localhost:4444${user?.avatarUrl}`
                : user?.avatarUrl || avatarDemo
            }
            alt="avatarUser"
          />

          <h3>{user?.nickname.toLowerCase()}</h3>
        </div>
      </Link>
      <div className={styles.card__image}>
        <img
          src={
            sortedImage === "/uploads"
              ? `http://localhost:4444${imageUrl}`
              : imageUrl
          }
          alt="card-post"
        />
      </div>
      <p className={styles.card__description}>{title}</p>
      <div className={styles.card__detalies}>
        <div onClick={onLikeClick}>
          {likes?.includes(myId) ? (
            <div className={styles.card__detalies__active}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="rgba(92,92,232,1)"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(94,94,232,1)"
          >
            <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
          </svg>
        </div>
        <div className={styles.card__detalies__send}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(92,92,232,1)"
          >
            <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
          </svg>
        </div>
      </div>
      <p className={styles.card__likesNum}>Оценили {likes?.length} человек</p>
      <div className={styles.card__comments}>
        {comments.length > 2 && isOpenComments ? (
          <>
            <span
              onClick={() => setIsOpenComments(false)}
              className={styles.card__comments__btn}
            >
              Показать остальные комментарии
            </span>
            {splicedComments.map((comment, i) => (
              <Comment key={i} {...comment} />
            ))}
          </>
        ) : (
          comments.map((comment, i) => <Comment key={i} {...comment} />)
        )}
      </div>
      <div className={styles.card__commentsAdd}>
        {/* <div className={styles.card__header__user}></div> */}
        <textarea
          ref={textRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={onSendComment}>Отправить</button>
      </div>
      <div className={styles.card__createDate}>
        <p>Создано {date}</p>
        {/* <p>Просмотров {viewsCount}</p> */}
      </div>
    </div>
  );
};

export default DetailedCard;
