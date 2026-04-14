"use client";

interface TrustMeterProps {
  value: number;
  label: string;
  isBroken: boolean;
}

function getMeterColor(value: number, isBroken: boolean): string {
  if (isBroken) return "bg-red-700";
  if (value >= 40) return "bg-emerald-500";
  if (value >= 25) return "bg-amber-500";
  if (value >= 15) return "bg-orange-500";
  return "bg-red-500";
}

function getMeterLabel(value: number, isBroken: boolean): string {
  if (isBroken) return "Broken";
  if (value >= 40) return "Trusted";
  if (value >= 25) return "Shaky";
  if (value >= 15) return "Critical";
  return "Broken";
}

export default function TrustMeter({ value, label, isBroken }: TrustMeterProps) {
  return (
    <div className="w-full min-h-[44px]">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm text-gray-500">
          {getMeterLabel(value, isBroken)} ({value})
        </span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getMeterColor(value, isBroken)}`}
          style={{ width: `${value}%` }}
        />
        {isBroken && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 200 20"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 60 0 L 55 6 L 65 8 L 52 14 L 58 20
                 M 110 0 L 105 5 L 115 10 L 100 15 L 108 20
                 M 150 0 L 145 7 L 155 9 L 142 16 L 148 20"
              fill="none"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
