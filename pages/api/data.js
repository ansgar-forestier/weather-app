export default async function handler(req, res) {
  try {
    const { cityInput } = req.body;
    const data = await getWeatherData(cityInput)
    res.status(200).json(data);
  } catch(e) {
    res.status(500).end("END")
    console.log("Catched server error: ", e)
  }
}

async function getWeatherData (city) {
  const omData = await fetchWeatherDataOM(city)
  const uniDataFromOM = getUniversalDataFromOM(omData)

  const owmDATA = await fetchWeatherDataOWM(city)
  const uniDataFromOWM = getUniversalDataFromOWM(owmDATA)

  return uniDataFromOM;
}

async function fetchWeatherDataOWM (city) {
  const getWeatherDataOWM = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  return await getWeatherDataOWM.json();
}

async function fetchWeatherDataOM (city) {
  const geoDataOM = await getCityDataOM(city)
  const {latitude,longitude} = geoDataOM.results[0]
  const getWeatherDataOM = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,visibility&daily=sunrise,sunset&wind_speed_unit=ms&timeformat=unixtime`
  );
  return {...await getWeatherDataOM.json(), "geoData": geoDataOM};
}

function getUniversalDataFromOWM (owmDATA) {
  const preparedData = {
    city: owmDATA.name,
    countryCode: owmDATA.sys.country,
    description: owmDATA.weather[0].description,
    iconName: owmDATA.weather[0].icon,
    unixTime: owmDATA.dt,
    timezoneOffsetSeconds: owmDATA.timezone,
    humidity: owmDATA.main.humidity,
    windSpeed: owmDATA.wind.speed,
    windDirection: owmDATA.wind.deg,
    visibility: owmDATA.visibility,
    sunriseUnixTime: owmDATA.sys.sunrise,
    sunsetUnixTime: owmDATA.sys.sunset,
    temp: owmDATA.main.temp,
    tempFeelsLike: owmDATA.main.feels_like,
  }
  return preparedData
}

function getUniversalDataFromOM(omWeatherData) {
  const preparedData = {
    city: omWeatherData.geoData.results[0].name,
    countryCode: omWeatherData.geoData.results[0].country_code,
    description: getWeatcherInfoByCode(omWeatherData.current.weather_code)[0],
    iconName: getWeatcherInfoByCode(omWeatherData.current.weather_code)[1],
    unixTime: omWeatherData.current.time,
    timezoneOffsetSeconds: getTimeZoneOffset(omWeatherData.geoData.results[0].timezone),
    humidity: omWeatherData.current.relative_humidity_2m,
    windSpeed: omWeatherData.current.wind_speed_10m,
    windDirection: omWeatherData.current.wind_direction_10m, 
    visibility: omWeatherData.current.visibility,
    sunriseUnixTime: omWeatherData.daily.sunrise[0],
    sunsetUnixTime: omWeatherData.daily.sunset[0],
    temp: omWeatherData.current.temperature_2m,
    tempFeelsLike: omWeatherData.current.apparent_temperature,
  }
  return preparedData

}

async function getCityDataOM(cityString) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityString}&count=1&language=fr&format=json`
  const getGeoData = await fetch(url);
  const geoData = await getGeoData.json();
  if (!Object.hasOwn(geoData, "results")) {
    throw("(f)getCityDataOM: Geo data not found"); 
  }
  return geoData
}

function getWeatcherInfoByCode(weatherCode) {
  switch(weatherCode) {
    case 0:
      return ["Ciel clair", "01d"]
    case 1:
    case 2:
    case 3:
      return ["Partiellement nuageux et couvert", "04d"]
    case 45:
    case 48:
        return ["Brouillard", "50d"]
    case 51:
    case 53:
    case 55:
        return ["Bruine : Intensité légère, modérée et dense", "09d"]
    case 56:
    case 57:
        return ["Bruine verglaçante", "09d"]
    case 61:
    case 63:
    case 65:
        return ["Pluie : intensité légère, modérée et forte", "09d"]
    case 66:
    case 67:
        return ["Pluie verglaçante", "09d"]
    case 71:
    case 73:
    case 75:
        return ["Chute de neige : Intensité légère, modérée et forte", "13d"]
    case 77:
        return ["Grains de neige", "13d"]
    case 80:
    case 81:
    case 82:
        return ["Averses de pluie", "09d"]
    case 85:
    case 86:
        return ["Averses de neige", "13d"]
    case 95:
        return ["Orage : Léger ou modéré", "11d"]
    case 96:
    case 99:
        return ["Orage avec grêle légère et forte", "11d"]
    default:
        return ["", "binocular"]
  }
}

function getTimeZoneOffset(tmzName) {
  const d1 = new Date()
  const utcDate = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() );
  const tzDate = new Date(d1.toLocaleString("en-US", {timeZone: tmzName }));

  return (tzDate.getTime() - utcDate.getTime()) / 6e4 * 60;  
}