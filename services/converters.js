export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const jsDateToStr = (jsDate) =>
  `${jsDate.getHours()}:${jsDate.getMinutes()}`

export const getDateWithOffset = (unixTime, offsetSeconds) => {
  const currentOffset = (new Date()).getTimezoneOffset() * 60
  return new Date((unixTime + currentOffset + offsetSeconds) * 1000)
}
