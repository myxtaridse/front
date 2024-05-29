import Modal from "react-modal";
import styles from "./AddNewPost.module.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Axios from "../../axios";
import {
  setImageUrl,
  // setTags,
  // setText,
  // setTitle,
} from "../../redux/slices/createPostSlice";

const AddNewPost = ({ isOpenNewPost, setIsOpenNewPost, statePosts }) => {
  const closeModal = () => {
    setIsOpenNewPost(false);
  };

  const [setIsLoading] = React.useState(false);
  const [tags] = React.useState("");
  const [comments] = React.useState([]);
  const [likes] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const { imageUrl } = useSelector((state) => state.createPostSlice);

  const status = useSelector((state) => state.authSlice.status);
  const isAuth = Boolean(status === "success");

  const fileRef = React.useRef();
  const dispatch = useDispatch();

  const handleChangeFile = async (event) => {
    try {
      // спец формат, который помогает вшивать картинку в бэкенд
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      // отправка на сервак
      const { data } = await Axios.post("/upload", formData);
      dispatch(setImageUrl(data.url));
    } catch (err) {
      console.log("error", imageUrl);
    }
  };

  //console.log(imageUrl);

  // React.useEffect(() => {
  //   if (id) {
  //     Axios.get(`/posts/${id}`)
  //       .then(({ data }) => {
  //         setTitle(data.title);
  //         setText(data.text);
  //         dispatch(setImageUrl(data.imageUrl));
  //         setTags(data.tags);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = { title, tags, imageUrl, comments, likes };
      const { data } =
        // ? await Axios.patch(`/posts/${id}`, fields)
        await Axios.post("/posts", fields);
      // const _id = isEditing ? id : data._id;
      // navigate(`/post/${_id}`);
      console.log(fields, data);
      return data;
    } catch (err) {
      console.warn(err);
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Modal
      className="popupModal"
      isOpen={isOpenNewPost}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={styles.edit}>
        {imageUrl && (
          <div>
            <img
              src={`http://localhost:4444${imageUrl}`}
              width={240}
              alt="post"
            />
          </div>
        )}
        {/* <img
            width={100}
            src={isImagePost ? isImagePost : statePosts.avatarUrl}
          /> */}
        <button
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
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="createPost__title"
          placeholder="Название..."
        ></input>

        <button onClick={onSubmit}>Опубликовать</button>
      </div>
    </Modal>

    // <div className="createPost">
    //   {imageUrl && (
    //     <div>
    //       <img src={`http://localhost:4444${imageUrl}`} width={240} />
    //     </div>
    //   )}
    //   <button
    //     className="createPost__file"
    //     onClick={() => {
    //       fileRef.current.click();
    //     }}
    //   >
    //     Загрузить изображение
    //   </button>
    //   <input
    //     ref={fileRef}
    //     type="file"
    //     hidden
    //     onChange={handleChangeFile}
    //   ></input>
    //   <input
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //     className="createPost__title"
    //     placeholder="Название..."
    //   ></input>

    //   <div className="createPost__btn">

    //     <button
    //       onClick={onSubmit}
    //       >
    //         Опубликовать
    //       </button>
    //     <button className="createPost__btn__2">Отмена</button>

    //   </div>
    // </div>
  );
};

export default AddNewPost;
