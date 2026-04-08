"use client";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import { useState } from "react";
import DayCell from "./DayCell";
import Header from "./Header";

export default function CalendarGrid({
  startDate,
  endDate,
  selectedDate,
  setStartDate,
  setEndDate,
  setSelectedDate,
  calendarData,
}: any) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleClick = (day: Date) => {
  const key = format(day, "yyyy-MM-dd");


  const rangeMatch = calendarData.rangeNotes?.find((r: any) => {
    return key >= r.start && key <= r.end;
  });

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

      <div className="grid grid-cols-7 gap-2">
        {days.map((day: Date) => {
           const key = format(day, "yyyy-MM-dd");

  const hasNote = calendarData.dateNotes?.[key]; 

  const isRangeNote = calendarData.rangeNotes?.some((r: any) => {
    return key >= r.start && key <= r.end; 
  });

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