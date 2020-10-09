import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const FORMAT_STRING = 'HH:mm';

/**
 * Returns current time every minute
 */
export function useCurrentTime() {
  let [time, setTime] = useState(format(new Date(), FORMAT_STRING));

  useEffect(() => {
    let id = setInterval(() => {
      let currentTime = format(new Date(), FORMAT_STRING);
      if (currentTime !== time) {
        setTime(currentTime);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [time]);

  return time;
}
