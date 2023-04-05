import { useEffect, useState } from "react";

export function CountDown({ seconds = 0, onComplete }: any) {
  const [time, setTime] = useState(seconds);

  const tick = () => {
    if (time === 0) return onComplete();

    setTime(time - 1);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const getFormattedSeconds = () => {
    return `${time.toString().padStart(2, "0")} secs`;
  };

  return <small>{getFormattedSeconds()}</small>;
}
