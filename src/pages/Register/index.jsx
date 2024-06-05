import React from "react";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisterUser } from "../../redux/slices/authSlice";
import avatarDemo from "../../assets/avatar-demo.png";
import authBg from "../../assets/auth-bg.svg";
import logo from "../../assets/logo.svg";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = React.useRef();

  const [openEye, setOpenEye] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState();

  const status = useSelector((state) => state.authSlice?.status);
  const isAuth = Boolean(status === "success");

  const {
    register,
    handleSubmit,
    //setError,
    //formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      avatarUrl: "",
      nickname: "",
      description: "",
      url: "",
    },
    //mode: "onChange",
  });

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
      console.log("error", avatarDemo, err);
    }
  };

  const sortedAvatar = avatarUrl?.split("").splice(0, 8)?.join("");

  // если валидация прошла корректно при авторизации, все запросы отлично выполнились
  const onSubmit = async (values) => {
    Object.defineProperty(values, "avatarUrl", {
      value: avatarUrl,
    });
    const data = await dispatch(fetchRegisterUser(values));
    if (!data.payload) {
      alert("Не удалось авторизоваться:(");
      //setIsErrorInput(true);
    }
    if (data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    navigate("/");
  }

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.login__container__formSub}>
          <div className={styles.login__container__formSub__logo}>
            <img
              className={styles.login__container__formSub__logo__img}
              width={50}
              src={logo}
              alt="logo"
            />
            <p className={styles.login__container__formSub__logo__text}>
              Публикация
            </p>
          </div>
          <h2 className={styles.login__container__formSub__title}>
            Регистрация
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.login__container__formSub__inputs}>
              <div className={styles.login__container__formSub__inputs__avatar}>
                {
                  <div
                    className={
                      styles.login__container__formSub__inputs__avatar__cont
                    }
                  >
                    <img
                      className="avatar"
                      src={
                        sortedAvatar === "/uploads"
                          ? `${process.env.REACT_APP_API_URL}${avatarUrl}` !==
                            `undefined${avatarUrl}`
                            ? `${process.env.REACT_APP_API_URL}${avatarUrl}`
                            : avatarDemo
                          : avatarUrl
                          ? avatarUrl
                          : avatarDemo
                      }
                      alt="avatar"
                    />
                  </div>
                }

                <div
                  className={
                    styles.login__container__formSub__inputs__avatar__button
                  }
                  onClick={() => {
                    fileRef.current.click();
                  }}
                >
                  Загрузить изображение
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={handleChangeFile}
                ></input>
              </div>
              <input
                {...register("firstName", { optional: "Укажите имя" })}
                placeholder="Ваше имя"
                type="text"
              />
              <input
                {...register("lastName", { optional: "Укажите фамилию" })}
                placeholder="Ваша фамилия"
                type="text"
              />
              <input
                required
                {...register("nickname", { required: "Укажите никнейм" })}
                placeholder="Придумайте никнейм"
                type="text"
              />

              <input
                {...register("description", { optional: "Укажите описание" })}
                placeholder="Обо мне"
                type="text"
              />
              <input
                {...register("url", { optional: "Укажите ссылки" })}
                placeholder="Ссылки на другие соц сети"
                type="text"
              />
              <input
                required
                {...register("email", { required: "Укажите почту" })}
                placeholder="Введите E-mail"
                type="email"
              />
              <div className={styles.login__container__formSub__password}>
                <input
                  required
                  {...register("password", { required: "Укажите пароль" })}
                  placeholder="Введите Пароль"
                  type={openEye ? "type" : "password"}
                />
                {openEye ? (
                  <div
                    onClick={() => {
                      setOpenEye(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="rgba(92,92,232,1)"
                    >
                      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 11.4872 7.07719 10.9925 7.22057 10.5268C7.61175 11.3954 8.48527 12 9.5 12C10.8807 12 12 10.8807 12 9.5C12 8.48527 11.3954 7.61175 10.5269 7.21995C10.9925 7.07719 11.4872 7 12 7Z"></path>
                    </svg>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setOpenEye(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="rgba(92,92,232,1)"
                    >
                      <path d="M9.34268 18.7819L7.41083 18.2642L8.1983 15.3254C7.00919 14.8874 5.91661 14.2498 4.96116 13.4534L2.80783 15.6067L1.39362 14.1925L3.54695 12.0392C2.35581 10.6103 1.52014 8.87466 1.17578 6.96818L3.14386 6.61035C3.90289 10.8126 7.57931 14.0001 12.0002 14.0001C16.4211 14.0001 20.0976 10.8126 20.8566 6.61035L22.8247 6.96818C22.4803 8.87466 21.6446 10.6103 20.4535 12.0392L22.6068 14.1925L21.1926 15.6067L19.0393 13.4534C18.0838 14.2498 16.9912 14.8874 15.8021 15.3254L16.5896 18.2642L14.6578 18.7819L13.87 15.8418C13.2623 15.9459 12.6376 16.0001 12.0002 16.0001C11.3629 16.0001 10.7381 15.9459 10.1305 15.8418L9.34268 18.7819Z"></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <button style={{ padding: "20px 50px" }} type="submit">
              Создать аккаунт
            </button>
          </form>
          <p className={styles.login__container__formSub__link}>
            Вы уже имеете аккаунт? <Link to="/auth">Войти в аккаунт</Link>
          </p>
        </div>
        <img
          className={styles.login__container__right}
          src={authBg}
          alt="authBg"
        />
      </div>
    </div>
  );
};

export default Register;
