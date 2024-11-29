import { Position } from './types';

export interface Position {
  x: number;
  y: number;
}

export interface GridCell {
  position: Position;
  occupied: boolean;
  entity: Plant | Zombie | null;
}

export interface GameState {
  grid: GridCell[][];
  sunCount: number;
  isGameOver: boolean;
  currentWave: number;
  score: number;
  lawnMowers: LawnMower[];
}

export interface Entity {
  id: string;
  position: Position;
  health: number;
  maxHealth: number;
}

export interface Plant extends Entity {
  type: PlantType;
  cost: number;
  damage: number;
  cooldown: number;
  lastAttack: number;
}

export interface Zombie extends Entity {
  type: ZombieType;
  speed: number;
  damage: number;
  state: ZombieState;
}

export interface LawnMower {
  id: string;
  position: Position;
  row: number;
  active: boolean;
  triggered: boolean;
}

export enum PlantType {
  PEASHOOTER = 'PEASHOOTER',
  SUNFLOWER = 'SUNFLOWER',
  WALLNUT = 'WALLNUT',
  CHERRY_BOMB = 'CHERRY_BOMB',
  SNOW_PEA = 'SNOW_PEA',
}

export enum ZombieType {
  BASIC = 'BASIC',
  CONE = 'CONE',
  BUCKET = 'BUCKET',
  FLAG = 'FLAG',
}

export enum ZombieState {
  WALKING = 'WALKING',
  EATING = 'EATING',
  DYING = 'DYING',
}