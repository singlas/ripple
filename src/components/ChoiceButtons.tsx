"use client";

import { Choice } from "@/engine/types";

interface ChoiceButtonsProps {
  choices: [Choice, Choice];
  onChoose: (choice: Choice) => void;
  disabled: boolean;
  selectedChoice: Choice | null;
}

export default function ChoiceButtons({
  choices,
  onChoose,
  disabled,
  selectedChoice,
}: ChoiceButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      {choices.map((choice) => {
        const isSelected = selectedChoice?.id === choice.id;
        const isUnselected = selectedChoice !== null && !isSelected;
        const glowColor =
          isSelected && choice.meterChange >= 0
            ? "ring-4 ring-emerald-400 border-emerald-400"
            : isSelected
              ? "ring-4 ring-red-400 border-red-400"
              : "";

        return (
          <button
            key={choice.id}
            onClick={() => onChoose(choice)}
            disabled={disabled}
            className={`w-full text-left px-5 py-4 min-h-12 rounded-xl border-2 border-gray-200
                       bg-white text-gray-700 text-lg leading-snug
                       hover:border-indigo-400 hover:bg-indigo-50
                       active:scale-[0.98] transition-all duration-300
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                       disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white
                       ${glowColor}
                       ${isUnselected ? "opacity-50" : ""}
                       ${disabled && !selectedChoice ? "opacity-50" : ""}`}
          >
            {choice.text}
          </button>
        );
      })}
    </div>
  );
}
