import { getDateKey, findRangeMatch, getMonthNotesCount } from "@/lib/utils";
import toast from "react-hot-toast";

export const useSaveNote = ({
    selectedDate,
    startDate,
    endDate,
    note,
    calendarData,
    setCalendarData,
    currentMonth,
}: any) => {
    const saveNote = () => {
        let updated = { ...calendarData };

        // LIMIT CHECK (ONLY FOR DATE + RANGE)
        if (selectedDate || (startDate && endDate)) {
            const count = getMonthNotesCount(calendarData, currentMonth);

            if (count >= 6) {
                toast.error("Maximum 6 notes allowed for this month");
                return;
            }
        }

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

            setCalendarData({ ...updated });
            localStorage.setItem("calendar-data", JSON.stringify(updated));
            toast.success("Range note saved");
            return;
        }

        if (selectedDate) {
            const key = getDateKey(selectedDate);

            const rangeMatch = findRangeMatch(calendarData, key);

            if (rangeMatch) {
                toast.error("This date is part of a range note");
                return;
            }

            updated.dateNotes[key] = note;

            setCalendarData({ ...updated });
            localStorage.setItem("calendar-data", JSON.stringify(updated));
            toast.success("Date note saved");
            return;
        }

        const key = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;

        updated.monthNotes = {
            ...updated.monthNotes,
            [key]: note,
        };

        setCalendarData({ ...updated });
        localStorage.setItem("calendar-data", JSON.stringify(updated));
        toast.success("Month note saved");
    };

    return { saveNote };
};