import React from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/authSlice";

const Login = () => {
  const [openEye, setOpenEye] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.authSlice?.status);
  const isAuth = Boolean(status === "success");
  const state = useSelector((state) => state);
  console.log(state);

  const {
    register,
    handleSubmit,
    //setError,
    //formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    //mode: "onChange",
  });

  // если валидация прошла корректно при авторизации, все запросы отлично выполнились
  const onSubmit = async (values) => {
    //console.log(values);

    const data = await dispatch(fetchUserData(values));
    console.log(data);
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

  // const navigate = useNavigate();

  // const submitRegister = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/login", {
  //       email,
  //       password,
  //     });
  //     localStorage.setItem("token", response.data.accessToken);
  //     const res = await axios.get(
  //       `http://localhost:3000/postsByUser/${response.data.user.id}`,
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     console.log(response.data, res.data);
  //     setDataUser(res.data);
  //     navigate(`/${res.data.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className={styles.login}>
      <h2 className={styles.login__title}>Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          // onChange={(e) => setIsLogin(e.target.value)}
          {...register("email", { required: "Укажите почту" })}
          placeholder="Введите E-mail"
          type="email"
        />
        <div className={styles.login__password}>
          <input
            {...register("password", { required: "Укажите пароль" })}
            // onChange={(e) => setIsPassword(e.target.value)}
            placeholder="Введите Пароль"
            type={openEye ? "type" : "password"}
          />
          {openEye ? (
            <div
              onClick={() => {
                setOpenEye(false);
                //console.log("закрыт пароль");
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
                //console.log("открыт пароль");
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

        <button type="submit">Войти</button>
      </form>
      <p>
        Вы еще не зарегистрированы?{" "}
        <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default Login;

// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../../redux/slices/authSlice";

// const index = () => {
//   const [passwordIncognito, setPasswordIncognito] = React.useState(false);
//   const [isErrorInput, setIsErrorInput] = React.useState(false);
//   const dispatch = useDispatch();
//   const status = useSelector((state) => state.authSlice.status);
//   const isAuth = Boolean(status === "success");
//   const isError = Boolean(status === "error");

//   console.log(status);

//   // отправка пароля на бэк
//   const {
//     register,
//     handleSubmit,
//     //setError,
//     //formState: { errors, isValid },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     //mode: "onChange",
//   });

//   // если валидация прошла корректно при авторизации, все запросы отлично выполнились
//   const onSubmit = async (values) => {
//     //console.log(values);

//     const data = await dispatch(fetchUserData(values));
//     console.log(data);
//     if (!data.payload) {
//       alert("Не удалось авторизоваться:(");
//       setIsErrorInput(true);
//     }
//     if (data.payload) {
//       window.localStorage.setItem("token", data.payload.token);
//     }
//   };

//   if (isAuth) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div className={style.login}>
//       <h2 className={style.login__title}>Вход в аккаунт</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <input
//             className={style.login__email}
//             type="email"
//             // label="E-Mail"
//             // helperText={errors.email?.message}
//             // error={Boolean(errors.email?.message)}
//             {...register("email", { required: "Укажите почту" })}
//             placeholder="Введите E-mail"
//             style={{
//               border: isErrorInput
//                 ? "2px solid rgb(203, 13, 13)"
//                 : "1px solid rgb(63, 33, 7)",
//             }}

//             //required
//           />
//           {isErrorInput && <h3>Неверно указан логин!</h3>}
//         </div>
//         <div className={style.login__passwordBlock}>
//           <input
//             className={style.login__passwordBlock__word}
//             type={passwordIncognito ? "text" : "password"}
//             //required
//             // label="Пароль"
//             // helperText={errors.password?.message}
//             // error={Boolean(errors.password?.message)}
//             {...register("password", { required: "Укажите пароль" })}
//             placeholder="Введите пароль"
//             style={{
//               border: isErrorInput
//                 ? "2px solid rgb(203, 13, 13)"
//                 : "1px solid rgb(63, 33, 7)",
//             }}
//           />
//           {isErrorInput && <h3>Неверно указан пароль!</h3>}
//           <div
//             onClick={() => setPasswordIncognito(false)}
//             className={style.login__passwordBlock__eye}
//             style={{ display: passwordIncognito ? "block" : "none" }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="rgba(63,33,7,1)"
//             >
//               <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
//             </svg>
//           </div>
//           <div
//             onClick={() => setPasswordIncognito(true)}
//             className={style.login__passwordBlock__eye}
//             style={{ display: passwordIncognito ? "none" : "block" }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="rgba(63,33,7,1)"
//             >
//               <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path>
//             </svg>
//           </div>
//         </div>
//         <button type="submit" className={style.login__input}>
//           Войти
//         </button>
//       </form>
//     </div>
//   );
// };
