"use client";

import React from 'react';
import { GRID_ROWS, GRID_COLS, CELL_SIZE } from '@/lib/game/config';
import { Plant } from './entities/Plant';
import { Zombie } from './entities/Zombie';
import { Sun } from './entities/Sun';
import { Projectile } from './entities/Projectile';
import { LawnMower } from './entities/LawnMower';
import { Sun as SunType } from '@/lib/game/entities/Sun';
import { Zombie as ZombieType } from '@/lib/game/entities/Zombie';
import { Projectile as ProjectileType } from '@/lib/game/entities/Projectile';
import { GameState } from '@/lib/types/game';

interface GameBoardProps {
  gameState: GameState;
  suns: SunType[];
  zombies: ZombieType[];
  projectiles: ProjectileType[];
  onCellClick: (row: number, col: number) => void;
  onSunCollect: (sun: SunType) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  suns,
  zombies,
  projectiles,
  onCellClick,
  onSunCollect,
}) => {
  return (
    <div className="relative bg-green-800 p-4 rounded-lg shadow-lg">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL_SIZE}px)`,
        }}
      >
        {gameState.grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className="relative bg-green-700/50 border border-green-600/30 rounded cursor-pointer hover:bg-green-600/30 transition-colors"
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell.entity && 'type' in cell.entity && <Plant plant={cell.entity} />}
            </div>
          ))
        )}
      </div>
      {gameState.lawnMowers?.map((lawnMower) => (
        <LawnMower key={lawnMower.id} lawnMower={lawnMower} />
      ))}
      {suns.map((sun) => (
        <Sun key={sun.id} sun={sun} onCollect={onSunCollect} />
      ))}
      {zombies.map((zombie) => (
        <Zombie key={zombie.id} zombie={zombie} />
      ))}
      {projectiles.map((projectile) => (
        <Projectile
          key={projectile.id}
          position={projectile.position}
          type={projectile.slow ? 'snow' : 'normal'}
        />
      ))}
    </div>
  );
};