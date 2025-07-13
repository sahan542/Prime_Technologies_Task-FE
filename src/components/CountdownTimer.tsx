"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
      if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0 && !expired) {
        setExpired(true);
        clearInterval(timer);
        alert("Offer Expired!");
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, expired]);

  return (
    <div className="flex justify-center w-full mt-4 px-4">
<div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 p-4 rounded-2xl bg-[url('https://res.cloudinary.com/dtzx6gxfh/image/upload/v1752339349/hyhtg_alawz0.jpg')] bg-cover bg-center shadow-md mb-4">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600">Flash Sale</div>
            <p className="text-lg md:text-xl text-gray-700 mt-2">Hurry! Offers end soon.</p>
<Link href="/products">
  <button className="mt-4 px-6 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition duration-200">
    Shop Flash Sale
  </button>
</Link>
          </div>

          {expired ? (
            <div className="text-3xl font-bold text-red-600 text-center">Offer Expired!</div>
          ) : (
            <div className="flex flex-row justify-center gap-4 md:gap-6">
              <div className="text-center bg-gray-100 p-4 rounded-lg shadow">
                <span className="text-4xl font-bold text-gray-900">{timeLeft.hours?.toString().padStart(2, "0")}</span>
                <div className="text-sm text-gray-500">Hours</div>
              </div>
              <div className="text-center bg-gray-100 p-4 rounded-lg shadow">
                <span className="text-4xl font-bold text-gray-900">{timeLeft.minutes?.toString().padStart(2, "0")}</span>
                <div className="text-sm text-gray-500">Minutes</div>
              </div>
              <div className="text-center bg-gray-100 p-4 rounded-lg shadow">
                <span className="text-4xl font-bold text-gray-900">{timeLeft.seconds?.toString().padStart(2, "0")}</span>
                <div className="text-sm text-gray-500">Seconds</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
