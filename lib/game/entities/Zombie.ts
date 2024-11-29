import { Position, Zombie as ZombieType, ZombieState, ZombieType as ZombieVariant } from '@/lib/types/game';
import { ZOMBIES_CONFIG, GAME_CONFIG } from '../config';
import { MovementSystem } from '../systems/MovementSystem';

export class Zombie implements ZombieType {
  public id: string;
  public position: Position;
  public type: ZombieVariant;
  public health: number;
  public maxHealth: number;
  public speed: number;
  public damage: number;
  public state: ZombieState;
  private baseSpeed: number;
  private lastStateChange: number = 0;
  private movementSystem: MovementSystem;
  private lastPosition: Position;

  constructor(position: Position, type: ZombieVariant) {
    const config = ZOMBIES_CONFIG[type];
    this.id = `zombie-${Date.now()}-${Math.random()}`;
    this.position = { ...position };
    this.lastPosition = { ...position };
    this.type = type;
    this.health = config.health;
    this.maxHealth = config.health;
    this.speed = config.speed;
    this.baseSpeed = config.speed;
    this.damage = config.damage;
    this.state = ZombieState.WALKING;
    this.movementSystem = new MovementSystem();
  }

  update(deltaTime: number): void {
    if (this.state === ZombieState.WALKING) {
      this.lastPosition = { ...this.position };
      const newPosition = this.movementSystem.updatePosition(
        this.position,
        this.speed,
        deltaTime
      );

      // Apply movement smoothing
      this.position.x = this.lastPosition.x + (newPosition.x - this.lastPosition.x) * GAME_CONFIG.MOVEMENT_SMOOTHING;
      this.position.y = newPosition.y;
    }
  }

  takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0) {
      this.state = ZombieState.DYING;
    }
  }

  startEating(): void {
    const now = Date.now();
    if (this.state === ZombieState.WALKING && 
        now - this.lastStateChange >= GAME_CONFIG.STATE_CHANGE_DELAY) {
      this.state = ZombieState.EATING;
      this.lastStateChange = now;
    }
  }

  stopEating(): void {
    const now = Date.now();
    if (this.state === ZombieState.EATING && 
        now - this.lastStateChange >= GAME_CONFIG.STATE_CHANGE_DELAY) {
      this.state = ZombieState.WALKING;
      this.lastStateChange = now;
    }
  }

  slow(factor: number): void {
    if (this.speed === this.baseSpeed) {
      this.speed *= factor;
      setTimeout(() => this.resetSpeed(), 2000);
    }
  }

  resetSpeed(): void {
    this.speed = this.baseSpeed;
  }
}