import { getWeekDay, getTime } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ unixTime, timezone }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(unixTime, timezone)}, ${getTime(unixTime, timezone)}`}
      </h2>
    </div>
  );
};
