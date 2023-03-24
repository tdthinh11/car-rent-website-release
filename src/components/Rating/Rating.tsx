import React from 'react';

import Star from '@/assets/icons/Star';

interface RatingProps {
  total: number;
  rated: number;
}

export const Rating = ({ total, rated }: RatingProps) => {
  const renderRating = () => {
    const rating: React.ReactNode[] = [];
    for (let index = 0; index < total; index++) {
      rating.push(
        <div key={index}>
          <Star
            className={`cursor-pointer ${
              index < rated ? 'text-yellow fill-current' : 'text-grey stroke-current'
            }`}
          />
        </div>,
      );
    }
    return rating;
  };
  return <div className="flex gap-1">{renderRating()}</div>;
};
