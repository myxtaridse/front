import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/logo-white.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../redux/slices/userSlice";
import avatarDemo from "../../assets/avatar-demo.png";
import { ThemeContext } from "../../provider/ThemeProvider";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataUser = useSelector((state) => state?.userSlice.dataMyAcc);
  const statusMe = useSelector((state) => state.userSlice.status);
  const sortedAvatar = dataUser?.avatarUrl?.split("").splice(0, 8)?.join("");

  const [theme, setTheme] = useContext(ThemeContext);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  const myPage = () => {
    navigate(`/${dataUser?._id}`);
    window.location.reload();
  };

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (statusMe === "loading") {
    return "";
  }

  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.header__left}>
          <img width={50} src={logo} alt="logo" />
          <p>Публикация</p>
        </div>
      </Link>
      <div className={styles.header__right}>
        {dataUser && (
          <div onClick={myPage} className={styles.header__right__medium}>
            <img
              src={
                sortedAvatar === "/uploads"
                  ? `${process.env.REACT_APP_API_URL}${dataUser?.avatarUrl}` !==
                    `undefined${dataUser?.avatarUrl}`
                    ? `${process.env.REACT_APP_API_URL}${dataUser?.avatarUrl}`
                    : avatarDemo
                  : dataUser?.avatarUrl
                  ? dataUser?.avatarUrl
                  : avatarDemo
              }
              alt="avatar"
            />
            <h3>{dataUser?.nickname}</h3>
          </div>
        )}
        <button className={styles.header__right__theme} onClick={changeTheme}>
          <div className={styles.header__right__theme__light}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path>
            </svg>
          </div>
          <div className={styles.header__right__theme__dark}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000"
            >
              <path d="M9.8216 2.23796C9.29417 3.38265 9 4.65697 9 6C9 10.9706 13.0294 15 18 15C19.343 15 20.6174 14.7058 21.762 14.1784C20.7678 18.6537 16.7747 22 12 22C6.47715 22 2 17.5228 2 12C2 7.22532 5.3463 3.23221 9.8216 2.23796ZM18.1642 2.29104L19 2.5V3.5L18.1642 3.70896C17.4476 3.8881 16.8881 4.4476 16.709 5.16417L16.5 6H15.5L15.291 5.16417C15.1119 4.4476 14.5524 3.8881 13.8358 3.70896L13 3.5V2.5L13.8358 2.29104C14.5524 2.1119 15.1119 1.5524 15.291 0.835829L15.5 0H16.5L16.709 0.835829C16.8881 1.5524 17.4476 2.1119 18.1642 2.29104ZM23.1642 7.29104L24 7.5V8.5L23.1642 8.70896C22.4476 8.8881 21.8881 9.4476 21.709 10.1642L21.5 11H20.5L20.291 10.1642C20.1119 9.4476 19.5524 8.8881 18.8358 8.70896L18 8.5V7.5L18.8358 7.29104C19.5524 7.1119 20.1119 6.5524 20.291 5.83583L20.5 5H21.5L21.709 5.83583C21.8881 6.5524 22.4476 7.1119 23.1642 7.29104Z"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
