import React from "react";
import styles from "./Comment.module.scss";
import { useSelector } from "react-redux";
import Axios from "../../axios";

const Comment = ({
  text,
  nickname,
  isRemoveComment,
  comments,
  isChangePost,
  setIsChangePost,
  postId,
}) => {
  const myData = useSelector((state) => state.userSlice.dataMyAcc);

  const deleteComment = () => {
    const remove = async () => {
      try {
        let filteredComment = [...comments];
        filteredComment = filteredComment?.filter(
          (comment) => comment?.text !== text
        );

        console.log(filteredComment);

        const { data } = await Axios.patch(`/posts/${postId}`, {
          comments: [...filteredComment],
        });

        return data;
      } catch (err) {
        console.log(err);
      }
    };
    if (window.confirm("Вы действительно хотите удалить комментарий?")) {
      remove();
      setTimeout(() => {
        setIsChangePost(!isChangePost);
      }, 100);
    }
    
  };

  return (
    <div className={styles.comments}>
      <p className={styles.comments__name}>{nickname?.toLowerCase()}: </p>

      <p className={styles.comments__text}>{text}</p>
      {isRemoveComment && myData?.nickname === nickname && (
        <div onClick={deleteComment} className={styles.comments__delete}>
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
  );
};

export default Comment;
