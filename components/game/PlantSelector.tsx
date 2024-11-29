"use client";

import React from 'react';
import { PlantCard } from './PlantCard';
import { PlantType } from '@/lib/types/game';
import { PLANTS_CONFIG } from '@/lib/game/config';

interface PlantSelectorProps {
  selectedPlant: PlantType | null;
  sunCount: number;
  onSelectPlant: (plant: PlantType | null) => void;
}

export const PlantSelector: React.FC<PlantSelectorProps> = ({
  selectedPlant,
  sunCount,
  onSelectPlant,
}) => {
  return (
    <div className="bg-green-900/90 p-4 rounded-lg shadow-lg">
      <div className="flex gap-2">
        {Object.values(PlantType).map((type) => (
          <PlantCard
            key={type}
            type={type}
            selected={selectedPlant === type}
            disabled={PLANTS_CONFIG[type].cost > sunCount}
            onClick={() => onSelectPlant(selectedPlant === type ? null : type)}
          />
        ))}
      </div>
    </div>
  );
};