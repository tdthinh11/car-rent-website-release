/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Gas from '@/assets/icons/Gas';
import { Heart } from '@/assets/icons/Heart';
import People from '@/assets/icons/People';
import Steering from '@/assets/icons/Steering';
import Button from '@/components/Button/Button';

type CarCardProps = {
  cardType?: 'vertical' | 'horizontal';
  carName: string;
  carType: string;
  gas: string;
  capacity: number;
  price: number;
  width?: '240px' | '304px' | '317px' | '327px' | '100%';
  isLiked?: boolean;
  imgSm?: string;
  imgLg?: string;
  onClickLike?: React.MouseEventHandler<HTMLDivElement> | undefined;
  carId: string;
  steering: string;
};

type CarChild = {
  gas: string;
  capacity: number;
  imgSm?: string;
  imgLg?: string;
  steering: string;
};

export const CarCard = ({
  cardType = 'vertical',
  carName,
  carType,
  gas,
  capacity,
  price,
  width = '100%',
  isLiked = false,
  imgSm,
  imgLg,
  onClickLike,
  carId,
  steering,
}: CarCardProps) => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 hover:cursor-pointer" onClick={onClickLike}>
        <Heart
          className={`fill-current ${
            isLiked ? 'text-red-500' : 'stroke-grey stroke-[1.5] text-transparent'
          }`}
        />
      </div>
      <Link
        to={`/detail/${carId}`}
        className={`min-w-[ block rounded-[10px] bg-white p-4 ${width}] max-w-[${width}]`}
      >
        <div>
          <div className="flex items-center justify-between">
            <h1 className="leading-150 text-color-bold mb-1 font-semibold">{carName}</h1>
          </div>
          <p className="leading-150 text-grey text-xs font-medium tracking-tight">{carType}</p>
        </div>
        {cardType === 'vertical' ? (
          <ChildVertical
            gas={gas}
            capacity={capacity}
            imgSm={imgSm}
            imgLg={imgLg}
            steering={steering}
          />
        ) : (
          <ChildHorizontal
            gas={gas}
            capacity={capacity}
            imgSm={imgSm}
            imgLg={imgLg}
            steering={steering}
          />
        )}
        <div className="mt-7 flex justify-between">
          <h1 className="text-color-bold font-bold leading-5 tracking-tight">
            &#36;{price}/<span className="text-grey"> day</span>
          </h1>
        </div>
      </Link>
      <Link to={`/rental/${carId}`} className="absolute right-4 bottom-4 hover:cursor-pointer">
        <Button variant="primary" className="py-[10px] px-[16px]">
          {t('common.rental')}
        </Button>
      </Link>
    </div>
  );
};

const ChildVertical = ({ gas, capacity, imgSm, imgLg, steering }: CarChild) => {
  return (
    <div>
      <div className="relative mt-8 flex justify-center">
        <img src={imgSm} alt="WC" loading="lazy" className="s375:hidden" />
        <img src={imgLg} alt="WC" loading="lazy" className="s375:block hidden" />
        <div className="bg-shadow-1 absolute -bottom-[5px] h-[60%] w-full"></div>
      </div>
      <div className="mt-11 flex items-center justify-between">
        <div className="flex items-center">
          <Gas />
          <span className="text-grey ml-[5px] text-xs font-medium leading-[15px]">{gas}</span>
        </div>
        <div className="flex items-center">
          <Steering />
          <span className="text-grey ml-[5px] text-xs font-medium leading-[15px]">{steering}</span>
        </div>
        <div className="flex items-center">
          <People />
          <span className="text-grey ml-[5px] text-xs font-medium leading-[15px]">
            {capacity} People
          </span>
        </div>
      </div>
    </div>
  );
};

const ChildHorizontal = ({ gas, capacity, imgSm, imgLg, steering }: CarChild) => {
  return (
    <div className="mt-3 flex items-end justify-between">
      <div className="relative ml-3">
        <img src={imgSm} alt="WC" loading="lazy" className="s375:hidden" />
        <img src={imgLg} alt="WC" loading="lazy" className="s375:block hidden" />
        <div className="bg-shadow-1 absolute top-8 h-11 w-full"></div>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex items-center">
          <Gas />
          <span className="text-grey ml-[5px] text-xs font-medium leading-[15px]">{gas}</span>
        </div>
        <div className="flex items-center">
          <Steering />
          <span className="text-grey ml-[5px] text-xs font-medium leading-[15px]">{steering}</span>
        </div>
        <div className="flex items-center">
          <People />
          <span className="text-grey ml-[5px] text-xs font-medium leading-[15px]">
            {capacity} People
          </span>
        </div>
      </div>
    </div>
  );
};
