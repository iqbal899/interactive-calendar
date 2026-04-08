"use client";

import { useState, useEffect } from "react";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { motion } from "framer-motion";
import monthImages from "@/lib/monthImages";

export default function Calendar() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const currentMonthIndex = currentMonth.getMonth();

  const handleMonthClick = () => {
    setSelectedDate(null);
    setStartDate(null);
    setEndDate(null);
  };

  const [calendarData, setCalendarData] = useState<any>({
    monthNote: "",
    dateNotes: {},
    rangeNotes: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem("calendar-data");
    if (saved) setCalendarData(JSON.parse(saved));
  }, []);

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
            
            <motion.img
              key={currentMonthIndex}
              src={monthImages[currentMonthIndex]}
              className="w-full h-full object-cover"
              initial={{ opacity: 0.6, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* HEADER CARD */}
            <div className="absolute inset-0 flex items-end p-6">
              <div
                onClick={handleMonthClick}
                className="w-full bg-white/10 backdrop-blur-md rounded-xl p-4 cursor-pointer transition hover:bg-white/20 hover:scale-[1.02] border border-white/20"
              >
                <h1 className="text-white text-lg font-semibold">
                  Plan Your Month
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  Click to add monthly notes
                </p>
              </div>
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
              calendarData={calendarData}
              currentMonth={currentMonth}          
              setCurrentMonth={setCurrentMonth}    
            />
          </div>
        </div>

        {/* NOTES */}
        <NotesPanel
          selectedDate={selectedDate}
          startDate={startDate}
          endDate={endDate}
          calendarData={calendarData}
          setCalendarData={setCalendarData}
        />
      </motion.div>
    </div>
  );
}