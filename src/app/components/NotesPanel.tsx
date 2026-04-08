"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function NotesPanel({ selectedDate }: any) {
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState<any>({});

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) setAllNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const key = format(selectedDate, "yyyy-MM-dd");
    setNote(allNotes[key] || "");
  }, [selectedDate, allNotes]);

  const saveNote = () => {
    if (!selectedDate) return;

    const key = format(selectedDate, "yyyy-MM-dd");

    const updated = {
      ...allNotes,
      [key]: note,
    };

    setAllNotes(updated);
    localStorage.setItem("calendar-notes", JSON.stringify(updated));
  };

  return (
    <div className="p-6 border-t bg-white">
      <h3 className="text-lg font-semibold mb-2">Notes</h3>

      {selectedDate && (
        <p className="text-sm text-gray-500 mb-2">
          {format(selectedDate, "dd MMM yyyy")}
        </p>
      )}

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