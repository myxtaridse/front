import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4444/",
});

// мидлвор - проверка авторизован ли пользователь или нет
// если есть отправлять запрос о нем
// при любом запросе будет проверка есть ли токен в локал хранилище
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  // если есть доступ от авторизейшен может давать различным роутам доступ
  return config;
});

export default instance;

// создали начальное значение адресса для вызова на бэк, адрессная строка начинается с - http://localhost:3000/
