"use client";

import { format, isSameDay, isAfter, isBefore } from "date-fns";
import clsx from "clsx";

export default function DayCell({
  day,
  startDate,
  endDate,
  selectedDate,
  onClick,
  hasNote,
  isRangeNote,
}: any) {
  const isStart = startDate && isSameDay(day, startDate);
  const isEnd = endDate && isSameDay(day, endDate);

  const inRange =
    startDate &&
    endDate &&
    isAfter(day, startDate) &&
    isBefore(day, endDate);

  const isSelected =
    selectedDate && isSameDay(day, selectedDate);

  return (
    <div
      onClick={() => onClick(day)}
      className={clsx(
        "h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 text-gray-800 relative",
        "hover:scale-105 hover:bg-gray-200",

        isRangeNote && "bg-blue-100 border border-blue-300",
         isStart && "bg-blue-600 text-white",
        isEnd && "bg-red-500 text-white",

        isSelected && "ring-2 ring-black"
      )}
    >
      {format(day, "d")}

      {hasNote && (
        <span className="absolute bottom-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
      )}
    </div>
  );
}