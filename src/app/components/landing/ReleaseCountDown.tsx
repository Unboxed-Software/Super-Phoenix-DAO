"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

export default function ReleaseCountDown() {
  const releaseDate = dayjs("2024-04-30");
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    console.log("Setting Interval");
    const interval = setInterval(() => {
      console.log("Updating Date");
      setDate(dayjs());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const { remaningDays, remainingHours, remainingMinutes } = useMemo(() => {
    return {
      remaningDays: releaseDate.diff(date, "days"),
      remainingHours: releaseDate.diff(date, "hours") % 24,
      remainingMinutes: releaseDate.diff(date, "minutes") % 60,
    };
  }, [date]);

  return (
    <div className="container flex flex-row justify-center">
      <div className="p-4 w-20 bg-gray-850 border border-neutral-500 rounded-2xl text-center m-3">
        <p className="text-white text-2xl">{remaningDays}</p>
        <p className="text-neutral-400">DAYS</p>
      </div>
      <div className="p-4 w-20 bg-gray-850 border border-neutral-500 rounded-2xl text-center m-3">
        <p className="text-white text-2xl">{remainingHours}</p>
        <p className="text-neutral-400">HRS</p>
      </div>
      <div className="p-4 w-20 bg-gray-850 border border-neutral-500 rounded-2xl text-center m-3">
        <p className="text-white text-2xl">{remainingMinutes}</p>
        <p className="text-neutral-400">MIN</p>
      </div>
    </div>
  );
}
