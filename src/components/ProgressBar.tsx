import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
  isLarge?: boolean;
}

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  indigo: 'bg-indigo-500'
};

export function ProgressBar({ label, value, color, isLarge = false }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${isLarge ? 'text-lg' : ''}`}>{label}</span>
        <span className={`text-sm font-bold ${isLarge ? 'text-lg' : ''}`}>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${colorMap[color]} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}