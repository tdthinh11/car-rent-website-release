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
      index < rated
        ? rating.push(<Star key={index} className="text-yellow cursor-pointer fill-current" />)
        : rating.push(<Star key={index} className="text-grey cursor-pointer stroke-current" />);
    }
    return rating;
  };
  return <div className="flex gap-1">{renderRating()}</div>;
};
