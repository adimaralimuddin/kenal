const ToolDateToDisplay = (date, msg = "ago") => {
  if (!date) return "";
  const now = new Date();
  const yearDif = now.getFullYear() - date.getFullYear();
  const monthDif = now.getMonth() - date.getMonth();
  const dayDif = Math.abs(now.getDay() - date.getDay());
  const hourDif = Math.abs(now.getHours() - date.getHours());
  const minDif = Math.abs(now.getMinutes() - date.getMinutes());
  const secDif = Math.abs(now.getSeconds() - date.getSeconds());
  // console.log({ hourDif, minDif: minDif, secDif });

  if (yearDif > 0) {
    return yearDif + ` year${yearDif !== 1 ? "s" : ""} ` + msg;
  }
  if (monthDif > 0) {
    return monthDif + ` month${monthDif !== 1 ? "s" : ""} ` + msg;
  }
  if (dayDif > 0) {
    return dayDif + ` day${dayDif !== 1 ? "s" : ""} ` + msg;
  }
  if (hourDif > 0) {
    return hourDif + ` hour${hourDif !== 1 ? "s" : ""} ` + msg;
  }
  if (minDif > 0) {
    return minDif + ` minute${minDif !== 1 ? "s" : ""} ` + msg;
  }
  return "just now";
  return secDif + ` sec${secDif !== 1 ? "s" : ""} ` + msg;
};

export default ToolDateToDisplay;
