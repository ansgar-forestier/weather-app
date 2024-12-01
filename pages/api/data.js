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
  const owmDATA = await fetchWeatherDataOWM(city)
  return getPreparedDataFromOWM(owmDATA);
}

async function fetchWeatherDataOWM (city) {
  const getWeatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  return await getWeatherData.json();
}

function getPreparedDataFromOWM (owmDATA) {
  const preparedData = {
    city: owmDATA.name,
    countryCode: owmDATA.sys.country,
    description: owmDATA.weather[0].description,
    iconName: owmDATA.weather[0].icon,
    owmData: owmDATA
  }
  return preparedData
}