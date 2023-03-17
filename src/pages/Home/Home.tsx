import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LocationType } from '@/assets/data/selection';
import CarPlatform2 from '@/assets/images/CarPlatform2.png';
import CarPlatform from '@/assets/images/CarPlatform.png';
import PickDrop, { IValue } from '@/components/PickDrop/PickDrop';
import PopularCar from '@/components/PopularCar/PopularCar';
import RecommendCar from '@/components/RecommendCar/RecommendCar';
import { SwapButton } from '@/components/SwapButton/SwapButton';
import { carServices, carType } from '@/service/carServices';
import { pickDropService } from '@/service/pickdropService';
import { updateListCar } from '@/store/carSlice';

import AdsCard from './AdsCard';
import './style.css';

const Home = () => {
  const listKeyToSearch = ['name', 'type', 'gas', 'capacity', 'price'];
  const [isSwap, setIsSwap] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listPopularCars, setListPopularCars] = useState<carType[]>([]);
  const [listRecommendCars, setListRecommendCars] = useState<carType[]>([]);
  const [listLocation, setListLocation] = useState<LocationType[]>([]);
  const [pickUpValue, setPickUpValue] = useState<IValue>({
    location: { id: null, value: '' },
    date: '',
    time: '',
  });
  const [dropOffValue, setDropOffValue] = useState<IValue>({
    location: { id: null, value: '' },
    date: '',
    time: '',
  });

  const { searchKey, listPopularCar, listRecommendCar } = useSelector(
    (state: unknown) => state.carReducer,
  );
  const dispatch = useDispatch();

  // Call Api to get data
  useEffect(() => {
    const getListCars = async () => {
      setIsLoading(true);
      const popular = await carServices.getPopularCars();
      const recommend = await carServices.getRecommendCars();
      setListPopularCars(popular.data);
      setListRecommendCars(recommend.data);
      dispatch(
        updateListCar({
          listPopularCar: popular.data,
          listRecommendCar: recommend.data,
        }),
      );
      setIsLoading(false);
    };

    const getListLocation = async () => {
      const listLocationData = await pickDropService.getLocationList();
      console.log(listLocation);
      setListLocation(listLocationData.data);
    };

    getListCars();
    getListLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listPopular = handleInputSearch(searchKey, listPopularCar, listKeyToSearch);
    const listRecommend = handleInputSearch(searchKey, listRecommendCar, listKeyToSearch);
    setListPopularCars(listPopular);
    setListRecommendCars(listRecommend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  useEffect(() => {
    console.log(pickUpValue);
  }, [pickUpValue, dropOffValue]);

  const matchByKeyName = useCallback((item: carType, listKey: string[], query: string | number) => {
    return listKey.find((key) => {
      if (typeof item[key] === 'number') {
        return item[key] === query;
      } else {
        return item[key] && item[key]?.toLowerCase().indexOf(query) >= 0;
      }
    });
  }, []);

  const handleInputSearch = useCallback(
    (searchKey: string | number, listToFilter: carType[], listKeyToSearch: string[]) => {
      const query = typeof searchKey === 'string' ? searchKey?.toLowerCase() : searchKey;
      return listToFilter.filter((item: carType) => {
        if (matchByKeyName(item, listKeyToSearch, query)) {
          return item;
        }
      });
    },
    [matchByKeyName],
  );

  const changeStatusIsLiked = (car: carType) => {
    const itemIndexPopular = listPopularCars.findIndex(
      (carItem) => carItem.id === car.id && carItem.typeBusiness === car.typeBusiness,
    );
    const itemIndexRecommend = listRecommendCars.findIndex(
      (carItem) => carItem.id === car.id && carItem.typeBusiness === car.typeBusiness,
    );

    if (itemIndexPopular !== -1) {
      const listPopularUpdate = [...listPopularCars];
      listPopularUpdate[itemIndexPopular] = { ...car, isLiked: !car.isLiked };
      setListPopularCars(listPopularUpdate);
      dispatch(
        updateListCar({
          listRecommendCar,
          listPopularCar: listPopularUpdate,
        }),
      );
    }

    if (itemIndexRecommend !== -1) {
      const listRecommendUpdate = [...listRecommendCars];
      listRecommendUpdate[itemIndexRecommend] = { ...car, isLiked: !car.isLiked };
      setListRecommendCars(listRecommendUpdate);
      dispatch(
        updateListCar({
          listRecommendCar: listRecommendCar,
          listPopularCar,
        }),
      );
    }
  };

  return (
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
              listLocation={listLocation}
              value={pickUpValue}
              handleChangeValue={setPickUpValue}
            />
          </div>
        ) : (
          <div className="grow basis-0">
            <PickDrop
              tittle="Drop - Off"
              listLocation={listLocation}
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
              listLocation={listLocation}
              value={dropOffValue}
              handleChangeValue={setDropOffValue}
            />
          </div>
        ) : (
          <div className="grow basis-0">
            <PickDrop
              tittle="Pick - up"
              listLocation={listLocation}
              value={pickUpValue}
              handleChangeValue={setPickUpValue}
            />
          </div>
        )}
      </div>
      <PopularCar
        listPopularCars={listPopularCars}
        onClick={changeStatusIsLiked}
        isLoading={isLoading}
      />
      <RecommendCar
        listRecommendCars={listRecommendCars}
        onClick={changeStatusIsLiked}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
