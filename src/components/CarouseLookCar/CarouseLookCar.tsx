import React, { useState } from 'react';

interface CarouseLookCarProps {
  sliderData: React.ReactNode[];
  sliderButton: string[];
}

export const CarouseLookCar = ({ sliderData, sliderButton }: CarouseLookCarProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handleChangeIndex = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <div className="md:grow md:basis-0">
      <div className="mt-8 mb-6 flex">
        {sliderData.map((slider, index) => {
          return (
            <div
              key={index}
              className={`scale-75 overflow-hidden rounded-[10px] opacity-0 duration-500 ${
                index === currentIndex ? 'w-full  !scale-100 !opacity-100' : ''
              }`}
            >
              {index === currentIndex ? slider : ''}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-[5px] sm:gap-7">
        {sliderButton.map((look, index) => {
          return (
            <div
              className={`grow basis-0 cursor-pointer ${
                index === currentIndex ? 'border-primary rounded-xl border-2' : ''
              }`}
              key={index}
              onClick={() => handleChangeIndex(index)}
            >
              <img
                src={look}
                alt="look"
                className={`w-full ${index === currentIndex ? 'scale-90' : ''}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
