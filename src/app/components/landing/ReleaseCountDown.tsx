'use client';

import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

export default function ReleaseCountDown() {
  const releaseDate = dayjs(process.env.NEXT_PUBLIC_RELEASE_DATE);
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { remaningDays, remainingHours, remainingMinutes } = useMemo(() => {
    return {
      remaningDays: releaseDate.diff(date, 'days'),
      remainingHours: releaseDate.diff(date, 'hours') % 24,
      remainingMinutes: releaseDate.diff(date, 'minutes') % 60,
    };
  }, [date, releaseDate]);

  return (
    <div className="container flex flex-row justify-center">
      <div className="m-3 h-20 w-20 rounded-2xl border border-neutral-500 bg-gray-850 p-4 text-center">
        <p className="text-xl text-white">{remaningDays}</p>
        <p className="font-medium text-neutral-400">DAYS</p>
      </div>
      <div className="m-3 h-20 w-20 rounded-2xl border border-neutral-500 bg-gray-850 p-4 text-center">
        <p className="text-xl text-white">{remainingHours}</p>
        <p className="font-medium text-neutral-400">HRS</p>
      </div>
      <div className="m-3 h-20 w-20 rounded-2xl border border-neutral-500 bg-gray-850 p-4 text-center">
        <p className="text-xl text-white">{remainingMinutes}</p>
        <p className="font-medium text-neutral-400">MIN</p>
      </div>
    </div>
  );
}
