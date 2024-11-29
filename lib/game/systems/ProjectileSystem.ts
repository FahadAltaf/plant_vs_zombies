import { Projectile } from '../entities/Projectile';
import { PlantType, GridCell } from '@/lib/types/game';
import { Zombie } from '../entities/Zombie';
import { checkCollision, isInSameRow, getGridPosition } from '../utils/collision';
import { CELL_SIZE, GRID_COLS, GAME_CONFIG } from '../config';

export class ProjectileSystem {
  private projectiles: Projectile[] = [];

  update(deltaTime: number, grid: GridCell[][], zombies: Zombie[]): void {
    // Update existing projectiles
    this.projectiles.forEach(projectile => projectile.update(deltaTime));

    // Generate new projectiles from shooting plants
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.entity && 'type' in cell.entity &&
            (cell.entity.type === PlantType.PEASHOOTER || cell.entity.type === PlantType.SNOW_PEA)) {
          const plant = cell.entity;
          const plantGridPos = getGridPosition(plant.position);
          
          // Check for zombies in the same row
          const zombiesInRow = zombies.filter(zombie => 
            isInSameRow(zombie.position, plant.position) && 
            zombie.position.x > plant.position.x
          );

          if (zombiesInRow.length > 0 && Date.now() - plant.lastAttack >= plant.cooldown) {
            const projectile = new Projectile(
              { 
                x: plant.position.x + GAME_CONFIG.PROJECTILE_OFFSET,
                y: plant.position.y 
              },
              plant.damage,
              cell.entity.type === PlantType.SNOW_PEA ? 0.5 : undefined
            );
            this.projectiles.push(projectile);
            plant.lastAttack = Date.now();
          }
        }
      });
    });

    // Remove off-screen projectiles
    this.projectiles = this.projectiles.filter(projectile => !projectile.isOffScreen());
  }

  processCollisions(zombies: Zombie[]): number {
    let killedZombies = 0;

    this.projectiles = this.projectiles.filter(projectile => {
      let hasCollided = false;

      zombies.forEach(zombie => {
        if (!hasCollided && isInSameRow(projectile.position, zombie.position) && 
            checkCollision(projectile.position, zombie.position)) {
          zombie.takeDamage(projectile.damage);
          if (projectile.slow) {
            zombie.slow(projectile.slow);
          }
          hasCollided = true;

          if (zombie.health <= 0) {
            killedZombies++;
          }
        }
      });

      return !hasCollided;
    });

    return killedZombies;
  }

  getProjectiles(): Projectile[] {
    return this.projectiles;
  }
}