"use client";

import { useState, useEffect } from "react";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { motion } from "framer-motion";
import monthImages from "@/lib/monthImages";
import { useMonthNotesGrid } from "@/hooks/useMonthNotesGrid";

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

  const handleClearRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const [calendarData, setCalendarData] = useState<any>({
    monthNotes: {},
    dateNotes: {},
    rangeNotes: [],
  });

  const notes = useMonthNotesGrid({
    currentMonth,
    calendarData,
  });

  const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const monthNote = calendarData.monthNotes?.[monthKey] || "";
  const hasMonthNote = !!monthNote;

  useEffect(() => {
    const saved = localStorage.getItem("calendar-data");
    if (saved) setCalendarData(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 
    dark:from-[#0a0f1f] dark:to-[#111827] p-4 transition-colors">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl overflow-hidden md:rounded-3xl bg-white dark:bg-[#0b1220] shadow-lg dark:shadow-black/40 transition-colors"
      >
        <div className="grid md:grid-cols-2">

          {/* IMAGE SECTION */}
          <div className="relative h-[360px] md:h-full overflow-visible">

            {/* IMAGE */}
            <motion.img
              key={currentMonthIndex}
              src={monthImages[currentMonthIndex]}
              className="w-full h-full object-cover"
            />

            {/* CONTENT LAYER */}
            <div className="absolute inset-0 flex flex-col">

              {/* SCROLLABLE NOTES AREA */}
              <div className="flex-1 overflow-y-auto scrollbar-none p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[90px]">

                  {notes.slice(0, 6).map((item, index) => (
                    <div
                      key={index}
                      className="bg-black/50 backdrop-blur-md text-white rounded-lg p-3 h-[90px] flex flex-col justify-between border border-white/10 shadow-md"
                    >
                      <p className="text-[10px] opacity-70">
                        {item.type === "range" ? (
                          <>
                            {item.start.getDate()}{" "}
                            {item.start.toLocaleString("default", { month: "short" })} - {" "}
                            {item.end.getDate()}{" "}
                            {item.end.toLocaleString("default", { month: "short" })}
                          </>
                        ) : (
                          <>
                            {item.date.getDate()}{" "}
                            {item.date.toLocaleString("default", { month: "short" })}
                          </>
                        )}
                      </p>

                      <p className="text-xs line-clamp-3">
                        {item.note}
                      </p>
                    </div>
                  ))}

                </div>
              </div>

              {/* FIXED BOTTOM CARD */}
              <div className="p-4">
                <div
                  onClick={handleMonthClick}
                  className="w-full bg-white/10 backdrop-blur-md rounded-xl p-4 cursor-pointer transition hover:bg-white/20 hover:scale-[1.02] border border-white/20"
                >
                  {!hasMonthNote ? (
                    <>
                      <h1 className="text-white text-lg font-semibold">
                        Plan Your Month
                      </h1>
                      <p className="text-white/80 text-sm mt-1">
                        Click to add monthly notes
                      </p>
                    </>
                  ) : (
                    <>
                      <h1 className="text-white text-sm opacity-80">
                        Monthly Note
                      </h1>
                      <p className="text-white text-sm mt-1 line-clamp-2">
                        {monthNote}
                      </p>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* CALENDAR */}
          <div className="p-6 bg-white dark:bg-gray-900 transition-colors">
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
              onClearRange={handleClearRange}
            />
          </div>
        </div>

        {/* NOTES PANEL */}
        <NotesPanel
          selectedDate={selectedDate}
          startDate={startDate}
          endDate={endDate}
          calendarData={calendarData}
          setCalendarData={setCalendarData}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSelectedDate={setSelectedDate}
          currentMonth={currentMonth}
        />
      </motion.div>
    </div>
  );
}