import React from "react";
import styles from "./VideoPlayer.module.scss";
import errorPost from "../../assets/errorPost.png";

const VideoPlayer = ({ imageUrl, sortedVideo }) => {
  const soundRef = React.useRef();
  const videoNode = document.querySelector("video");
  const [isSound, setIsSound] = React.useState(false);

  const soundClick = () => {
    if (isSound) {
      soundRef.current.pause();
    } else if (!isSound) {
      soundRef.current.play();
    }
    setIsSound(!isSound);
  };

  return (
    <div className={styles.player}>
      <video autoPlay loop playsInline ref={soundRef} width="100%">
        <source
          src={
            `http://localhost:4444${imageUrl}` || errorPost
            // `${process.env.REACT_APP_API_URL}${imageUrl}` !==
            // `undefined/${imageUrl}`
            //   ? `${process.env.REACT_APP_API_URL}${imageUrl}`
            //   : errorPost
          }
          type={`video/${sortedVideo}`}
        />
      </video>
      <div onClick={soundClick} className={styles.player__sound}>
        <div style={{ display: !isSound ? "block" : "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path>
          </svg>
        </div>
        <div style={{ display: isSound ? "block" : "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 3H8V21H6V3ZM16 3H18V21H16V3Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
