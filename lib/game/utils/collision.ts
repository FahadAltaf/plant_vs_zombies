import { Position } from '@/lib/types/game';
import { GAME_CONFIG, CELL_SIZE } from '../config';

export function checkCollision(pos1: Position, pos2: Position): boolean {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < GAME_CONFIG.COLLISION_THRESHOLD;
}

export function isInSameRow(pos1: Position, pos2: Position): boolean {
  const row1 = Math.floor(pos1.y / CELL_SIZE);
  const row2 = Math.floor(pos2.y / CELL_SIZE);
  return row1 === row2;
}

export function getGridPosition(position: Position): { x: number; y: number } {
  return {
    x: Math.floor(position.x / CELL_SIZE),
    y: Math.floor(position.y / CELL_SIZE)
  };
}

export function getCellCenter(gridX: number, gridY: number): Position {
  return {
    x: gridX * CELL_SIZE + CELL_SIZE / 2,
    y: gridY * CELL_SIZE + CELL_SIZE / 2
  };
}