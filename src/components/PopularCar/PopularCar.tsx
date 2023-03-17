import { useState } from 'react';

import { CarCard } from '@/components/CarCard/CarCard';
import { carType } from '@/service/carServices';

type PopularProps = {
  listPopularCars: carType[];
  onClick: (car: carType) => void | React.MouseEventHandler<HTMLDivElement> | undefined;
  isLoading?: boolean;
};

const PopularCar = ({ listPopularCars, onClick, isLoading }: PopularProps) => {
  const [isViewAll, setIsViewAll] = useState<boolean>(false);
  const [isLoadingView, setIsLoading] = useState<boolean>(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-grey my-8 mb-5 text-sm font-semibold leading-[150%] tracking-tight sm:pl-4">
          Popular
        </h2>
        <button
          className="text-primary text-xs font-semibold leading-[15px]"
          onClick={() => {
            setIsLoading(true);
            window.setTimeout(() => {
              setIsViewAll((prev) => !prev);
              setIsLoading(false);
            }, 1000);
          }}
        >
          {!isViewAll ? 'View All' : 'View less'}
        </button>
      </div>
      {isLoading ? (
        <h3 className="my-5 text-center">Loading ...</h3>
      ) : isViewAll ? (
        <div className="flex w-full flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-4 lg:gap-8">
          {listPopularCars.length > 0 ? (
            listPopularCars.map((car) => {
              return (
                <div
                  key={`${car.id + car.typeBusiness}`}
                  className="min-w-[282px] snap-start scroll-ml-6 sm:min-w-[304px] sm:max-w-[304px] lg:min-w-[304px]"
                >
                  <CarCard
                    carName={car.name}
                    carType={car.type}
                    capacity={car.capacity}
                    gas={car.gas}
                    price={car.price}
                    isLiked={car.isLiked}
                    imgSm={car.imgSm}
                    imgLg={car.imgLg}
                    onclick={() => onClick(car)}
                  />
                </div>
              );
            })
          ) : (
            <h3 className="grow text-center opacity-50">List of cars are empty</h3>
          )}
        </div>
      ) : (
        <div className="car-card flex snap-x gap-5 overflow-x-auto overflow-y-hidden sm:flex-row sm:flex-wrap sm:gap-4 lg:gap-8">
          {listPopularCars.length > 0 ? (
            listPopularCars.slice(0, 2).map((car) => {
              return (
                <div
                  key={`${car.id + car.typeBusiness}`}
                  className="min-w-[240px] max-w-[240px] snap-start scroll-ml-6 sm:min-w-[282px] sm:max-w-[304px] lg:min-w-[304px]"
                >
                  <CarCard
                    carName={car.name}
                    carType={car.type}
                    capacity={car.capacity}
                    gas={car.gas}
                    price={car.price}
                    isLiked={car.isLiked}
                    imgSm={car.imgSm}
                    imgLg={car.imgLg}
                    onclick={() => onClick(car)}
                  />
                </div>
              );
            })
          ) : (
            <h3 className="grow text-center opacity-50">List of cars are empty</h3>
          )}
        </div>
      )}
      {isLoadingView && <h3 className="my-5 text-center">Loading ...</h3>}
    </div>
  );
};

export default PopularCar;
