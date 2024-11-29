import { Position } from '@/lib/types/game';
import { GAME_CONFIG } from '../config';

export class MovementSystem {
  private lastUpdate: number = 0;

  updatePosition(position: Position, speed: number, deltaTime: number): Position {
    const now = performance.now();
    
    // Ensure minimum time between updates
    if (now - this.lastUpdate < GAME_CONFIG.MOVEMENT_UPDATE_INTERVAL) {
      return position;
    }

    this.lastUpdate = now;
    const deltaSeconds = deltaTime / 1000;

    return {
      x: position.x - speed * deltaSeconds,
      y: position.y
    };
  }

  isValidPosition(position: Position): boolean {
    return position.x >= 0 && position.y >= 0;
  }
}