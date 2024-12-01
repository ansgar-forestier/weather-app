import Image from "next/image";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  description,
  iconName,
  weatherData,
}) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <p className={styles.description}>{description}</p>
      <Image
        width="300px"
        height="300px"
        src={`/icons/${iconName}.svg`}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {Math.round(weatherData.main.temp)}
        °C
      </h1>
      <p>
        Feels like{" "}
        {Math.round(weatherData.main.feels_like)}
        °C
      </p>
    </div>
  );
};
