"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = ["Hari Ini", "Minggu Ini", "Bulan Ini", "Custom"];

export function DateRangeFilterTabs() {
  const [activeTab, setActiveTab] = useState<string>("Bulan Ini");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // TODO: refetch KPIs/chart based on selected date range parameters dynamically
  };

  return (
    <div className="flex justify-end w-full border-b border-border/60 pb-1">
      <div className="flex items-center gap-6 text-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab)}
            className={cn(
              "pb-2 transition-all duration-200 relative focus:outline-none",
              activeTab === tab
                ? "text-primary font-semibold border-b-2 border-primary z-10"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
