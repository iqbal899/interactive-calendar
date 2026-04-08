"use client";

import { useEffect, useState } from "react";
import { getDateKey, findRangeMatch } from "@/lib/utils";

export const useNoteState = ({
  selectedDate,
  startDate,
  endDate,
  calendarData,
  currentMonth, 
}: any) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      const found = calendarData.rangeNotes?.find(
        (r: any) =>
          r.start === getDateKey(startDate) &&
          r.end === getDateKey(endDate)
      );

      setNote(found?.note || "");
      return;
    }

    if (selectedDate) {
      const key = getDateKey(selectedDate);

      const rangeMatch = findRangeMatch(calendarData, key);
      if (rangeMatch) {
        setNote(rangeMatch.note);
        return;
      }

      if (calendarData.dateNotes?.[key]) {
        setNote(calendarData.dateNotes[key]);
        return;
      }

      setNote("");
      return;
    }

    const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
    setNote(calendarData.monthNotes?.[monthKey] || "");

  }, [selectedDate, startDate, endDate, calendarData, currentMonth]);

  return { note, setNote };
};