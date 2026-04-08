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

    // Range notes - I  only show the range note in the month if the start of the range is in the month (to avoid duplicates)
    (calendarData.rangeNotes || []).forEach((r: any) => {
        const start = new Date(r.start);
        const end = new Date(r.end);
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);

        const overlaps =
            start <= endOfMonth && end >= startOfMonth;

        if (overlaps) {
            notes.push({
                type: "range",
                start,
                end,
                date: start, // for sorting
                note: r.note,
            });
        }
    });

    // sort by date
    notes.sort((a, b) => a.date - b.date);

    return notes;
};