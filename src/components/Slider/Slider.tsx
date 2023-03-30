import React from 'react';

import './Slider.css';

type SliderProps = {
  id: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onInput: (value: number) => void;
};

const Slider = ({ id, min = 0, max = 100, step = 1, value, onInput }: SliderProps) => {
  const handleOnInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    onInput(parseInt(e.currentTarget.value));
  };
  return (
    <div className="slider relative">
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value !== undefined ? value : max}
        onInput={handleOnInput}
        className="relative w-full appearance-none"
      />
      <div
        className="overlay bg-primary absolute top-1/2 h-3 -translate-y-1/2 rounded-xl"
        style={{ width: `${value !== undefined ? (value * 100) / max : 100}%` }}
      />
      <div
        className="absolute -top-4 text-sm"
        style={{ left: `${value !== undefined ? (value * 100) / max : 100}%` }}
      >
        {value !== undefined ? (value * 100) / max : 100}
      </div>
    </div>
  );
};

export default Slider;
