import { Zombie } from '../entities/Zombie';
import { CELL_SIZE, GRID_COLS, GRID_ROWS, GAME_CONFIG } from '../config';
import { ZombieType, GridCell, ZombieState } from '@/lib/types/game';
import { getGridPosition, getCellCenter } from '../utils/collision';

export class ZombieSystem {
  private zombies: Map<string, Zombie> = new Map();
  private lastZombieSpawn: number = 0;

  update(deltaTime: number, grid: GridCell[][]): void {
    // Update existing zombies
    this.zombies.forEach(zombie => {
      if (zombie.state !== ZombieState.DYING) {
        zombie.update(deltaTime);
        this.checkZombiePlantCollision(zombie, grid, deltaTime);
      }
    });

    // Spawn new zombies
    if (Date.now() - this.lastZombieSpawn >= GAME_CONFIG.ZOMBIE_SPAWN_INTERVAL) {
      this.spawnZombie();
    }

    // Remove dead zombies
    this.zombies.forEach((zombie, id) => {
      if (zombie.health <= 0) {
        this.zombies.delete(id);
      }
    });
  }

  private spawnZombie(): void {
    const row = Math.floor(Math.random() * GRID_ROWS);
    const position = {
      x: GRID_COLS * CELL_SIZE + CELL_SIZE / 2,
      y: row * CELL_SIZE + CELL_SIZE / 2,
    };
    
    const zombie = new Zombie(position, ZombieType.BASIC);
    this.zombies.set(zombie.id, zombie);
    this.lastZombieSpawn = Date.now();
  }

  private checkZombiePlantCollision(zombie: Zombie, grid: GridCell[][], deltaTime: number): void {
    const { x: gridX, y: gridY } = getGridPosition(zombie.position);

    if (gridX >= 0 && gridX < GRID_COLS && gridY >= 0 && gridY < GRID_ROWS) {
      const cell = grid[gridY][gridX];
      if (cell.entity && 'type' in cell.entity) {
        const cellCenter = getCellCenter(gridX, gridY);
        const dx = Math.abs(zombie.position.x - cellCenter.x);
        
        if (dx < CELL_SIZE / 3) {
          zombie.startEating();
          cell.entity.health -= (zombie.damage * deltaTime) / 1000;

          if (cell.entity.health <= 0) {
            cell.occupied = false;
            cell.entity = null;
            zombie.stopEating();
          }
        }
      } else {
        zombie.stopEating();
      }
    }
  }

  getZombies(): Zombie[] {
    return Array.from(this.zombies.values());
  }

  removeZombie(id: string): void {
    this.zombies.delete(id);
  }
}