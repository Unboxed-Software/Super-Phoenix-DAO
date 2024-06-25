'use client';

import { useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

type Props = {
  targetDate: Dayjs;
};
export default function CountDown({ targetDate }: Props) {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { remainingHours, remainingMinutes, remainingSeconds } = useMemo(() => {
    return {
      remainingHours: targetDate.diff(date, 'hours'),
      remainingMinutes: targetDate.diff(date, 'minutes') % 60,
      remainingSeconds: targetDate.diff(date, 'seconds') % 60,
    };
  }, [date, targetDate]);

  return (
    <div className="container flex flex-row justify-center space-x-1 align-middle">
      <div className="h-12 w-20 rounded-2xl border border-neutral-500 bg-gray-850 p-3 text-center">
        <p className="text-xl text-white">{remainingHours}</p>
      </div>
      <div className="flex p-1 align-middle">
        <p className="m-0 text-4xl font-medium text-white">:</p>
      </div>
      <div className="h-12 w-20 rounded-2xl border border-neutral-500 bg-gray-850 p-3 text-center">
        <p className="text-xl text-white">{remainingMinutes}</p>
      </div>
      <div className="flex p-1 align-middle">
        <p className="m-0 text-4xl font-medium text-white">:</p>
      </div>
      <div className="h-12 w-20 rounded-2xl border border-neutral-500 bg-gray-850 p-3 text-center">
        <p className="text-xl text-white">{remainingSeconds}</p>
      </div>
    </div>
  );
}
