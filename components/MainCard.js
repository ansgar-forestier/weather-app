import Image from "next/image";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  description,
  iconName,
  temp,
  tempFeelsLike,
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
        {Math.round(temp)}
        °C
      </h1>
      <p>
        Ressenti{" "}
        {Math.round(tempFeelsLike)}
        °C
      </p>
    </div>
  );
};
