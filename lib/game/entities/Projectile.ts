import { Position } from '@/lib/types/game';
import { CELL_SIZE, GAME_CONFIG } from '../config';

export class Projectile {
  public id: string;
  public position: Position;
  public damage: number;
  public speed: number;
  public slow?: number;

  constructor(position: Position, damage: number, slow?: number) {
    this.id = `projectile-${Date.now()}-${Math.random()}`;
    this.position = { ...position };
    this.damage = damage;
    this.speed = GAME_CONFIG.PROJECTILE_SPEED;
    this.slow = slow;
  }

  update(deltaTime: number): void {
    // Convert deltaTime to seconds for smoother movement
    const deltaSeconds = deltaTime / 1000;
    this.position.x += this.speed * deltaSeconds;
  }

  isOffScreen(): boolean {
    return this.position.x > CELL_SIZE * 9;
  }
}