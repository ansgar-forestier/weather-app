import {
  jsDateToStr,
  getDateWithOffset
} from "./converters";

export const getVisibility = (visibilityInMeters) =>
  (visibilityInMeters / 1000).toFixed(1)
    
export const getTime = (unixTime, timezoneOffsetSeconds) =>
  jsDateToStr(getDateWithOffset(unixTime, timezoneOffsetSeconds))

export const getWeekDay = (unixTime, timezoneOffsetSeconds) => {
  return getDateWithOffset(unixTime, timezoneOffsetSeconds)
    .toLocaleString('fr-FR', {weekday: 'long'})
};
