"use client";

import React from 'react';
import { PlantType } from '@/lib/types/game';
import { PLANTS_CONFIG } from '@/lib/game/config';
import { Leaf, Sun, Shield, Bomb, Snowflake } from 'lucide-react';

interface PlantCardProps {
  type: PlantType;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

const PLANT_ICONS = {
  [PlantType.PEASHOOTER]: Leaf,
  [PlantType.SUNFLOWER]: Sun,
  [PlantType.WALLNUT]: Shield,
  [PlantType.CHERRY_BOMB]: Bomb,
  [PlantType.SNOW_PEA]: Snowflake,
};

const PLANT_NAMES = {
  [PlantType.PEASHOOTER]: 'Peashooter',
  [PlantType.SUNFLOWER]: 'Sunflower',
  [PlantType.WALLNUT]: 'Wall-nut',
  [PlantType.CHERRY_BOMB]: 'Cherry Bomb',
  [PlantType.SNOW_PEA]: 'Snow Pea',
};

export const PlantCard: React.FC<PlantCardProps> = ({ type, selected, disabled, onClick }) => {
  const Icon = PLANT_ICONS[type];
  const config = PLANTS_CONFIG[type];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-24 h-28 p-2 rounded-lg flex flex-col items-center justify-center gap-1
        transition-all duration-200
        ${selected ? 'bg-green-600 ring-2 ring-yellow-400' : 'bg-green-800'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700 cursor-pointer'}
      `}
    >
      <Icon className="w-8 h-8 text-white" />
      <span className="text-xs text-white font-medium">{PLANT_NAMES[type]}</span>
      <div className="flex items-center gap-1">
        <Sun className="w-4 h-4 text-yellow-400" />
        <span className="text-xs text-yellow-400">{config.cost}</span>
      </div>
    </button>
  );
};