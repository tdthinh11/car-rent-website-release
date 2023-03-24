import { useEffect, useState } from 'react';

import CarPlatform2 from '@/assets/images/CarPlatform2.png';
import CarPlatform from '@/assets/images/CarPlatform.png';
import PickDrop, { IPickDropValue } from '@/components/PickDrop/PickDrop';
import PopularCar from '@/components/PopularCar/PopularCar';
import RecommendCar from '@/components/RecommendCar/RecommendCar';
import { SwapButton } from '@/components/SwapButton/SwapButton';
import { carType } from '@/model/cars';
import AdsCard from '@/pages/Home/AdsCard';
import { carActionThunk } from '@/store/carSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

import './style.css';

const initPickDropValue: IPickDropValue = {
  location: null,
  date: '',
  time: '',
};

const Home = () => {
  const [isSwap, setIsSwap] = useState<boolean>(false);
  const [pickUpValue, setPickUpValue] = useState<IPickDropValue>(initPickDropValue);
  const [dropOffValue, setDropOffValue] = useState<IPickDropValue>(initPickDropValue);
  const [dropChecked, setDropChecked] = useState<boolean>(false);
  const [pickChecked, setPickChecked] = useState<boolean>(false);

  const { searchKey, listAll, locations, isLoading } = useAppSelector((state) => state.carReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(carActionThunk.getListCarsApi(searchKey));
  }, [dispatch, searchKey]);

  useEffect(() => {
    dispatch(carActionThunk.getListLocation());
  }, [dispatch]);

  const changeStatusIsLiked = (car: carType) => {
    dispatch(carActionThunk.changeIsLikeStatus(car));
  };

  return (
    <div className="wrapper relative">
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
        <div className="relative">
          <div className="mt-8 flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12 lg:gap-36">
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
        <div className="mt-8">
          <PopularCar
            listPopularCars={listAll.filter((car: carType) => car.typeBusiness === 'popular')}
            onClick={changeStatusIsLiked}
            isLoading={isLoading}
          />
        </div>
        <div className="mt-8">
          <RecommendCar
            listRecommendCars={listAll.filter((car: carType) => car.typeBusiness === 'recommend')}
            onClick={changeStatusIsLiked}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
