"use client";

import { useEffect, useState, useRef } from 'react';
import { GameEngine } from '@/lib/game/gameEngine';
import { GameLoop } from '@/lib/game/GameLoop';
import { PlantType } from '@/lib/types/game';
import { Sun } from '@/lib/game/entities/Sun';
import { Zombie } from '@/lib/game/entities/Zombie';
import { Projectile } from '@/lib/game/entities/Projectile';

export function useGameState() {
  const gameEngineRef = useRef<GameEngine>(new GameEngine());
  const gameLoopRef = useRef<GameLoop | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<PlantType | null>(null);
  const [gameState, setGameState] = useState(() => gameEngineRef.current.getState());
  const [suns, setSuns] = useState<Sun[]>([]);
  const [zombies, setZombies] = useState<Zombie[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);

  useEffect(() => {
    const gameEngine = gameEngineRef.current;
    
    const updateGame = (deltaTime: number) => {
      gameEngine.update(deltaTime);
      setGameState(gameEngine.getState());
      setSuns(gameEngine.getSuns());
      setZombies(gameEngine.getZombies());
      setProjectiles(gameEngine.getProjectiles());
    };

    gameLoopRef.current = new GameLoop(updateGame);
    gameLoopRef.current.start();

    return () => {
      if (gameLoopRef.current) {
        gameLoopRef.current.stop();
      }
    };
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (selectedPlant) {
      const success = gameEngineRef.current.placePlant({ x: col, y: row }, selectedPlant);
      if (success) {
        setGameState(gameEngineRef.current.getState());
        setSelectedPlant(null);
      }
    }
  };

  const handleSunCollect = (sun: Sun) => {
    gameEngineRef.current.collectSun(sun);
    setGameState(gameEngineRef.current.getState());
  };

  return {
    gameState,
    selectedPlant,
    suns,
    zombies,
    projectiles,
    handleCellClick,
    handleSunCollect,
    setSelectedPlant
  };
}