import React from "react";
import Modal from "react-modal";
import styles from "./EditMyPage.module.scss";
import Axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import avatarDemo from "../../assets/avatar-demo.png";

import { useNavigate } from "react-router-dom";
import { fetchUserUpdate } from "../../redux/slices/authSlice";
import { fetchMeUpdate } from "../../redux/slices/userSlice";

const EditMyPage = ({ isOpenModal, setIsOpenModal, statePosts }) => {
  const closeModal = () => {
    setIsOpenModal(false);
    window.location.reload();
  };

  const prevMyData = useSelector((state) => state.userSlice.dataMyAcc);

  const [nickname, setNickname] = React.useState(prevMyData.nickname);
  const [firstName, setFirstName] = React.useState(prevMyData.firstName);
  const [lastName, setLastName] = React.useState(prevMyData.lastName);
  const [avatarUrl, setAvatarUrl] = React.useState(prevMyData.avatarUrl);
  const [description, setDescription] = React.useState(prevMyData.description);
  const [url, setUrl] = React.useState(prevMyData.url);

  // const [isChangeAvatar, setChangeAvatar] = React.useState();
  // const [isChangeNickname, setChangeNickname] = React.useState();
  // const [isChangeFirstName, setChangeFirstName] = React.useState();
  // const [isChangeLastName, setChangeLastName] = React.useState();
  // const [isChangeAboutMe, setChangeAboutMe] = React.useState();
  // const [isChangeUrl, setChangeUrl] = React.useState();
  // const [isChangePassword, setChangePassword] = React.useState();
  // const [isChangeEmail, setChangeEmail] = React.useState();

  // const userEdit = {
  //   id: statePosts.id,
  //   avatarUrl: isChangeAvatar?.valueOf ? isChangeAvatar : statePosts.avatarUrl,

  //   description: isChangeAboutMe?.valueOf
  //     ? isChangeAboutMe
  //     : statePosts.description,

  //   firstName: isChangeFirstName?.valueOf
  //     ? isChangeFirstName
  //     : statePosts.firstName,

  //   lastName: isChangeLastName?.valueOf
  //     ? isChangeLastName
  //     : statePosts.lastName,

  //   nickname: isChangeNickname?.valueOf
  //     ? isChangeNickname
  //     : statePosts.nickname,

  //   url: isChangeUrl?.valueOf ? isChangeUrl : statePosts.url,

  //   subscribed: statePosts.subscribed,
  //   subscribers: statePosts.subscribers,
  //   email: isChangeEmail,
  //   password: isChangePassword,
  // };

  // const userEditInfo = {
  //   id: statePosts.id,
  //   avatarUrl: isChangeAvatar?.valueOf ? isChangeAvatar : statePosts.avatarUrl,

  //   description: isChangeAboutMe?.valueOf
  //     ? isChangeAboutMe
  //     : statePosts.description,

  //   firstName: isChangeFirstName?.valueOf
  //     ? isChangeFirstName
  //     : statePosts.firstName,

  //   lastName: isChangeLastName?.valueOf
  //     ? isChangeLastName
  //     : statePosts.lastName,

  //   nickname: isChangeNickname?.valueOf
  //     ? isChangeNickname
  //     : statePosts.nickname,

  //   url: isChangeUrl?.valueOf ? isChangeUrl : statePosts.url,

  //   subscribed: statePosts.subscribed,
  //   subscribers: statePosts.subscribers,
  //   posts: statePosts.posts,
  // };

  // const submitChange = async () => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3000/users/${statePosts.id}`,
  //       userEdit,
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     const res = await axios.put(
  //       `http://localhost:3000/postsByUser/${statePosts.id}`,
  //       userEditInfo,
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     console.log(response.data, res.data);

  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fileRef = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeFile = async (event) => {
    try {
      // спец формат, который помогает вшивать картинку в бэкенд
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      // отправка на сервак
      const { data } = await Axios.post("/upload", formData);
      setAvatarUrl(data.url);
    } catch (err) {
      console.log("error", prevMyData.avatarUrl);
    }
  };

  const onSubmit = () => {
    const userEdit = {
      avatarUrl,
      description,
      firstName,
      lastName,
      nickname,
      url,
    };

    const id = prevMyData?._id;
    console.log(id, userEdit);
    dispatch(fetchMeUpdate({ userEdit }));

    closeModal();
  };
  const sortedAvatar = avatarUrl?.split("").splice(0, 8)?.join("");

  return (
    <Modal
      className="popupModal"
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        content: {
          border: "none",
          outline: "none",
        },
      }}
    >
      <div className={styles.edit}>
        <div className={styles.edit__about}>
          <div className={styles.edit__about__avatar}>
            {
              <div>
                <img
                  src={
                    sortedAvatar === "/uploads"
                      ? // ? `http://localhost:4444${imageUrl}`
                        `${process.env.REACT_APP_API_URL}${avatarUrl}` !==
                        `undefined${avatarUrl}`
                        ? `${process.env.REACT_APP_API_URL}${avatarUrl}`
                        : avatarDemo
                      : avatarUrl || avatarDemo
                  }
                  width={70}
                  alt="avatar"
                />
              </div>
            }

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
          </div>
          <div className={styles.edit__about__input}>
            <div>
              <p>Никнейм:</p>
              <input
                onChange={(e) => setNickname(e.target.value)}
                placeholder={prevMyData.nickname}
              />
            </div>
            <div>
              <p>Имя:</p>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={prevMyData.firstName}
              />
            </div>
            <div>
              <p>Фамилия:</p>
              <input
                onChange={(e) => setLastName(e.target.value)}
                placeholder={prevMyData.lastName}
              />
            </div>
            <div>
              <p>Описание вашей страницы:</p>
              <input
                onChange={(e) => setDescription(e.target.value)}
                placeholder={prevMyData.description}
              />
            </div>
            <div>
              <p>Ссылки на другие веб-страницы:</p>
              <input
                onChange={(e) => setUrl(e.target.value)}
                placeholder={prevMyData.url}
              />
            </div>
          </div>
          <button onClick={onSubmit}>Редактировать</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditMyPage;
