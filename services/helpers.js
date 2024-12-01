import {
  unixToLocalTime,
} from "./converters";

export const getVisibility = (visibilityInMeters) =>
  (visibilityInMeters / 1000).toFixed(1)
    
export const getTime = (currentTime, timezone) =>
  unixToLocalTime(currentTime, timezone)

export const getWeekDay = (weatherData) => {
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
    new Date((weatherData.dt + weatherData.timezone) * 1000).getUTCDay()
  ];
};
