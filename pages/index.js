import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { Search } from "../components/Search";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [cityInput, setCityInput] = useState("Riga");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityInput }),
      });
      const data = await res.json();
      setWeatherData({ ...data });
      setCityInput("");
    };
    getData().catch((er) => {
      console.log("Catched client error: " + er )
      setErrorMessage(er);
    })
  }, [triggerFetch]);

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={weatherData.countryCode}
        description={weatherData.description}
        iconName={weatherData.iconName}
        temp={weatherData.temp}
        tempFeelsLike={weatherData.tempFeelsLike}
      />
      <ContentBox>
        <Header>
          <DateAndTime
            unixTime={weatherData.unixTime}
            timezone={weatherData.timezone}
          />
          <Search
            placeHolder="Search a city..."
            value={cityInput}
            onFocus={(e) => {
              e.target.value = "";
              e.target.placeholder = "";
            }}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              e.keyCode === 13 && setTriggerFetch(!triggerFetch);
              e.target.placeholder = "Search a city...";
            }}
          />
        </Header>
        <MetricsBox
          humidity={weatherData.humidity}
          windSpeed={weatherData.windSpeed}
          windDirection={weatherData.windDirection}
          visibility={weatherData.visibility}
          sunriseUnixTime={weatherData.sunriseUnixTime}
          sunsetUnixTime={weatherData.sunsetUnixTime}
          timezone={weatherData.timezone}
        />
      </ContentBox>
    </div>
  ) : errorMessage ? (
    <ErrorScreen errorMessage="Il n'y a rien ici, respirez profondément.">
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
