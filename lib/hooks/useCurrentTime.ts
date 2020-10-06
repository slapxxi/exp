import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export function useCurrentTime() {
  let [time, setTime] = useState(format(new Date(), 'k:mm'));

  useEffect(() => {
    let id = setInterval(() => {
      let currentTime = format(new Date(), 'k:mm');
      if (currentTime !== time) {
        setTime(currentTime);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [time]);

  return time;
}
