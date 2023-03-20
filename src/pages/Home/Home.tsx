import { useEffect, useState } from 'react';

import { carType } from '@/assets/data/cars';
import CarPlatform2 from '@/assets/images/CarPlatform2.png';
import CarPlatform from '@/assets/images/CarPlatform.png';
import PickDrop, { IValue } from '@/components/PickDrop/PickDrop';
import PopularCar from '@/components/PopularCar/PopularCar';
import RecommendCar from '@/components/RecommendCar/RecommendCar';
import { SwapButton } from '@/components/SwapButton/SwapButton';
import AdsCard from '@/pages/Home/AdsCard';
import { carActionThunk } from '@/store/carSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

import './style.css';

const Home = () => {
  const [isSwap, setIsSwap] = useState<boolean>(false);
  const [pickUpValue, setPickUpValue] = useState<IValue>();
  const [dropOffValue, setDropOffValue] = useState<IValue>();

  const { searchKey, listPopularCar, listRecommendCar, locations, isLoading } = useAppSelector(
    (state) => state.carReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(carActionThunk.getListCarsApi(searchKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  useEffect(() => {
    dispatch(carActionThunk.getListLocation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStatusIsLiked = (car: carType) => {
    dispatch(carActionThunk.changeIsLikeStatus(car));
  };

  return (
    <div className="relative">
      <div className="md-hidden md:bg-bg absolute top-0 h-36 w-full bg-white"></div>
      <div className="relative px-6 pb-12 md:px-16">
        <div className="justify-between gap-8 md:mt-8 md:flex">
          <div className="shrink-1 grow basis-0">
            <AdsCard
              classNames="bg-secondary"
              bgUrl={CarPlatform}
              btnVariant="primary"
              title="The Best Platform for Car Rental"
              description="Ease of doing a car rental safely and reliably. Of course at a low price."
              btnText="Rental Car"
            />
          </div>
          <div className="md:shrink-1 hidden md:block md:grow md:basis-0">
            <AdsCard
              classNames="bg-primary"
              bgUrl={CarPlatform2}
              btnVariant="secondary"
              title="Easy way to rent a car at a low price"
              description="Providing cheap car rental services and safe and comfortable facilities."
              btnText="Rental Car"
            />
          </div>
        </div>
        <div className="mt-8 lg:flex lg:items-center lg:justify-between lg:gap-11">
          {isSwap ? (
            <div className="grow basis-0">
              <PickDrop
                tittle="Pick - up"
                listLocation={locations}
                value={pickUpValue}
                handleChangeValue={setPickUpValue}
              />
            </div>
          ) : (
            <div className="grow basis-0">
              <PickDrop
                tittle="Drop - Off"
                listLocation={locations}
                value={dropOffValue}
                handleChangeValue={setDropOffValue}
              />
            </div>
          )}
          <div className="relative h-8 lg:h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:relative lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0">
              <SwapButton handleSwap={setIsSwap} />
            </div>
          </div>
          {isSwap ? (
            <div className="grow basis-0">
              <PickDrop
                tittle="Drop - Off"
                listLocation={locations}
                value={dropOffValue}
                handleChangeValue={setDropOffValue}
              />
            </div>
          ) : (
            <div className="grow basis-0">
              <PickDrop
                tittle="Pick - up"
                listLocation={locations}
                value={pickUpValue}
                handleChangeValue={setPickUpValue}
              />
            </div>
          )}
        </div>
        <PopularCar
          listPopularCars={listPopularCar}
          onClick={changeStatusIsLiked}
          isLoading={isLoading}
        />
        <RecommendCar
          listRecommendCars={listRecommendCar}
          onClick={changeStatusIsLiked}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Home;
