import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { format } from "date-fns";

//Format date to key
export const getDateKey = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

//Check if date has a single note
export const checkHasNote = (calendarData: any, key: string) => {
  return calendarData.dateNotes?.[key];
};

//Check if date belongs to a range
export const checkIsRangeNote = (calendarData: any, key: string) => {
  return calendarData.rangeNotes?.some((r: any) => {
    return key >= r.start && key <= r.end;
  });
};

// Find range for a date
export const findRangeMatch = (calendarData: any, key: string) => {
  return calendarData.rangeNotes?.find((r: any) => {
    return key >= r.start && key <= r.end;
  });
};

//Get note based on context
export const getNoteByContext = ({
  selectedDate,
  startDate,
  endDate,
  calendarData,
}: any) => {
  if (startDate && endDate) {
    const found = calendarData.rangeNotes?.find(
      (r: any) =>
        r.start === getDateKey(startDate) &&
        r.end === getDateKey(endDate)
    );
    return found?.note || "";
  }

  if (selectedDate) {
    const key = getDateKey(selectedDate);

    const rangeMatch = findRangeMatch(calendarData, key);
    if (rangeMatch) return rangeMatch.note;

    if (calendarData.dateNotes?.[key]) {
      return calendarData.dateNotes[key];
    }

    return "";
  }

  return calendarData.monthNote || "";
};

// Save note logic
export const saveNoteLogic = ({
  selectedDate,
  startDate,
  endDate,
  note,
  calendarData,
}: any) => {
  let updated = { ...calendarData };

  if (startDate && endDate) {
    const range = {
      start: getDateKey(startDate),
      end: getDateKey(endDate),
      note,
    };

    updated.rangeNotes = [
      ...updated.rangeNotes.filter(
        (r: any) =>
          !(r.start === range.start && r.end === range.end)
      ),
      range,
    ];
  } else if (selectedDate) {
    const key = getDateKey(selectedDate);
    updated.dateNotes[key] = note;
  } else {
    updated.monthNote = note;
  }

  return updated;
};