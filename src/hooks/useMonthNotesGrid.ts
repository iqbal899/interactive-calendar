import { getDateKey } from "@/lib/utils";

export const useMonthNotesGrid = ({
  currentMonth,
  calendarData,
}: any) => {
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  const notes: any[] = [];

  Object.entries(calendarData.dateNotes || {}).forEach(
    ([key, note]) => {
      const date = new Date(key);

      if (
        date.getMonth() === month &&
        date.getFullYear() === year
      ) {
        notes.push({
          type: "date",
          date,
          note,
        });
      }
    }
  );

  (calendarData.rangeNotes || []).forEach((r: any) => {
    const start = new Date(r.start);

    if (
      start.getMonth() === month &&
      start.getFullYear() === year
    ) {
      notes.push({
        type: "range",
        date: start,
        note: r.note,
      });
    }
  });

  // sort by date
  notes.sort((a, b) => a.date - b.date);

  return notes;
};