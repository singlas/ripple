"use client";

import { EndState } from "@/engine/types";
import Journal from "@/components/Journal";

interface EndScreenProps {
  ending: EndState;
  journalEntries: string[];
  onReplay: () => void;
}

function getTierStyle(tier: EndState["tier"]): string {
  switch (tier) {
    case "excellent":
      return "from-emerald-50 to-green-50 border-emerald-200";
    case "good":
      return "from-amber-50 to-yellow-50 border-amber-200";
    case "rocky":
      return "from-orange-50 to-red-50 border-orange-200";
    case "broken":
      return "from-red-50 to-gray-100 border-red-200";
  }
}

function getTierTitleColor(tier: EndState["tier"]): string {
  switch (tier) {
    case "excellent":
      return "text-emerald-700";
    case "good":
      return "text-amber-700";
    case "rocky":
      return "text-orange-700";
    case "broken":
      return "text-red-700";
  }
}

export default function EndScreen({
  ending,
  journalEntries,
  onReplay,
}: EndScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      <div
        className={`rounded-2xl border-2 bg-gradient-to-b p-8 text-center ${getTierStyle(ending.tier)}`}
      >
        <h2
          className={`text-2xl font-bold mb-4 ${getTierTitleColor(ending.tier)}`}
        >
          {ending.title}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {ending.message}
        </p>
      </div>

      <Journal entries={journalEntries} />

      <button
        onClick={onReplay}
        className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium
                   hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        Play Again
      </button>
    </div>
  );
}
