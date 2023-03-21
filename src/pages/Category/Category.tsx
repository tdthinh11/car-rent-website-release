import { useEffect, useState } from 'react';

import { carType } from '@/assets/data/cars';
import Button from '@/components/Button/Button';
import { CarCard } from '@/components/CarCard/CarCard';
import PickDrop, { IValue } from '@/components/PickDrop/PickDrop';
import { SwapButton } from '@/components/SwapButton/SwapButton';
import { carActionThunk } from '@/store/carSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

export const Category = () => {
  const dispatch = useAppDispatch();
  const { listAll, searchKey, locations } = useAppSelector((state) => state.carReducer);
  const [isViewAll, setIsViewAll] = useState<boolean>(false);
  const [isLoadingView, setIsLoading] = useState<boolean>(false);
  const [pickUpValue, setPickUpValue] = useState<IValue>();
  const [dropOffValue, setDropOffValue] = useState<IValue>();
  const [isSwap, setIsSwap] = useState<boolean>(false);
  const [dropChecked, setDropChecked] = useState<boolean>(false);
  const [pickChecked, setPickChecked] = useState<boolean>(false);

  useEffect(() => {
    dispatch(carActionThunk.getListLocation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(carActionThunk.getListCarsApi(searchKey));
  }, [dispatch, searchKey]);

  const changeStatusIsLiked = (car: carType) => {
    dispatch(carActionThunk.changeIsLikeStatus(car));
  };

  return (
    <div className="px-6 md:px-8">
      <div className="relative">
        <div className="mt-8 flex flex-col items-center justify-between gap-8 md:flex-row md:gap-11">
          <div className={`w-full grow basis-0 ${isSwap ? 'order-1' : 'order-2'}`}>
            <PickDrop
              tittle="Pick - Up"
              listLocation={locations}
              value={pickUpValue}
              handleChangeValue={setPickUpValue}
              handleChangeCheckBox={() => setPickChecked((prev) => !prev)}
              id="pick-up"
              isChecked={pickChecked}
            />
          </div>
          <div className={`w-full grow basis-0 ${isSwap ? 'order-2' : 'order-1'}`}>
            <PickDrop
              tittle="Drop-Off"
              listLocation={locations}
              value={dropOffValue}
              handleChangeValue={setDropOffValue}
              handleChangeCheckBox={() => setDropChecked((prev) => !prev)}
              id="drop-off"
              isChecked={dropChecked}
            />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SwapButton handleSwap={setIsSwap} />
        </div>
      </div>
      <div className="mb-12 mt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-4 lg:gap-8">
          {listAll.length > 0 ? (
            isViewAll ? (
              listAll.map((car: carType) => {
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
                        onclick={() => changeStatusIsLiked(car)}
                        cardType="horizontal"
                        carId={car.id}
                        steering={car.steering}
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
                        onclick={() => changeStatusIsLiked(car)}
                        cardType="vertical"
                        carId={car.id}
                        steering={car.steering}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              listAll.slice(0, 3).map((car: carType) => {
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
                        onclick={() => changeStatusIsLiked(car)}
                        cardType="horizontal"
                        carId={car.id}
                        steering={car.steering}
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
                        onclick={() => changeStatusIsLiked(car)}
                        cardType="vertical"
                        carId={car.id}
                        steering={car.steering}
                      />
                    </div>
                  </div>
                );
              })
            )
          ) : (
            <h1>List of cars are empty</h1>
          )}
        </div>
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
            {listAll.length} cars
          </span>
        </div>
      </div>
    </div>
  );
};
