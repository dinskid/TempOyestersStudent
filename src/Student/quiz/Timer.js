import React, { useState } from 'react';
import { useEffect } from 'react';

export default function Timer({ onTimerExpire }) {
  const [time, setTime] = useState(localStorage.getItem('TIME') || -1);
  const [totalTime, setTotalTime] = useState(localStorage.getItem('QUIZ_TOTAL_TIME') || -1);

  const formattedTime = () => {
    return `${Math.floor(time / 60)}:${time % 60}`;
  }

  useEffect(() => {
    const iid = setInterval(() => {
      setTime(time => {
        const newTime = time - 1;
        if (time == 0) {
          clearInterval(iid);
          onTimerExpire();
        }
        localStorage.setItem('TIME', JSON.stringify(newTime));
        return newTime;
      });
    }, 1000);

    return () => clearInterval(iid);
  }, []);

  return (
    <div className="timer-container font-weight-bold text-center">
      <div className="title">TIME LEFT</div>
      {/* insert bar here */}
      <div className="progress-bar">
        <div className="progress"
          style={{
            width: `${(time / totalTime)}%`,
          }} />
      </div>
      <span className="text-primary">{formattedTime()}</span>
    </div>
  )

}