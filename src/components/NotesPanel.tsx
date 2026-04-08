"use client";

import { format } from "date-fns";
import { useNoteState } from "@/hooks/useNoteState";
import { useSaveNote } from "@/hooks/useSaveNote";
import { useDeleteNote } from "@/hooks/useDeleteNote";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function NotesPanel(props: any) {
  const { selectedDate, startDate, endDate } = props;

  const { note, setNote } = useNoteState(props);

  const { dark, toggleTheme } = useTheme();

  const { saveNote } = useSaveNote({
    ...props,
    note,
  });

  const { deleteNote } = useDeleteNote(props);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-200/20 dark:border-gray-700/30">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Notes</h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {startDate && endDate
          ? `Range: ${format(startDate, "dd MMM")} → ${format(endDate, "dd MMM")}`
          : selectedDate
            ? `Date: ${format(selectedDate, "dd MMM yyyy")}`
            : "Monthly Notes"}
      </p>

      <textarea
        rows={1}
        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
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
          className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition"
        >
          Save
        </button>

        {/* DELETE */}
        <button
          onClick={deleteNote}
          className="px-4 py-2 rounded-lg text-red-500 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/30 transition"
        >
          Delete
        </button>

      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
        >
          {dark ? (
            <Sun className="w-4 h-4 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}