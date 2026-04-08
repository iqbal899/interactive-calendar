"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Header({
  currentMonth,
  onPrev,
  onNext,
  onClearRange,
  showClear,
}: any) {
  return (
    <div className="relative flex items-center justify-between mb-6">

      {/* LEFT */}
      <Button
  variant="outline"
  size="icon"
  onClick={onPrev}
  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
>
  <ChevronLeft className="w-4 h-4 text-gray-800 dark:text-gray-200" />
</Button>
      {/* CENTER */}
      <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-gray-900 dark:text-whitepointer-events-none">
        {format(currentMonth, "MMMM yyyy")}
      </h2>

      {/* RIGHT */}
     <div className="flex items-center gap-2">

  {showClear && (
  <Button
    variant="outline"
    size="sm"
    onClick={onClearRange}
    className="
      gap-1
      border-transparent text-red-600 hover:bg-gray-100
      dark:border-transparent dark:text-red-400 dark:hover:bg-gray-800
      transition-colors
    "
  >
    <X className="w-3 h-3" />
    Clear
  </Button>
)}

  <Button
  variant="outline"
  size="icon"
  onClick={onNext}
  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
>
  <ChevronRight className="w-4 h-4 text-gray-800 dark:text-gray-200" />
</Button>

</div>
    </div>
  );
}