"use client";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
} from "date-fns";
import { useState, useEffect } from "react";
import DayCell from "./DayCell";
import Header from "./Header";

export default function CalendarGrid({
  startDate,
  endDate,
  selectedDate,
  setStartDate,
  setEndDate,
  setSelectedDate,
}: any) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notes, setNotes] = useState<any>({});

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleClick = (day: Date) => {
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

          return (
            <DayCell
              key={day.toString()}
              day={day}
              startDate={startDate}
              endDate={endDate}
              selectedDate={selectedDate}
              onClick={handleClick}
              hasNote={notes[key]}
            />
          );
        })}
      </div>
    </div>
  );
}