export const getStringedDate = (target) => {
  // 날짜 -> YYYY-MM-DD
  let year = target.getFullYear();
  let month = target.getMonth() + 1;
  let date = target.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
}