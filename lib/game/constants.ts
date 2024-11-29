import { PlantType } from '../types/game';
import { Leaf, Sun, Shield, Bomb, Snowflake } from 'lucide-react';

export const PLANT_ICONS = {
  [PlantType.PEASHOOTER]: Leaf,
  [PlantType.SUNFLOWER]: Sun,
  [PlantType.WALLNUT]: Shield,
  [PlantType.CHERRY_BOMB]: Bomb,
  [PlantType.SNOW_PEA]: Snowflake,
};