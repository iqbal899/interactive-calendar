"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Header({ currentMonth, onPrev, onNext }: any) {
  return (
    <div className="flex justify-between items-center mb-6">
      
      <Button variant="outline" size="icon" onClick={onPrev}>
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <h2 className="text-xl font-semibold">
        {format(currentMonth, "MMMM yyyy")}
      </h2>

      <Button variant="outline" size="icon" onClick={onNext}>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}