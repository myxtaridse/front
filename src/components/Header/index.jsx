import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/logo-white.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../redux/slices/userSlice";
import avatarDemo from "../../assets/avatar-demo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state?.userSlice.dataMyAcc);
  const statusMe = useSelector((state) => state.userSlice.status);
  const sortedAvatar = dataUser?.avatarUrl?.split("").splice(0, 8)?.join("");

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  const myPage = () => {
    navigate(`/${dataUser?._id}`);
    window.location.reload();
  };

  console.log(
    dataUser?.avatarUrl,
    avatarDemo,
    `${process.env.REACT_APP_API_URL}${dataUser?.avatarUrl}`
  );

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
      {dataUser && (
        <div onClick={myPage} className={styles.header__medium}>
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
    </div>
  );
};

export default Header;
