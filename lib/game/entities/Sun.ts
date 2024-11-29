import { Position } from '@/lib/types/game';
import { GAME_CONFIG } from '../config';

export class Sun {
  public id: string;
  public position: Position;
  public value: number;
  public collected: boolean;
  public lifespan: number;
  private createdAt: number;

  constructor(position: Position, value: number = 25) {
    this.id = `sun-${Date.now()}-${Math.random()}`;
    this.position = position;
    this.value = value;
    this.collected = false;
    this.lifespan = GAME_CONFIG.SUN_LIFETIME;
    this.createdAt = Date.now();
  }

  public isExpired(): boolean {
    return Date.now() - this.createdAt >= this.lifespan;
  }
}