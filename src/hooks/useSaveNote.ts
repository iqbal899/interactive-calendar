import { getDateKey } from "@/lib/utils";
import toast from "react-hot-toast";

export const useSaveNote = ({
  selectedDate,
  startDate,
  endDate,
  note,
  calendarData,
  setCalendarData,
}: any) => {
  const saveNote = () => {
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

    setCalendarData({ ...updated });
    localStorage.setItem("calendar-data", JSON.stringify(updated));
    toast.success("Note saved!");
  };

  return { saveNote };
};