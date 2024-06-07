import Modal from "react-modal";
import React from "react";
import Axios from "../../axios";
import styles from "./AddNewPost.module.scss";
import errorPost from "../../assets/errorPost.png";

const AddNewPost = ({
  isOpenNewPost,
  setIsOpenNewPost,
  isChangePost,
  setIsChangePost,
}) => {
  const fileRef = React.useRef();

  const [tags, setTags] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const closeModal = () => {
    setIsOpenNewPost(false);
    setTimeout(() => {
      setIsChangePost(!isChangePost);
    }, 100);
  };

  const handleChangeFile = async (event) => {
    try {
      // спец формат, который помогает вшивать картинку в бэкенд
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      // отправка на сервак
      const { data } = await Axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.log("error");
    }
  };

  const onSubmit = () => {
    const submit = async () => {
      try {
        const fields = { title, tags, imageUrl };
        const { data } = await Axios.post("/posts", fields);

        return data;
      } catch (err) {
        console.warn(err);
      }
    };
    submit();
    closeModal();
  };

  const sortedImage = imageUrl?.split("").splice(0, 8)?.join("");

  const theme = window.localStorage?.getItem("theme");

  return (
    <Modal
      className="popupModal"
      isOpen={isOpenNewPost}
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
        className={styles.edit}
      >
        <div className={styles.edit__image}>
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
            alt="post"
          />
          <button
            style={{ color: theme === "dark" ? "#cab6fe" : "#703fef" }}
            className={styles.edit__image__down}
            onClick={() => {
              fileRef.current.click();
            }}
          >
            Загрузить изображение
          </button>
          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={handleChangeFile}
          ></input>
        </div>

        <input
          style={{
            backgroundColor: theme === "dark" ? "#171717" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.edit__input}
          placeholder="Введите описание для поста"
        ></input>
        <button className={styles.edit__btn} onClick={onSubmit}>
          Опубликовать
        </button>
      </div>
    </Modal>
  );
};

export default AddNewPost;
