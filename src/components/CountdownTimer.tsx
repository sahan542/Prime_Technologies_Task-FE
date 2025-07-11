"use client";
import React, { useEffect, useState } from 'react';


// Define the interface for the props
interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();

    let timeLeft: { hours?: number; minutes?: number; seconds?: number } = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft.hours <= 0 && newTimeLeft.minutes <= 0 && newTimeLeft.seconds <= 0 && !expired) {
        setExpired(true);
        clearInterval(timer);
        alert('Offer Expired!');
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, expired]);

  return (
    <div className="flex justify-center gap-8 w-full mt-8 px-4">
      {/* First Countdown Timer */}
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 p-4 rounded-lg ">
        <div className="text-center font-sans flex flex-row">
          <div>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600">
                Flash Sale
              </div>
              <p className="text-lg md:text-xl text-gray-700 mt-2">Hurry! Offers end soon.</p>
          </div>

          {expired ? (
            <div className="text-4xl font-bold text-red-600 mt-4">Offer Expired!</div>
          ) : (
            <div className="flex justify-center gap-6 md:gap-8 p-4 rounded-lg ">
              <div className="text-center bg-white p-4 rounded-lg shadow-md">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">{timeLeft.hours || '00'}</span>
                <div className="text-sm text-gray-500">Hours</div>
              </div>
              <div className="text-center bg-white p-4 rounded-lg shadow-md">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">{timeLeft.minutes || '00'}</span>
                <div className="text-sm text-gray-500">Minutes</div>
              </div>
              <div className="text-center bg-white p-4 rounded-lg shadow-md">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">{timeLeft.seconds || '00'}</span>
                <div className="text-sm text-gray-500">Seconds</div>
              </div>
            </div>
          )}
        <div>
          <button className="mt-6 px-8 py-2 text-lg text-white bg-orange-500 rounded-full hover:bg-orange-600 transition duration-200">
            Shop Flash Sale
          </button>
        </div>


        </div>
      </div>

    </div>
  );
};

export default CountdownTimer;
