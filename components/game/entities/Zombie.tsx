"use client";

import React from 'react';
import { Zombie as ZombieType } from '@/lib/types/game';
import { Skull } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ZombieProps {
  zombie: ZombieType;
}

export const Zombie: React.FC<ZombieProps> = ({ zombie }) => {
  const healthPercentage = (zombie.health / zombie.maxHealth) * 100;

  return (
    <div 
      className="absolute transition-all duration-100"
      style={{
        left: `${zombie.position.x}px`,
        top: `${zombie.position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="flex flex-col items-center">
        <Skull 
          className={`w-12 h-12 ${
            zombie.state === 'EATING' ? 'text-red-600' : 'text-gray-700'
          }`} 
        />
        <Progress
          value={healthPercentage}
          className="w-12 h-1 mt-1"
          indicatorClassName={
            healthPercentage > 60
              ? 'bg-gray-600'
              : healthPercentage > 30
              ? 'bg-gray-400'
              : 'bg-gray-300'
          }
        />
      </div>
    </div>
  );
};