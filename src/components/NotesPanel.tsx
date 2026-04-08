"use client";

import { format } from "date-fns";
import { useNoteState } from "@/hooks/useNoteState";
import { useSaveNote } from "@/hooks/useSaveNote";
import { useDeleteNote } from "@/hooks/useDeleteNote";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

import { getMonthNotesCount } from "@/lib/utils";

export default function NotesPanel(props: any) {
  const { selectedDate, startDate, endDate, calendarData, currentMonth } = props;

  const { note, setNote } = useNoteState(props);

  const { dark, toggleTheme } = useTheme();

  const safeNote = typeof note === "string" ? note : "";

  const MAX_CHARS = 40;
  const charCount = safeNote.length;

  const { saveNote } = useSaveNote({
    ...props,
    note: safeNote,
    currentMonth,
  });

  const { deleteNote } = useDeleteNote({
    ...props,
    note: safeNote,
  });

  const isEmpty = !safeNote.trim();
  const hasExistingNote = !!safeNote.trim();

  const monthCount = getMonthNotesCount(calendarData, currentMonth);
  const isLimitReached = monthCount >= 6;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-200/20 dark:border-gray-700/30">

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Notes
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {startDate && endDate
          ? `Range: ${format(startDate, "dd MMM")} - ${format(endDate, "dd MMM")}`
          : selectedDate
            ? `Date: ${format(selectedDate, "dd MMM yyyy")}`
            : "Monthly Notes"}
      </p>

      {/* TEXTAREA */}
      <textarea
        rows={2}
        placeholder={`Write your notes... (max ${MAX_CHARS} characters)`}
        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 leading-relaxed resize-none overflow-hidden min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
        value={safeNote}
        onChange={(e) => {
          const text = e.target.value;

          const trimmedText = text.slice(0, MAX_CHARS);
          setNote(trimmedText);

          const el = e.target;
          el.style.height = "auto";
          el.style.height = el.scrollHeight + "px";
        }}
      />

      {/* CHAR COUNT */}
      <p
        className={`text-xs mt-1 text-right ${charCount > MAX_CHARS - 10
            ? "text-red-500"
            : "text-gray-400"
          }`}
      >
        {charCount}/{MAX_CHARS} characters
      </p>

      {/* LIMIT MESSAGE */}
      {isLimitReached && (
        <p className="text-xs text-red-500 mt-1">
          Maximum 6 notes allowed for this month
        </p>
      )}

      {/* BUTTONS */}
      <div className="flex gap-3 mt-3">

        {/* SAVE */}
        <button
          onClick={saveNote}
          disabled={isEmpty || isLimitReached}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition
            ${isEmpty || isLimitReached
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            }
          `}
        >
          Save
        </button>

        {/* DELETE */}
        <button
          onClick={deleteNote}
          disabled={!hasExistingNote}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition
            ${!hasExistingNote
              ? "text-gray-400 cursor-not-allowed"
              : "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
            }
          `}
        >
          Delete
        </button>

      </div>

      {/* DARK MODE */}
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