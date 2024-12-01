import {
  unixToLocalTime,
} from "./converters";

export const getVisibility = (visibilityInMeters) =>
  (visibilityInMeters / 1000).toFixed(1)
    
export const getTime = (unixTime, timezone) =>
  unixToLocalTime(unixTime, timezone)

export const getWeekDay = (unixTime, timezone) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[
    new Date((unixTime + timezone) * 1000).getUTCDay()
  ];
};
