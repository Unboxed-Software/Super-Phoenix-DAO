'use client';

import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

export default function ReleaseCountDown() {
  const releaseDate = dayjs('2024-04-30');
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    console.log('Setting Interval');
    const interval = setInterval(() => {
      console.log('Updating Date');
      setDate(dayjs());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const { remaningDays, remainingHours, remainingMinutes } = useMemo(() => {
    return {
      remaningDays: releaseDate.diff(date, 'days'),
      remainingHours: releaseDate.diff(date, 'hours') % 24,
      remainingMinutes: releaseDate.diff(date, 'minutes') % 60,
    };
  }, [date]);

  return (
    <div className="container flex flex-row justify-center">
      <div className="m-3 w-20 rounded-2xl border border-neutral-500 bg-gray-850 p-4 text-center">
        <p className="text-2xl text-white">{remaningDays}</p>
        <p className="text-neutral-400">DAYS</p>
      </div>
      <div className="m-3 w-20 rounded-2xl border border-neutral-500 bg-gray-850 p-4 text-center">
        <p className="text-2xl text-white">{remainingHours}</p>
        <p className="text-neutral-400">HRS</p>
      </div>
      <div className="m-3 w-20 rounded-2xl border border-neutral-500 bg-gray-850 p-4 text-center">
        <p className="text-2xl text-white">{remainingMinutes}</p>
        <p className="text-neutral-400">MIN</p>
      </div>
    </div>
  );
}
