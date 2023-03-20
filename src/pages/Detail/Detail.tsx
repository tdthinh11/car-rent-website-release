import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { carType, reviewType } from '@/assets/data/cars';
import { ArrowDown } from '@/assets/icons/ArrowDown';
import Button from '@/components/Button/Button';
import { CarouseLookCar } from '@/components/CarouseLookCar';
import PopularCar from '@/components/PopularCar/PopularCar';
import { Rating } from '@/components/Rating/Rating';
import { ReviewItem } from '@/components/Review/Review';
import AdsCard from '@/pages/Home/AdsCard';
import { carActionThunk } from '@/store/carSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

export const Detail = () => {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const [isLoadingView, setIsLoadingView] = useState<boolean>(false);
  const [sliderData, setSliderData] = useState<React.ReactNode[]>([]);
  const [sliderBtnImg, setSliderBtnImg] = useState<string[]>([]);
  const { carId } = useParams();
  const dispatch = useAppDispatch();
  const { carDetail, searchKey, listPopularCar, listRecommendCar, isLoading } = useAppSelector(
    (state) => state.carReducer,
  );

  useEffect(() => {
    carId && dispatch(carActionThunk.updateCarDetailThunk(carId));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  useEffect(() => {
    dispatch(carActionThunk.getListCarsApi(searchKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  useEffect(() => {
    const sliderDataUpdate = carDetail?.carouselDetail.showImg.map((item, index) => {
      return (
        <div key={index}>
          <AdsCard
            classNames="bg-primary"
            bgUrl={item}
            btnVariant="secondary"
            title="Easy way to rent a car at a low price"
            description="Providing cheap car rental services and safe and comfortable facilities."
            btnText="Rental Car"
          />
        </div>
      );
    });

    const sliderBtnImgDataUpdate = carDetail?.carouselDetail.btnImg.map((item) => {
      return item;
    });
    sliderDataUpdate && setSliderData(sliderDataUpdate);
    sliderBtnImgDataUpdate && setSliderBtnImg(sliderBtnImgDataUpdate);
  }, [carDetail]);

  const changeStatusIsLiked = (car: carType) => {
    dispatch(carActionThunk.changeIsLikeStatus(car));
  };

  return (
    <div className="mx-auto mb-8 max-w-5xl px-6 md:px-16">
      <div className="md:flex md:gap-8">
        <CarouseLookCar sliderData={sliderData} sliderButton={sliderBtnImg} />
        <div className="mt-8 rounded-[10px] bg-white p-4 md:flex md:grow md:basis-0 md:flex-col md:justify-between">
          <div>
            <div>
              <h1 className="leading-150 mb-[6px] text-xl font-bold tracking-tight">
                {carDetail?.name}
              </h1>
              <div className="flex items-center">
                <div>
                  <Rating total={5} rated={carDetail?.rated ? carDetail?.rated : 0} />
                </div>
                <p className="text-grey mx-2 text-xs font-medium leading-[18px]">440+ Reviewer</p>
              </div>
            </div>
            <p className="leading-200 text-grey my-4 text-xs tracking-tight md:my-8">{`NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the "race track".`}</p>
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="w-1/2 grow basis-0">
                <div className="flex flex-nowrap justify-between">
                  <span className="text-grey mr-1 mb-4 text-xs font-medium leading-[15px] tracking-tight">
                    Type Car
                  </span>
                  <span className="text-grey w-max min-w-max text-xs font-semibold leading-[15px] tracking-tight">
                    {carDetail?.type}
                  </span>
                </div>
                <div className="flex flex-nowrap justify-between">
                  <span className="text-grey mr-1 text-xs font-medium leading-[15px] tracking-tight">
                    Steering
                  </span>
                  <span className="text-grey w-max min-w-max text-xs font-semibold leading-[15px] tracking-tight">
                    {carDetail?.steering}
                  </span>
                </div>
              </div>
              <div className="w-1/2 grow basis-0">
                <div className="flex flex-nowrap justify-between">
                  <span className="text-grey mr-1 mb-4 text-xs font-medium leading-[15px] tracking-tight">
                    Capacity
                  </span>
                  <span className="text-grey w-max min-w-max text-xs font-semibold leading-[15px] tracking-tight">
                    {carDetail?.capacity} Person
                  </span>
                </div>
                <div className="flex flex-nowrap justify-between">
                  <span className="text-grey mr-1 text-xs font-medium leading-[15px] tracking-tight">
                    Gasoline
                  </span>
                  <span className="text-grey w-max min-w-max text-xs font-semibold leading-[15px] tracking-tight">
                    {carDetail?.gas}L
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-black-2 text-xl font-bold leading-6">
                &#36;{carDetail?.price}.00/<span className="text-grey text-sm">days</span>
              </h1>
              <p className="text-grey text-xs font-bold leading-4 line-through">
                &#36;{carDetail?.priceWithoutDisCount}.00
              </p>
            </div>
            <div>
              <Button variant="primary" className="!leading-150 !py-4 !px-8 !text-base !font-bold">
                Rent now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 rounded-[10px] bg-white p-4">
        <div className="mb-6 flex items-center">
          <h1 className="leading-150 mb-[6px] text-xl font-semibold tracking-tight">Reviews</h1>
          <span className="bg-primary leading-150 ml-3 rounded-[4px] py-[6px] px-3 text-sm font-bold text-white">
            {carDetail?.review.length ? carDetail?.review.length : 0}
          </span>
        </div>
        <div>
          {!isShowAll
            ? carDetail?.review.slice(0, 2).map((reviewItem: reviewType) => {
                return (
                  <ReviewItem
                    key={reviewItem.id}
                    name={reviewItem.name}
                    major={reviewItem.major}
                    date={reviewItem.date}
                    rated={reviewItem.rated}
                    content={reviewItem.content}
                    imgUrl={reviewItem.userImg}
                  />
                );
              })
            : carDetail?.review.map((reviewItem: reviewType) => {
                return (
                  <ReviewItem
                    key={reviewItem.id}
                    name={reviewItem.name}
                    major={reviewItem.major}
                    date={reviewItem.date}
                    rated={reviewItem.rated}
                    content={reviewItem.content}
                    imgUrl={reviewItem.userImg}
                  />
                );
              })}
          {isLoadingView && (
            <p className="text-grey mt-8 mb-[26px] flex cursor-pointer items-center justify-center gap-2">
              Loading ...
            </p>
          )}
        </div>
        {carDetail?.review.length ? (
          !isShowAll ? (
            <div className="text-grey mt-8 mb-[26px] flex cursor-pointer items-center justify-center gap-2">
              <span
                onClick={() => {
                  setIsLoadingView(true);
                  setTimeout(() => {
                    setIsShowAll((prev) => !prev);
                    setIsLoadingView(false);
                  }, 300);
                }}
              >
                Show All
              </span>
              <ArrowDown className="text-grey fill-current stroke-current" />
            </div>
          ) : (
            <div className="text-grey mt-8 mb-[26px] flex cursor-pointer items-center justify-center gap-2">
              <span
                onClick={() => {
                  setIsLoadingView(true);
                  setTimeout(() => {
                    setIsShowAll((prev) => !prev);
                    setIsLoadingView(false);
                  }, 300);
                }}
              >
                Show less
              </span>
              <ArrowDown className="text-grey rotate-180 fill-current stroke-current" />
            </div>
          )
        ) : (
          <p className="text-center">{`Don't have any review`}</p>
        )}
      </div>
      <div className="mt-8">
        <PopularCar
          listPopularCars={listPopularCar}
          onClick={changeStatusIsLiked}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-8">
        <PopularCar
          title="Recommend"
          listPopularCars={listRecommendCar}
          onClick={changeStatusIsLiked}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
