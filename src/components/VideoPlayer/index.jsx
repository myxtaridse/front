import React from "react";
import styles from "./VideoPlayer.module.scss";
import errorPost from "../../assets/errorPost.png";

const VideoPlayer = ({ imageUrl, sortedVideo }) => {
  const soundRef = React.useRef();
  const videoNode = document.querySelector("video");
  const [isSound, setIsSound] = React.useState(true);

  const soundClick = () => {
    setIsSound(!isSound);

    videoNode.muted = !isSound;
    videoNode.play();
    setTimeout(() => {
      const videoNode = document.querySelector("video");
      videoNode.pause();
    }, 50000);
  };

  return (
    <div onClick={soundClick} className={styles.player}>
      <video
        //controls="controls"
        ref={soundRef}
        playsInline
        allow="autoplay"
        autoPlay
        loop
        muted="muted"
        width="100%"
      >
        <source
          src={
            //`http://localhost:4444${imageUrl}` !==
            `${process.env.REACT_APP_API_URL}${imageUrl}` !==
            `undefined/${imageUrl}`
              ? `${process.env.REACT_APP_API_URL}${imageUrl}`
              : errorPost
          }
          type={`video/${sortedVideo}`}
        />
      </video>
      <div className={styles.player__sound}>
        <div style={{ display: !isSound ? "block" : "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"></path>
          </svg>
        </div>
        <div style={{ display: isSound ? "block" : "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M5.88889 16H2C1.44772 16 1 15.5523 1 15V9.00001C1 8.44772 1.44772 8.00001 2 8.00001H5.88889L11.1834 3.66815C11.3971 3.49329 11.7121 3.52479 11.887 3.73851C11.9601 3.82784 12 3.93971 12 4.05513V19.9449C12 20.221 11.7761 20.4449 11.5 20.4449C11.3846 20.4449 11.2727 20.405 11.1834 20.3319L5.88889 16ZM20.4142 12L23.9497 15.5355L22.5355 16.9498L19 13.4142L15.4645 16.9498L14.0503 15.5355L17.5858 12L14.0503 8.46447L15.4645 7.05026L19 10.5858L22.5355 7.05026L23.9497 8.46447L20.4142 12Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
