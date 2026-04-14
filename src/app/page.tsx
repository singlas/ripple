"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { GameState, Choice, Scenario } from "@/engine/types";
import { createInitialState, applyChoice, advanceChain } from "@/engine/state";
import { loadRound } from "@/engine/scene";
import { getEnding } from "@/engine/endings";
import tangledConfig from "@/games/tangled/config";
import { tangledChains } from "@/games/tangled/scenarios";
import TrustMeter from "@/components/TrustMeter";
import SceneDisplay from "@/components/SceneDisplay";
import ChoiceButtons from "@/components/ChoiceButtons";
import EndScreen from "@/components/EndScreen";
import ChainInterstitial from "@/components/ChainInterstitial";

type GamePhase = "title" | "setup" | "playing" | "chain-interstitial" | "ended";

export default function Home() {
  const chains: Scenario[] = tangledChains;
  const config = tangledConfig;

  const [phase, setPhase] = useState<GamePhase>("title");
  const [state, setState] = useState<GameState>(() =>
    createInitialState(config, chains[0].firstRoundId)
  );
  const [choosing, setChoosing] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentChain = chains[state.currentChainIndex];

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
      setSelectedChoice(choice);

      setTimeout(() => {
        const newState = applyChoice(state, choice);
        setState(newState);
        setSelectedChoice(null);

        // Chain ended (choice.next was "end")
        if (newState.currentRoundId === null) {
          const nextIndex = newState.currentChainIndex + 1;
          if (nextIndex >= chains.length) {
            // Last chain — game over
            const endedState = advanceChain(newState, chains);
            setState(endedState);
            setPhase("ended");
          } else {
            // More chains — show interstitial
            setPhase("chain-interstitial");
          }
        } else {
          // Verify next round exists
          try {
            loadRound(currentChain, newState.currentRoundId);
          } catch (e) {
            setError((e as Error).message);
          }
        }
        setChoosing(false);
      }, 300);
    },
    [state, choosing, chains, currentChain]
  );

  const handleInterstitialContinue = useCallback(() => {
    const newState = advanceChain(state, chains);
    setState(newState);
    setPhase("setup");
  }, [state, chains]);

  const handleReplay = useCallback(() => {
    setState(createInitialState(config, chains[0].firstRoundId));
    setPhase("title");
    setError(null);
  }, [config, chains]);

  // Load current round once to avoid double calls
  let currentRound = null;
  if (phase === "playing" && state.currentRoundId && currentChain) {
    try {
      currentRound = loadRound(currentChain, state.currentRoundId);
    } catch (e) {
      if (!error) {
        setError((e as Error).message);
      }
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-[390px]">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-200 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4 text-sm font-mono">{error}</p>
            <button
              onClick={handleReplay}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Phone frame - visible on wider screens */}
      <div
        className="w-full max-w-[390px] h-[700px] bg-gray-50 rounded-none shadow-none border-0
                    sm:rounded-[2.5rem] sm:shadow-2xl sm:border-[8px] sm:border-gray-800
                    overflow-hidden relative sm:my-8"
      >
        {/* Notch */}
        <div
          className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2
                      w-[120px] h-[25px] bg-gray-800 rounded-b-2xl z-10"
        />
        {/* Game content */}
        <div className="h-full flex flex-col px-4 py-6 sm:pt-10 overflow-y-auto">
          {/* Header */}
          <header className="text-center mb-4">
            <h1 className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">
              The Ripple
            </h1>
            {phase !== "title" && currentChain && (
              <p className="text-xs text-gray-400 mt-0.5">{currentChain.title}</p>
            )}
          </header>

          {/* Trust Meter — visible during play, interstitial, and at end */}
          {(phase === "playing" || phase === "ended") && (
            <div className="mb-6">
              <TrustMeter
                value={state.meter}
                label={config.meterName}
                isBroken={state.isBroken}
              />
            </div>
          )}

          {/* Game content */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            {/* Title screen */}
            {phase === "title" && (
              <div className="space-y-6">
                <div className="relative w-full aspect-[16/10] -mx-4" style={{ width: "calc(100% + 2rem)" }}>
                  <Image
                    src="/images/tangled/title.png"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Tangled
                  </h2>
                  <p className="text-gray-500 italic">
                    &ldquo;The truth is simple. Lies get tangled.&rdquo;
                  </p>
                </div>
                <p className="text-gray-600 leading-relaxed text-center">
                  You are Alex, a 10-year-old at school. Every choice you make
                  creates ripples. Some build trust. Some break it. And some
                  things, once broken, can&apos;t be fixed.
                </p>
                <button
                  onClick={startGame}
                  className="w-full px-8 py-4 bg-indigo-600 text-white rounded-xl font-medium text-lg
                             hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Begin
                </button>
              </div>
            )}

            {/* Setup screen */}
            {phase === "setup" && currentChain && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-2">
                    Chapter {state.currentChainIndex + 1}
                  </p>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {currentChain.title}
                  </h2>
                </div>
                <SceneDisplay
                  text={currentChain.setup}
                  image={
                    {
                      "broken-phone": "/images/tangled/chain1_setup.png",
                      "group-project": "/images/tangled/chain2/chain2_setup.png",
                      "the-secret": "/images/tangled/chain3/chain3_setup.png",
                      "the-test": "/images/tangled/chain4/chain4_setup.png",
                    }[currentChain.id]
                  }
                />
                <button
                  onClick={beginPlaying}
                  className="w-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-medium
                             hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Playing */}
            {phase === "playing" && currentRound && (
              <div className="space-y-6">
                <SceneDisplay text={currentRound.prompt} image={currentRound.image} />
                <ChoiceButtons
                  choices={currentRound.choices}
                  onChoose={handleChoice}
                  disabled={choosing}
                  selectedChoice={selectedChoice}
                />
              </div>
            )}

            {/* Chain interstitial */}
            {phase === "chain-interstitial" && (
              <ChainInterstitial
                completedChain={currentChain.title}
                nextChain={chains[state.currentChainIndex + 1].title}
                meterValue={state.meter}
                meterName={config.meterName}
                onContinue={handleInterstitialContinue}
              />
            )}

            {/* End screen */}
            {phase === "ended" && (
              <EndScreen
                ending={getEnding(state.meter, config)}
                journalEntries={state.journalEntries}
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
    </div>
  );
}
