import { useState } from 'react';

import { carType } from '@/assets/data/cars';
import Button from '@/components/Button/Button';
import { CarCard } from '@/components/CarCard/CarCard';

type RecommendCarProps = {
  listRecommendCars: carType[];
  onClick: (car: carType) => void | React.MouseEventHandler<HTMLDivElement> | undefined;
  isLoading?: boolean;
};
const RecommendCar = ({ listRecommendCars, onClick, isLoading }: RecommendCarProps) => {
  const [isViewAll, setIsViewAll] = useState<boolean>(false);
  const [isLoadingView, setIsLoading] = useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-grey my-8 text-sm font-semibold leading-[150%] tracking-tight sm:pl-4">
          Recommendation Car
        </h2>
      </div>
      {isLoading ? (
        <h3 className="my-5 text-center">Loading ...</h3>
      ) : isViewAll ? (
        <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-4 lg:gap-8">
          {listRecommendCars.length > 0 ? (
            listRecommendCars.map((car) => {
              return (
                <div
                  key={`${car.id}`}
                  className="min-w-[282px] sm:min-w-[304px] sm:max-w-[304px] lg:min-w-[304px]"
                >
                  <div className="s375:hidden">
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
                      cardType="horizontal"
                      carId={car.id}
                    />
                  </div>
                  <div className="s375:block hidden">
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
                      cardType="vertical"
                      carId={car.id}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="grow text-center opacity-50">List of cars are empty</h3>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-4 lg:gap-8">
          {listRecommendCars.length > 0 ? (
            listRecommendCars.slice(0, 4).map((car) => {
              return (
                <div
                  key={`${car.id}`}
                  className="min-w-[282px] sm:min-w-[304px] sm:max-w-[304px] lg:min-w-[304px]"
                >
                  <div className="s375:hidden">
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
                      cardType="horizontal"
                      carId={car.id}
                    />
                  </div>
                  <div className="s375:block hidden">
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
                      cardType="vertical"
                      carId={car.id}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="grow text-center opacity-50">List of cars are empty</h3>
          )}
        </div>
      )}
      {isLoadingView && <h3 className="my-5 text-center">Loading ...</h3>}
      <div className="relative mt-12 text-center">
        <Button
          variant="primary"
          onClick={() => {
            setIsLoading(true);
            window.setTimeout(() => {
              setIsViewAll((prev) => !prev);
              setIsLoading(false);
            }, 1000);
          }}
        >
          {!isViewAll ? 'Show more car' : 'Show less'}
        </Button>
        <span className="text-grey absolute right-0 top-1/2 -translate-y-1/2 text-sm font-bold leading-[18px]">
          {listRecommendCars.length} cars
        </span>
      </div>
    </div>
  );
};

export default RecommendCar;
