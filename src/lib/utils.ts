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

