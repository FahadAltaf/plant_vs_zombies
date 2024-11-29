"use client";

import React from 'react';
import { Circle } from 'lucide-react';

interface ProjectileProps {
  position: { x: number; y: number };
  type: 'normal' | 'snow';
}

export const Projectile: React.FC<ProjectileProps> = ({ position, type }) => {
  return (
    <div
      className="absolute transition-transform"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Circle
        className={`w-3 h-3 ${
          type === 'snow' ? 'text-blue-400 fill-blue-400' : 'text-green-500 fill-green-500'
        }`}
      />
    </div>
  );
};