"use client";

import { format, isSameDay } from "date-fns";
import clsx from "clsx";
import { getDateKey } from "@/lib/utils";

export default function DayCell({
  day,
  startDate,
  endDate,
  selectedDate,
  onClick,
  hasNote,
  isRangeNote,
}: any) {

  const isSelected =
    selectedDate && isSameDay(day, selectedDate);

  const inSelectedRange =
    startDate &&
    endDate &&
    getDateKey(day) >= getDateKey(startDate) &&
    getDateKey(day) <= getDateKey(endDate);

  return (
    <div
      onClick={() => onClick(day)}
      className={clsx(
        "h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200  text-gray-800 dark:text-gray-200 relative",
        "hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-700",
        isRangeNote && "bg-blue-100 dark:bg-blue-900/40",
        inSelectedRange && "bg-blue-200 dark:bg-blue-800/50",
        isSelected && "ring-2 ring-black"
      )}
    >
      {format(day, "d")}

      {hasNote && (
        <span className="absolute bottom-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
      )}
    </div>
  );
}