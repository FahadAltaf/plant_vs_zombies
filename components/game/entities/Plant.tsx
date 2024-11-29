"use client";

import React from 'react';
import { Plant as PlantType } from '@/lib/types/game';
import { PLANT_ICONS } from '@/lib/game/constants';
import { Progress } from '@/components/ui/progress';

interface PlantProps {
  plant: PlantType;
}

export const Plant: React.FC<PlantProps> = ({ plant }) => {
  const Icon = PLANT_ICONS[plant.type];
  const healthPercentage = (plant.health / plant.maxHealth) * 100;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Icon className="w-12 h-12 text-green-500" />
      <Progress
        value={healthPercentage}
        className="w-12 h-1 mt-1"
        indicatorClassName={
          healthPercentage > 60
            ? 'bg-green-500'
            : healthPercentage > 30
            ? 'bg-yellow-500'
            : 'bg-red-500'
        }
      />
    </div>
  );
};