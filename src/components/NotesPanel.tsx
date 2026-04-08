"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getNoteByContext, saveNoteLogic } from "@/lib/utils";

export default function NotesPanel({
  selectedDate,
  startDate,
  endDate,
  calendarData,
  setCalendarData,
}: any) {
  const [note, setNote] = useState("");

  useEffect(() => {
    const result = getNoteByContext({
      selectedDate,
      startDate,
      endDate,
      calendarData,
    });

    setNote(result);
  }, [selectedDate, startDate, endDate, calendarData]);

  const saveNote = () => {
    const updated = saveNoteLogic({
      selectedDate,
      startDate,
      endDate,
      note,
      calendarData,
    });

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
        ref={(el) => {
          if (el) {
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
          }
        }}
        className="w-full rounded-xl border p-3 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Write your notes..."
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
        }}
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