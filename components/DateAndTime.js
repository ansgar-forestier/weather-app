import { getWeekDay, getTime } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ timezoneOffsetSeconds }) => {
  const nowUnixTime = Math.floor(Date.now() / 1000)
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(nowUnixTime, timezoneOffsetSeconds)}, ${getTime(nowUnixTime, timezoneOffsetSeconds)}`}
      </h2>
    </div>
  );
};
