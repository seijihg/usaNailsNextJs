const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const nth = (d: number): string => {
  if (d > 3 && d < 21) {
    return "th";
  }
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
export const dateToReadableTextDate = (inputDate: string) => {
  const dateObject = new Date(inputDate);

  const date: number = dateObject.getDate();
  const month: string = months[dateObject.getMonth()];
  const year: number = dateObject.getFullYear();

  let hours: number = dateObject.getHours();
  let minutes: string | number = dateObject.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours === 12 ? 12 : hours % 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const time = `${hours}:${minutes + ampm}`;

  return `${date + nth(date)} ${month} ${year} at ${time}`;
};

export const formatDate = (inputDate: string) => {
  if (inputDate === "unset") {
    return "Loading";
  }
  const date = new Date(inputDate);
  let minutes = date.getMinutes().toString();
  if (minutes.length == 1) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours().toString();
  if (hours.length == 1) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes} ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
};

export const formatDateOnly = (date: Date | string) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const millisToMinutesAndSeconds = (millis: number) => {
  var minutes = Math.floor(millis / 60000);
  if (minutes > 60 && minutes < 1440) {
    const hour = Math.floor(minutes / 60);
    return `${hour}h`;
  }
  if (minutes > 1440) {
    const day = Math.floor(minutes / 1440);
    return `${day}d`;
  }
  return `${minutes}m`;
};
