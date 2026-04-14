"use client";

interface JournalProps {
  entries: string[];
}

export default function Journal({ entries }: JournalProps) {
  if (entries.length === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Your Story
      </h3>
      <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="bg-white border border-gray-150 rounded-lg px-4 py-3 text-sm text-gray-700 leading-relaxed"
          >
            {entry}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 italic mt-3 text-center">
        This is your story. What would you change?
      </p>
    </div>
  );
}
