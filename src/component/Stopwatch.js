import React, { useState, useEffect } from "react";
import "./stopwatch.css";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval); 
    }
    return () => clearInterval(interval); 
  }, [isRunning, time]);

  const startStopHandler = () => {
    setIsRunning((prevState) => !prevState);
  };

  const resetHandler = () => {
    setTime(0); 
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const milliseconds = ("0" +time % 100).slice(-2);
    const seconds = ("0" + Math.floor((time % 6000) / 100)).slice(-2);
    const minutes = ("0" +Math.floor((time % 360000) / 6000));
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div class="container">
      <div className="stopwatch-container">
        <h1>Stopwatch</h1>
        <div className="time-display">{formatTime(time)}</div>
        <div className="buttons">
        <button onClick={startStopHandler} className="start-stop-btn">
            {isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={resetHandler} disabled={!time} className="reset-btn">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
