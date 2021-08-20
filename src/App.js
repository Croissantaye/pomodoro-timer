import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import boopSfx from './alarm.wav';

function Pomodoro(props){
  const workMinutes = (props.workMinutes - 1);
  const restMinutes = props.restMinutes - 1;
  const resestSeconds = props.seconds;
  const [minutes, setMinutes] = useState(props.workMinutes - 1);
  const [seconds, setSeconds] = useState(props.seconds);
  const [restPeriod, setRestPeriod] = useState(props.isRest);
  const [PlaySound, setPlaySound] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
          PlaySound && setPlaySound(false);
        } else {
          let minutes = restPeriod ? workMinutes : restMinutes;
          let seconds = resestSeconds;

          setSeconds(seconds);
          setMinutes(minutes);
          setRestPeriod(!restPeriod);
          console.log("timer change");
        }
      } else {
        setSeconds(seconds - 1);
        PlaySound && setPlaySound(false);
      }
    }, 1000);
  }, [seconds]);

  useEffect(() => {
    console.log("play sound here");
    setPlaySound(true);
    console.log(PlaySound);
  }, [restPeriod]);

  return (
    <div className="pomodoro">
      <div className="timer">{ minutes > 10 ? minutes : `0${minutes}` }:{ seconds > 10 ? seconds : `0${seconds}` }</div>
      <div className="message">
        {restPeriod ? <h1>Break</h1> : <h1>Work</h1>}
        {PlaySound ? <ReactPlayer url={boopSfx} playing={true}/> : null }
      </div>
    </div>
  );
}

function App() {
  return (
      <div>
        <h1>Pomodoro Timer</h1>
        <Pomodoro workMinutes={25} restMinutes={5} seconds={59} isRest={false}></Pomodoro>
      </div>
    );
}

export default App;
