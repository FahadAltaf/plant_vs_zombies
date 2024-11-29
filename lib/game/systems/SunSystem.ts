import { Sun } from '../entities/Sun';
import { CELL_SIZE, GRID_COLS, GRID_ROWS, GAME_CONFIG } from '../config';
import { PlantType } from '@/lib/types/game';
import { GridCell } from '@/lib/types/game';

export class SunSystem {
  private suns: Sun[] = [];
  private lastSunSpawn: number = 0;
  private sunflowerCount: number = 0;

  constructor() {
    // Spawn initial sun
    this.spawnRandomSun();
  }

  update(grid: GridCell[][]): void {
    // Remove expired suns
    this.suns = this.suns.filter(sun => !sun.isExpired());

    // Count sunflowers and update sunflowerCount
    let currentSunflowerCount = 0;
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.entity && 'type' in cell.entity && cell.entity.type === PlantType.SUNFLOWER) {
          currentSunflowerCount++;
        }
      });
    });
    this.sunflowerCount = currentSunflowerCount;

    // Generate suns from sunflowers
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.entity && 'type' in cell.entity && cell.entity.type === PlantType.SUNFLOWER) {
          const plant = cell.entity;
          // Reduce cooldown based on number of sunflowers (up to 50% reduction)
          const cooldownReduction = Math.min(0.5, this.sunflowerCount * 0.1);
          const adjustedCooldown = plant.cooldown * (1 - cooldownReduction);
          
          if (Date.now() - plant.lastAttack >= adjustedCooldown) {
            this.spawnSunFromPlant(plant.position);
            plant.lastAttack = Date.now();
          }
        }
      });
    });

    // Spawn random suns more frequently with more sunflowers
    const adjustedInterval = Math.max(
      GAME_CONFIG.SUN_SPAWN_INTERVAL * (1 - this.sunflowerCount * 0.1),
      GAME_CONFIG.SUN_SPAWN_INTERVAL * 0.5
    );

    if (Date.now() - this.lastSunSpawn >= adjustedInterval) {
      this.spawnRandomSun();
    }
  }

  private spawnRandomSun(): void {
    const padding = CELL_SIZE / 2;
    const sun = new Sun({
      x: padding + Math.random() * ((GRID_COLS * CELL_SIZE) - padding * 2),
      y: padding + Math.random() * ((GRID_ROWS * CELL_SIZE) - padding * 2),
    }, this.calculateSunValue());
    this.suns.push(sun);
    this.lastSunSpawn = Date.now();
  }

  private spawnSunFromPlant(position: { x: number; y: number }): void {
    const sun = new Sun({
      x: position.x,
      y: position.y - CELL_SIZE / 2,
    }, this.calculateSunValue());
    this.suns.push(sun);
  }

  private calculateSunValue(): number {
    // Increase sun value based on number of sunflowers (up to 50% increase)
    const baseValue = 25;
    const valueIncrease = Math.min(0.5, this.sunflowerCount * 0.1);
    return Math.floor(baseValue * (1 + valueIncrease));
  }

  getSuns(): Sun[] {
    return this.suns;
  }

  collectSun(sun: Sun): number {
    if (!sun.collected) {
      sun.collected = true;
      this.suns = this.suns.filter(s => s !== sun);
      return sun.value;
    }
    return 0;
  }
}