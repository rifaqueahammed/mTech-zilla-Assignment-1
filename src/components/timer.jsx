import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/configue';
import useAuth from '../customHook/currentUser';

const Timer = () => {
  const [mainTime, setMainTime] = useState(25*60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5*60); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const navigate = useNavigate();
  const currentUser = useAuth();

  useEffect(()=>{
    console.log(currentUser)
  })

  useEffect(() => {
    let interval;

    if (timerActive && mainTime > 0) {
      interval = setInterval(() => {
        setMainTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (timerActive && mainTime === 0 && !isBreak) {
      setIsBreak(true);
      setMainTime(0);
    } else if (timerActive && breakTime > 0 && isBreak) {
      interval = setInterval(() => {
        setBreakTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (timerActive && breakTime === 0 && isBreak) {
      setIsBreak(false);
      setMainTime(25*60)
      setBreakTime(5*60);
      setTimerActive(false)
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive, mainTime, breakTime, isBreak]);

  const handleStartPause = () => {
    setTimerActive(prevState => !prevState);
  };

  const handleReset = () => {
    setTimerActive(false);
    setIsBreak(false);
    setMainTime(25 * 60);
    setBreakTime(5 * 60);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const logOut = async()=>{
    try{
      await signOut(auth);
      navigate('/');
    }catch{
     console.log('error');
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-[#77C3FD] via-[#6D7CFD] to-[#B3AAFC]'>
      <button className='p-2 bg-gray-600 text-white rounded-md px-4 absolute top-10 right-10' onClick={logOut}>Logout</button>
      <h1 className='text-3xl text-white font-bold mb-10'>Welcome {currentUser} to Pomodro</h1>
      <div className='w-1/2 md:w-1/4 p-5 rounded-md bg-white flex flex-col justify-center items-center gap-4 shadow-md'>
         <h1 className='text-2xl font-bold text-gray-700'>{isBreak ? 'Break Timer' : 'Main Timer'}</h1>
         <div className="timer">
            <span className={`text-7xl ${isBreak ? 'text-red-600' : 'text-black'}`}>{formatTime(isBreak ? breakTime : mainTime)}</span>
        </div>
        <div className="controls flex gap-2">
            <button className='p-2 px-4 bg-blue-600 rounded-md text-white' onClick={handleStartPause}>{timerActive ? 'Pause' : 'Start'}</button>
            <button className='p-2 px-4 bg-gray-500 rounded-md text-white' onClick={handleReset}>Reset</button>
        </div>
     </div>
    </div>
  );
};

export default Timer;
