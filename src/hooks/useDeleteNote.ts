import { getDateKey } from "@/lib/utils";
import toast from "react-hot-toast";

export const useDeleteNote = ({
  selectedDate,
  startDate,
  endDate,
  calendarData,
  setCalendarData,
  setStartDate,
  setEndDate,
  setSelectedDate,
}: any) => {
  const deleteNote = () => {
    let updated = { ...calendarData };

    if (startDate && endDate) {
      const startKey = getDateKey(startDate);
      const endKey = getDateKey(endDate);

      updated.rangeNotes = updated.rangeNotes.filter(
        (r: any) => !(r.start === startKey && r.end === endKey)
      );

      setStartDate(null);
      setEndDate(null);
      setSelectedDate(null);
    } else if (selectedDate) {
      const key = getDateKey(selectedDate);
      delete updated.dateNotes[key];
    } else {
      updated.monthNote = "";
    }

    setCalendarData({ ...updated });
    localStorage.setItem("calendar-data", JSON.stringify(updated));
     toast.error("Note deleted!");
  };

 
  return { deleteNote };
};