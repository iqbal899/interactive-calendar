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

export const getMonthNotesCount = (calendarData: any, currentMonth: Date) => {
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  let count = 0;

  // 🔴 date notes
  Object.keys(calendarData.dateNotes || {}).forEach((key) => {
    const d = new Date(key);
    if (d.getMonth() === month && d.getFullYear() === year) {
      count++;
    }
  });

  // 🟦 range notes (count each range as 1)
  (calendarData.rangeNotes || []).forEach((r: any) => {
    const start = new Date(r.start);
    if (start.getMonth() === month && start.getFullYear() === year) {
      count++;
    }
  });

  return count;
};

