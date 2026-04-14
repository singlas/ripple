"use client";

import { useEffect } from "react";

interface ChainInterstitialProps {
  completedChain: string;
  nextChain: string;
  meterValue: number;
  meterName: string;
  onContinue: () => void;
}

export default function ChainInterstitial({
  completedChain,
  nextChain,
  meterValue,
  meterName,
  onContinue,
}: ChainInterstitialProps) {
  useEffect(() => {
    const timer = setTimeout(onContinue, 2500);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <button
      onClick={onContinue}
      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl"
      aria-label="Continue to next chapter"
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center space-y-5">
        <div className="text-3xl" aria-hidden="true">
          &#10003;
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Chapter Complete
          </p>
          <h2 className="text-xl font-bold text-gray-800">{completedChain}</h2>
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-500">{meterName}</span>
            <span className="text-xs text-gray-400">{meterValue}</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-700 ease-out"
              style={{ width: `${meterValue}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Next: <span className="font-semibold text-gray-700">{nextChain}</span>
        </p>

        <p className="text-xs text-gray-300">Tap to continue</p>
      </div>
    </button>
  );
}
