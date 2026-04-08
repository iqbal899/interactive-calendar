"use client";

import { format } from "date-fns";
import { useNoteState } from "@/hooks/useNoteState";
import { useSaveNote } from "@/hooks/useSaveNote";
import { useDeleteNote } from "@/hooks/useDeleteNote";

export default function NotesPanel(props: any) {
  const { selectedDate, startDate, endDate  , onClearRange} = props;

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
        className="w-full rounded-xl border p-3 resize-none overflow-hidden"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex gap-3 mt-3">
        <button
          onClick={saveNote}
          className="px-5 py-2 rounded-xl bg-blue-500 text-white"
        >
          Save
        </button>

        <button
          onClick={deleteNote}
          className="px-5 py-2 rounded-xl bg-red-500 text-white"
        >
          Delete
        </button>

        {startDate && endDate && (
    <button
      onClick={onClearRange}
      className="px-5 py-2 rounded-xl bg-gray-300 text-gray-800 hover:bg-gray-400"
    >
      Clear Range
    </button>
  )}

      </div>
    </div>
  );
}