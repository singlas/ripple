"use client";

import { useState, useCallback } from "react";
import { GameState, Choice, Scenario } from "@/engine/types";
import { createInitialState, applyChoice } from "@/engine/state";
import { loadRound } from "@/engine/scene";
import { getEnding } from "@/engine/endings";
import brokenPhone from "@/games/tangled/scenarios/broken-phone";
import TrustMeter from "@/components/TrustMeter";
import SceneDisplay from "@/components/SceneDisplay";
import ChoiceButtons from "@/components/ChoiceButtons";
import EndScreen from "@/components/EndScreen";

type GamePhase = "title" | "setup" | "playing" | "ended";

export default function Home() {
  const scenario: Scenario = brokenPhone;
  const [phase, setPhase] = useState<GamePhase>("title");
  const [state, setState] = useState<GameState>(() =>
    createInitialState(scenario.firstRoundId)
  );
  const [choosing, setChoosing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGame = useCallback(() => {
    setPhase("setup");
  }, []);

  const beginPlaying = useCallback(() => {
    setPhase("playing");
  }, []);

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (choosing) return;
      setChoosing(true);

      // Small delay for the transition feel
      setTimeout(() => {
        const newState = applyChoice(state, choice);
        setState(newState);

        if (newState.isEnded) {
          setPhase("ended");
        } else {
          // Verify next round exists
          try {
            loadRound(scenario, newState.currentRoundId!);
          } catch (e) {
            setError((e as Error).message);
          }
        }
        setChoosing(false);
      }, 300);
    },
    [state, choosing, scenario]
  );

  const handleReplay = useCallback(() => {
    setState(createInitialState(scenario.firstRoundId));
    setPhase("title");
    setError(null);
  }, [scenario]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-200 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4 text-sm font-mono">{error}</p>
          <button
            onClick={handleReplay}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-6">
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">
            The Ripple
          </h1>
          {phase !== "title" && (
            <p className="text-xs text-gray-400 mt-0.5">{scenario.title}</p>
          )}
        </header>

        {/* Trust Meter — visible during play and at end */}
        {(phase === "playing" || phase === "ended") && (
          <div className="mb-6">
            <TrustMeter value={state.trustMeter} label="Trust" />
          </div>
        )}

        {/* Game content */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          {/* Title screen */}
          {phase === "title" && (
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Tangled
                </h2>
                <p className="text-gray-500 italic">
                  &ldquo;The truth is simple. Lies get tangled.&rdquo;
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                You are Alex, a 10-year-old at school. Every choice you make
                creates ripples. Some build trust. Some break it. And some
                things, once broken, can&apos;t be fixed.
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-medium text-lg
                           hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150"
              >
                Begin
              </button>
            </div>
          )}

          {/* Setup screen */}
          {phase === "setup" && (
            <div className="space-y-6">
              <SceneDisplay text={scenario.setup} />
              <button
                onClick={beginPlaying}
                className="w-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-medium
                           hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150"
              >
                Continue
              </button>
            </div>
          )}

          {/* Playing */}
          {phase === "playing" && state.currentRoundId && (
            <div className="space-y-6">
              <SceneDisplay
                text={loadRound(scenario, state.currentRoundId).prompt}
              />
              <ChoiceButtons
                choices={loadRound(scenario, state.currentRoundId).choices}
                onChoose={handleChoice}
                disabled={choosing}
              />
            </div>
          )}

          {/* End screen */}
          {phase === "ended" && (
            <EndScreen
              ending={getEnding(state.trustMeter)}
              onReplay={handleReplay}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Every choice creates a ripple.
          </p>
        </footer>
      </div>
    </div>
  );
}
