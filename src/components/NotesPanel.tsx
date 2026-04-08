"use client";

import { format } from "date-fns";
import { useNoteState } from "@/hooks/useNoteState";
import { useSaveNote } from "@/hooks/useSaveNote";
import { useDeleteNote } from "@/hooks/useDeleteNote";

export default function NotesPanel(props: any) {
  const { selectedDate, startDate, endDate } = props;

  const { note, setNote } = useNoteState(props);

  const { saveNote } = useSaveNote({
    ...props,
    note,
  });

  const { deleteNote } = useDeleteNote(props);

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
  rows={1}
  className="w-full rounded-xl border border-gray-200 p-3 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
  placeholder="Write your notes..."
  value={note}
  onChange={(e) => {
    setNote(e.target.value);

    const el = e.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }}
/>

      <div className="flex gap-3 mt-3">
        {/* SAVE */}
  <button
    onClick={saveNote}
    className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
  >
    Save
  </button>

  {/* DELETE */}
  <button
    onClick={deleteNote}
    className="px-4 py-2 rounded-lg text-red-500 text-sm font-medium hover:bg-red-50 transition"
  >
    Delete
  </button>

      </div>
    </div>
  );
}