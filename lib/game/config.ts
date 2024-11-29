import { PlantType, ZombieType } from '../types/game';

export const GRID_ROWS = 5;
export const GRID_COLS = 9;
export const CELL_SIZE = 80;

export const GAME_CONFIG = {
  PROJECTILE_SPEED: 300,
  ZOMBIE_BASE_SPEED: 7, // Reduced from 10.5 to make zombies even slower
  SUN_SPAWN_INTERVAL: 10000, // Reduced from 15000 to spawn suns more frequently
  ZOMBIE_SPAWN_INTERVAL: 12000, // Increased from 10000 to give more time between zombies
  COLLISION_THRESHOLD: CELL_SIZE / 2.5,
  STATE_CHANGE_DELAY: 500,
  MOVEMENT_UPDATE_INTERVAL: 16,
  ZOMBIE_SPAWN_DELAY: 2000,
  MOVEMENT_SMOOTHING: 0.95,
  PROJECTILE_OFFSET: CELL_SIZE / 3,
  SUN_LIFETIME: 15000, // How long suns stay on screen
  INITIAL_SUN_COUNT: 75, // Increased initial sun count
};

export const PLANTS_CONFIG = {
  [PlantType.PEASHOOTER]: {
    cost: 100,
    health: 100,
    damage: 20,
    cooldown: 1500,
    range: GRID_COLS,
  },
  [PlantType.SUNFLOWER]: {
    cost: 50,
    health: 80,
    sunGeneration: 25,
    cooldown: 20000, // Reduced from 24000 to generate suns faster
  },
  [PlantType.WALLNUT]: {
    cost: 50,
    health: 300,
    cooldown: 30000,
  },
  [PlantType.CHERRY_BOMB]: {
    cost: 150,
    health: 100,
    damage: 1800,
    range: 1,
    cooldown: 50000,
  },
  [PlantType.SNOW_PEA]: {
    cost: 175,
    health: 100,
    damage: 20,
    slowEffect: 0.5,
    cooldown: 1500,
    range: GRID_COLS,
  },
};

export const ZOMBIES_CONFIG = {
  [ZombieType.BASIC]: {
    health: 200,
    speed: GAME_CONFIG.ZOMBIE_BASE_SPEED,
    damage: 20,
  },
  [ZombieType.CONE]: {
    health: 370,
    speed: GAME_CONFIG.ZOMBIE_BASE_SPEED,
    damage: 20,
  },
  [ZombieType.BUCKET]: {
    health: 650,
    speed: GAME_CONFIG.ZOMBIE_BASE_SPEED,
    damage: 20,
  },
  [ZombieType.FLAG]: {
    health: 200,
    speed: GAME_CONFIG.ZOMBIE_BASE_SPEED * 1.2,
    damage: 20,
  },
};