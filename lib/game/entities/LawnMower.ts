import { Position, LawnMower as LawnMowerType } from '@/lib/types/game';
import { CELL_SIZE } from '../config';

export class LawnMower implements LawnMowerType {
  public id: string;
  public position: Position;
  public row: number;
  public active: boolean;
  public triggered: boolean;
  public speed: number;

  constructor(row: number) {
    this.id = `lawnmower-${Date.now()}-${Math.random()}`;
    this.row = row;
    this.position = {
      x: -CELL_SIZE / 2,
      y: row * CELL_SIZE + CELL_SIZE / 2,
    };
    this.active = true;
    this.triggered = false;
    this.speed = 400; // pixels per second
  }

  update(deltaTime: number): void {
    if (this.triggered && this.active) {
      this.position.x += (this.speed * deltaTime) / 1000;
    }
  }

  trigger(): void {
    if (this.active && !this.triggered) {
      this.triggered = true;
    }
  }

  deactivate(): void {
    this.active = false;
  }
}