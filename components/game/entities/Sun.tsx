"use client";

import React from 'react';
import { Sun as SunType } from '@/lib/game/entities/Sun';
import { Sun as SunIcon } from 'lucide-react';

interface SunProps {
  sun: SunType;
  onCollect: (sun: SunType) => void;
}

export const Sun: React.FC<SunProps> = ({ sun, onCollect }) => {
  return (
    <div
      className={`
        absolute cursor-pointer
        animate-bounce hover:scale-110 transition-transform
        ${sun.collected ? 'animate-collect opacity-0' : ''}
      `}
      style={{
        left: `${sun.position.x}px`,
        top: `${sun.position.y}px`,
      }}
      onClick={() => !sun.collected && onCollect(sun)}
    >
      <SunIcon className="w-8 h-8 text-yellow-400 fill-yellow-400" />
    </div>
  );
};