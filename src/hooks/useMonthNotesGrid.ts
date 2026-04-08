import { getMonthNotesCount } from "@/lib/utils";
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
        const end = new Date(r.end);

        const startMonth = start.getMonth();
        const startYear = start.getFullYear();

        const currentMonthIndex = currentMonth.getMonth();
        const currentYear = currentMonth.getFullYear();

        const isStartMonth =
            startMonth === currentMonthIndex &&
            startYear === currentYear;

        const startMonthDate = new Date(startYear, startMonth, 1);
        const startMonthCount = getMonthNotesCount(calendarData, startMonthDate);

        if (startMonthCount < 6) {
            if (isStartMonth) {
                notes.push({
                    type: "range",
                    start,
                    end,
                    date: start,
                    note: r.note,
                });
            }
            return;
        }

        const overlaps =
            start <= new Date(currentYear, currentMonthIndex + 1, 0) &&
            end >= new Date(currentYear, currentMonthIndex, 1);

        if (overlaps) {
            notes.push({
                type: "range",
                start,
                end,
                date: start,
                note: r.note,
            });
        }
    });

    // sort by date
    notes.sort((a, b) => a.date - b.date);

    return notes;
};