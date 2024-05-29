import React from "react";
import styles from "./CardUser.module.scss";

const index = ({ imageUrl, comments, likes, _id }) => {
  const sortedImage = imageUrl?.split("").splice(0, 8)?.join("");

  return (
    <div className={styles.card}>
      <img
        src={
          sortedImage === "/uploads"
            ? `http://localhost:4444${imageUrl}`
            : imageUrl
        }
        alt="post"
      />
      <div className={styles.card__bg}>
        <div className={styles.card__bg__detaiels}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(92,92,232,1)"
            >
              <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
            </svg>
          </div>
          <p>{likes?.length}</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(92,92,232,1)"
            >
              <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242Z"></path>
            </svg>
          </div>
          <p>{comments.length}</p>
        </div>
      </div>
    </div>
  );
};

export default index;
