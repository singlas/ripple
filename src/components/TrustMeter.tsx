"use client";

interface TrustMeterProps {
  value: number;
  label: string;
}

function getMeterColor(value: number): string {
  if (value >= 40) return "bg-emerald-500";
  if (value >= 25) return "bg-amber-500";
  if (value >= 15) return "bg-orange-500";
  return "bg-red-500";
}

function getMeterLabel(value: number): string {
  if (value >= 40) return "Trusted";
  if (value >= 25) return "Shaky";
  if (value >= 15) return "Critical";
  return "Broken";
}

export default function TrustMeter({ value, label }: TrustMeterProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm text-gray-500">
          {getMeterLabel(value)} ({value})
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getMeterColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
