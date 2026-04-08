"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function NotesPanel({
  selectedDate,
  startDate,
  endDate,
  calendarData,
  setCalendarData,
}: any) {
  const [note, setNote] = useState("");

useEffect(() => {

  if (startDate && endDate) {
    const found = calendarData.rangeNotes?.find(
      (r: any) =>
        r.start === format(startDate, "yyyy-MM-dd") &&
        r.end === format(endDate, "yyyy-MM-dd")
    );

    setNote(found?.note || "");
    return;
  }

  if (selectedDate) {
    const selectedKey = format(selectedDate, "yyyy-MM-dd");

const rangeMatch = calendarData.rangeNotes?.find((r: any) => {
  return selectedKey >= r.start && selectedKey <= r.end;
});

    if (rangeMatch) {
      setNote(rangeMatch.note);
      return;
    }

    if (calendarData.dateNotes?.[selectedKey]) {
      setNote(calendarData.dateNotes[selectedKey]);
      return;
    }

    setNote("");
    return;
  }

  setNote(calendarData.monthNote || "");
}, [selectedDate, startDate, endDate, calendarData]);

  const saveNote = () => {
    console.log("Saving note...", {
      selectedDate,
      startDate,
      endDate,
      note,
    });

    let updated = { ...calendarData };

    if (startDate && endDate) {
      const range = {
        start: format(startDate, "yyyy-MM-dd"),
        end: format(endDate, "yyyy-MM-dd"),
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
      const key = format(selectedDate, "yyyy-MM-dd");
      updated.dateNotes[key] = note;
    } else {
      updated.monthNote = note;
    }

    setCalendarData({ ...updated });

    localStorage.setItem("calendar-data", JSON.stringify(updated));

    alert("Note saved ");
  };

  return (
    <div className="p-6 border-t bg-white">
      <h3 className="text-lg font-semibold mb-2">Notes</h3>

      <p className="text-sm text-gray-500 mb-2">
        {startDate && endDate
          ? `Range: ${format(startDate, "dd MMM")} → ${format(endDate, "dd MMM")}`
          : selectedDate
          ? `Date: ${format(selectedDate, "dd MMM yyyy")}`
          : "Monthly Notes"}
      </p>

      <textarea
        className="w-full rounded-xl border p-3"
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={saveNote}
        className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
      >
        Save Note
      </button>
    </div>
  );
}