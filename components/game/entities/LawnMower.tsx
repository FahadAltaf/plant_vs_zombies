"use client";

import React from 'react';
import { Scissors } from 'lucide-react';
import { LawnMower as LawnMowerType } from '@/lib/types/game';

interface LawnMowerProps {
  lawnMower: LawnMowerType;
}

export const LawnMower: React.FC<LawnMowerProps> = ({ lawnMower }) => {
  if (!lawnMower.active) return null;

  return (
    <div
      className={`absolute transition-transform ${
        lawnMower.triggered ? 'animate-move' : ''
      }`}
      style={{
        left: `${lawnMower.position.x}px`,
        top: `${lawnMower.position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Scissors className="w-10 h-10 text-gray-700" />
    </div>
  );
};