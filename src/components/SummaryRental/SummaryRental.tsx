import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BgRectangle from '@/assets/images/bg_rectangle.png';
import { IFormUpdate } from '@/model/interface';
import { carActionThunk } from '@/store/carSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

import { InputText } from '../InputText/InputText';
import { Rating } from '../Rating/Rating';

export const SummaryRental = ({ promoteCode, updateFields, register, errors }: IFormUpdate) => {
  const dispatch = useAppDispatch();
  const { carId } = useParams();
  const { carDetail, searchKey, listAll } = useAppSelector((state) => state.carReducer);

  useEffect(() => {
    dispatch(carActionThunk.getListCarsApi(searchKey));
  }, [dispatch, searchKey]);

  useEffect(() => {
    carId && dispatch(carActionThunk.updateCarDetailThunk(carId));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [carId, dispatch, listAll]);

  return (
    <div className="rounded-[10px] bg-white p-4 lg:p-6">
      <div>
        <h1 className="leading-150 text-black-2 text-xl font-bold tracking-tight">
          Rental Summary
        </h1>
        <p className="leading-160 text-grey lg:leading-150 mb-6 font-medium">
          Prices may change depending on the length of the rental and the price of your rental car.
        </p>
      </div>
      <div className="flex items-center">
        <div
          className="bg-primary mr-4 flex h-[116px] w-[80] cursor-pointer items-center justify-center rounded-[10px] bg-cover bg-no-repeat px-2 sm:w-[132px] "
          style={{ backgroundImage: `url(${BgRectangle})` }}
        >
          <img src={carDetail?.imgSm} alt="look" />
        </div>
        <div>
          <h1 className="leading-140 text-black-2 md:leading-150 mb-3 text-xl font-bold md:text-[2rem]">
            {carDetail?.name}
          </h1>
          <div className="items-center md:flex">
            <Rating total={5} rated={carDetail?.rated ? carDetail?.rated : 0} />
            <p className="text-black-3 mt-[5px] text-xs font-medium tracking-tight md:ml-2 md:text-sm">
              {carDetail && carDetail?.review.length > 2 ? '2+' : carDetail?.review.length} Reviewer
            </p>
          </div>
        </div>
      </div>
      <div className="border-light mt-6 mb-4 border-t lg:mt-[26px] lg:mb-8"></div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-grey md:leading-150 text-xs font-semibold leading-[15px] tracking-tight md:text-base lg:font-medium">
            Subtotal
          </p>
          <p className="leading-150 text-black-2 font-semibold tracking-tight">
            &#36;{carDetail?.price ? carDetail.price : 0}.00
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between lg:mt-6">
          <p className="text-grey md:leading-150 text-xs font-semibold leading-[15px] tracking-tight md:text-base lg:font-medium">
            Tax
          </p>
          <p className="leading-150 text-black-2 font-semibold tracking-tight">
            &#36;{carDetail?.price ? (carDetail.price * 0.1).toFixed(2) : 0}
          </p>
        </div>
        <div className="relative mt-6 lg:mt-8">
          <div className="hover:text-primary absolute top-1/2 right-8 -translate-y-1/2 duration-300 hover:cursor-pointer">
            Apply now
          </div>
          <InputText
            id="promoteCode"
            error={errors?.promoteCode?.message}
            placeholder="Apply promo code"
            value={promoteCode}
            register={register}
            onChange={(e) => {
              updateFields({ promoteCode: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between lg:mt-8">
        <div>
          <h1 className="leading-150 text-black-2 text-xl font-bold tracking-tight">
            Rental Summary
          </h1>
          <p className="text-grey text-xs leading-[15px] lg:hidden">Overall price rental</p>
          <p className="lg:text-grey hidden lg:block lg:text-xs lg:leading-[15px]">
            Overall price and includes rental discount
          </p>
        </div>
        <div className="leading-150 text-xl font-bold tracking-tight lg:text-[32px] lg:leading-10">
          &#36;{carDetail?.price ? carDetail.price + carDetail.price * 0.1 : 0}
        </div>
      </div>
    </div>
  );
};
