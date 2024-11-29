import { GameState, Position, PlantType, GridCell } from '../types/game';
import { GRID_ROWS, GRID_COLS, CELL_SIZE, PLANTS_CONFIG, GAME_CONFIG } from './config';
import { SunSystem } from './systems/SunSystem';
import { ZombieSystem } from './systems/ZombieSystem';
import { ProjectileSystem } from './systems/ProjectileSystem';
import { LawnMowerSystem } from './systems/LawnMowerSystem';

export class GameEngine {
  private state: GameState;
  private sunSystem: SunSystem;
  private zombieSystem: ZombieSystem;
  private projectileSystem: ProjectileSystem;
  private lawnMowerSystem: LawnMowerSystem;

  constructor() {
    this.state = {
      grid: this.createGrid(),
      sunCount: GAME_CONFIG.INITIAL_SUN_COUNT,
      isGameOver: false,
      currentWave: 1,
      score: 0,
      lawnMowers: Array(GRID_ROWS).fill(null).map((_, row) => ({
        id: `lawnmower-${row}`,
        position: { x: -CELL_SIZE / 2, y: row * CELL_SIZE + CELL_SIZE / 2 },
        row,
        active: true,
        triggered: false,
      })),
    };

    this.sunSystem = new SunSystem();
    this.zombieSystem = new ZombieSystem();
    this.projectileSystem = new ProjectileSystem();
    this.lawnMowerSystem = new LawnMowerSystem(this.state.lawnMowers);
  }

  // Rest of the GameEngine class remains the same
  private createGrid(): GridCell[][] {
    return Array(GRID_ROWS).fill(null).map((_, row) =>
      Array(GRID_COLS).fill(null).map((_, col) => ({
        position: { x: col, y: row },
        occupied: false,
        entity: null,
      }))
    );
  }

  public getState(): GameState {
    return this.state;
  }

  public getSuns() {
    return this.sunSystem.getSuns();
  }

  public getZombies() {
    return this.zombieSystem.getZombies();
  }

  public getProjectiles() {
    return this.projectileSystem.getProjectiles();
  }

  public placePlant(position: Position, type: PlantType): boolean {
    const cell = this.state.grid[position.y][position.x];
    const config = PLANTS_CONFIG[type];

    if (cell.occupied || this.state.sunCount < config.cost) {
      return false;
    }

    const plant = {
      id: `plant-${Date.now()}-${Math.random()}`,
      position: {
        x: position.x * CELL_SIZE + CELL_SIZE / 2,
        y: position.y * CELL_SIZE + CELL_SIZE / 2
      },
      type,
      health: config.health,
      maxHealth: config.health,
      cost: config.cost,
      damage: config.damage || 0,
      cooldown: config.cooldown,
      lastAttack: 0,
    };

    cell.occupied = true;
    cell.entity = plant;
    this.state.sunCount -= config.cost;

    return true;
  }

  public collectSun(sun: any): void {
    const value = this.sunSystem.collectSun(sun);
    this.state.sunCount += value;
  }

  public update(deltaTime: number): void {
    if (this.state.isGameOver) return;

    // Update all systems
    this.sunSystem.update(this.state.grid);
    this.zombieSystem.update(deltaTime, this.state.grid);
    this.projectileSystem.update(deltaTime, this.state.grid, this.getZombies());
    this.lawnMowerSystem.update(deltaTime, this.getZombies());

    // Handle collisions and scoring
    const killedZombies = this.projectileSystem.processCollisions(this.getZombies());
    this.state.score += killedZombies * 10;

    // Check game over condition
    if (this.getZombies().some(zombie => zombie.position.x <= 0)) {
      this.state.isGameOver = true;
    }
  }
}