"use client";

import { Choice } from "@/engine/types";

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoose: (choice: Choice) => void;
  disabled: boolean;
}

export default function ChoiceButtons({
  choices,
  onChoose,
  disabled,
}: ChoiceButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onChoose(choice)}
          disabled={disabled}
          className="w-full text-left px-5 py-4 rounded-xl border-2 border-gray-200
                     bg-white text-gray-700 text-base leading-snug
                     hover:border-indigo-400 hover:bg-indigo-50
                     active:scale-[0.98] transition-all duration-150
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white"
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
