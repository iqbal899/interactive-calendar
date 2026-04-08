"use client";

import { useState } from "react";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { motion } from "framer-motion";

export default function Calendar() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-white border"
      >
        <div className="grid md:grid-cols-2">

          {/* IMAGE */}
          <div className="relative h-64 md:h-full">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-6">
              <h1 className="text-white text-2xl font-semibold">
                Plan Your Month
              </h1>
            </div>
          </div>

          {/* CALENDAR */}
          <div className="p-6">
            <CalendarGrid
              startDate={startDate}
              endDate={endDate}
              selectedDate={selectedDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>

        <NotesPanel selectedDate={selectedDate} />
      </motion.div>
    </div>
  );
}