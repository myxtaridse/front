export const dateFunc = ({ createdAt }) => {
  const [year, month, day] = createdAt.substr(0, 10).split("-");
  const date = `${day}.${month}.${year}`;

  const dayMonth = new Date().getMonth() + 1;
  const createMonth = new Date(createdAt).getMonth() + 1;

  const daysBetween = new Date().getDate() - new Date(createdAt).getDate();

  function declOfNum(number, words) {
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
  }
  return {
    date,
    dayMonth,
    createMonth,
    daysBetween,
    declOfNum,
  };
};
