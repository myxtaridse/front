import React from "react";
import Modal from "react-modal";
import styles from "./EditMyPage.module.scss";
import Axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import avatarDemo from "../../assets/avatar-demo.png";
import { fetchMeUpdate } from "../../redux/slices/userSlice";

const EditMyPage = ({ isOpenModal, setIsOpenModal }) => {
  const fileRef = React.useRef();
  const dispatch = useDispatch();
  const prevMyData = useSelector((state) => state.userSlice.dataMyAcc);

  const closeModal = () => {
    setIsOpenModal(false);
    window.location.reload();
  };

  const [nickname, setNickname] = React.useState(prevMyData?.nickname);
  const [firstName, setFirstName] = React.useState(prevMyData?.firstName);
  const [lastName, setLastName] = React.useState(prevMyData?.lastName);
  const [avatarUrl, setAvatarUrl] = React.useState(prevMyData?.avatarUrl);
  const [description, setDescription] = React.useState(prevMyData?.description);
  const [url, setUrl] = React.useState(prevMyData?.url);

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

  const sortedAvatar = avatarUrl?.split("").splice(0, 8)?.join("");

  const onSubmit = () => {
    const userEdit = {
      avatarUrl,
      description,
      firstName,
      lastName,
      nickname,
      url,
    };
    dispatch(fetchMeUpdate({ userEdit }));
    closeModal();
  };

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
                      ? `${process.env.REACT_APP_API_URL}${avatarUrl}` !==
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
                placeholder={prevMyData?.nickname}
              />
            </div>
            <div>
              <p>Имя:</p>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={prevMyData?.firstName}
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
