"use client";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";
import DayCell from "./DayCell";
import Header from "./Header";
import {
  getDateKey,
  checkHasNote,
  checkIsRangeNote,
  findRangeMatch,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CalendarGrid({
  startDate,
  endDate,
  selectedDate,
  setStartDate,
  setEndDate,
  setSelectedDate,
  calendarData,
  currentMonth,
  setCurrentMonth,
  onClearRange,
}: any) {

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleClick = (day: Date) => {
    const key = getDateKey(day);

    const rangeMatch = findRangeMatch(calendarData, key);

    if (rangeMatch) {
      setStartDate(new Date(rangeMatch.start));
      setEndDate(new Date(rangeMatch.end));
      setSelectedDate(day);
      return;
    }

    setSelectedDate(day);

    if (!startDate || endDate) {
      setStartDate(day);
      setEndDate(null);
    } else {
      if (day < startDate) setStartDate(day);
      else setEndDate(day);
    }
  };

  return (
    <div>
      <Header
        currentMonth={currentMonth}
        onPrev={() => setCurrentMonth(subMonths(currentMonth, 1))}
        onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
      />

      {startDate && endDate && (
        <div className="mb-4 flex justify-end">
          <Button
  variant="outline"
  size="sm"
  onClick={onClearRange}
  className=" rounded-xl border-red-400 text-red-600 hover:bg-red-100"
>
  Clear Range
</Button>
        </div>
      )}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day: Date) => {
          const key = getDateKey(day);

          const hasNote = checkHasNote(calendarData, key);
          const isRangeNote = checkIsRangeNote(calendarData, key);


          return (
            <DayCell
              key={day.toString()}
              day={day}
              startDate={startDate}
              endDate={endDate}
              selectedDate={selectedDate}
              onClick={handleClick}
              hasNote={hasNote}
              isRangeNote={isRangeNote}
            />
          );
        })}
      </div>
    </div>
  );
}