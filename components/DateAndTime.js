import { getWeekDay, getTime } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData)}, ${getTime(
          weatherData.dt,
          weatherData.timezone
        )}`}
      </h2>
    </div>
  );
};
