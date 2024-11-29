"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { GameBoard } from '@/components/game/GameBoard';
import { PlantSelector } from '@/components/game/PlantSelector';
import { useGameState } from '@/hooks/useGameState';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function Home() {
  const {
    gameState,
    selectedPlant,
    suns,
    zombies,
    projectiles,
    handleCellClick,
    handleSunCollect,
    setSelectedPlant
  } = useGameState();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-900 to-green-700 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Plants vs Zombies</h1>
        <div className="bg-green-800/50 rounded-lg p-4 text-white">
          <p className="text-xl">Sun: {gameState.sunCount}</p>
          <p className="text-xl">Wave: {gameState.currentWave}</p>
          <p className="text-xl">Score: {gameState.score}</p>
          {gameState.isGameOver && (
            <p className="text-2xl text-red-500 font-bold mt-2">Game Over!</p>
          )}
        </div>
      </div>
      <PlantSelector
        selectedPlant={selectedPlant}
        sunCount={gameState.sunCount}
        onSelectPlant={setSelectedPlant}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <div className="mt-4">
          <GameBoard
            gameState={gameState}
            suns={suns}
            zombies={zombies}
            projectiles={projectiles}
            onCellClick={handleCellClick}
            onSunCollect={handleSunCollect}
          />
        </div>
      </Suspense>
    </main>
  );
}