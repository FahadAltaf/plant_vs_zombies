import { LawnMower } from '../entities/LawnMower';
import { Zombie } from '../entities/Zombie';
import { checkCollision } from '../utils/collision';

export class LawnMowerSystem {
  private lawnMowers: LawnMower[];

  constructor(lawnMowers: LawnMower[]) {
    this.lawnMowers = lawnMowers;
  }

  update(deltaTime: number, zombies: Zombie[]): void {
    this.lawnMowers.forEach(lawnMower => {
      if (lawnMower instanceof LawnMower) {
        lawnMower.update(deltaTime);

        if (lawnMower.active && !lawnMower.triggered) {
          zombies.forEach(zombie => {
            if (checkCollision(zombie.position, lawnMower.position)) {
              lawnMower.trigger();
              zombie.takeDamage(1000); // Instant kill
            }
          });
        }
      }
    });
  }
}