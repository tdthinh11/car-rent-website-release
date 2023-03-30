import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import BgRectangle from '@/assets/images/bg_rectangle.png';
import { InputText } from '@/components/InputText/InputText';
import { Rating } from '@/components/Rating/Rating';
import { IFormUpdate } from '@/model/interface';
import { carActionThunk } from '@/store/carSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

export const SummaryRental = ({ promoteCode, updateFields, register, errors }: IFormUpdate) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
        <h1 className="leading-150 text-color-bold text-xl font-bold tracking-tight">
          {t('rental.summary.title')}
        </h1>
        <p className="leading-160 text-grey lg:leading-150 mb-6 font-medium">
          {t('rental.summary.subTitle')}
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
          <h1 className="leading-140 text-color-bold md:leading-150 mb-3 text-xl font-bold md:text-[2rem]">
            {carDetail?.name}
          </h1>
          <div className="items-center md:flex">
            <Rating total={5} rated={carDetail?.rated ? carDetail?.rated : 0} />
            <p className="text-text-light mt-[5px] text-xs font-medium tracking-tight md:ml-2 md:text-sm">
              {carDetail && carDetail?.review.length > 2 ? '2+' : carDetail?.review.length}{' '}
              {t('common.review')}
            </p>
          </div>
        </div>
      </div>
      <div className="border-light mt-6 mb-4 border-t lg:mt-[26px] lg:mb-8"></div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-grey md:leading-150 text-xs font-semibold leading-[15px] tracking-tight md:text-base lg:font-medium">
            {t('rental.summary.subtotal')}
          </p>
          <p className="leading-150 text-color-bold font-semibold tracking-tight">
            &#36;{carDetail?.price ? carDetail.price : 0}.00
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between lg:mt-6">
          <p className="text-grey md:leading-150 text-xs font-semibold leading-[15px] tracking-tight md:text-base lg:font-medium">
            {t('rental.summary.tax')}
          </p>
          <p className="leading-150 text-color-bold font-semibold tracking-tight">
            &#36;{carDetail?.price ? (carDetail.price * 0.1).toFixed(2) : 0}
          </p>
        </div>
        <div className="relative mt-6 lg:mt-8">
          <div className="hover:text-primary absolute top-1/2 right-0 z-10 -translate-y-1/2 py-4 px-8 duration-300 hover:cursor-pointer">
            Apply now
          </div>
          <InputText
            id="promoteCode"
            label=""
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
          <h1 className="leading-150 text-color-bold text-xl font-bold tracking-tight">
            {t('rental.summary.totalSummary')}
          </h1>
          <p className="text-grey text-xs leading-[15px] lg:hidden">
            {t('rental.summary.subSummary')}
          </p>
          <p className="lg:text-grey hidden lg:block lg:text-xs lg:leading-[15px]">
            {t('rental.summary.subSummarySecond')}
          </p>
        </div>
        <div className="leading-150 text-xl font-bold tracking-tight lg:text-[32px] lg:leading-10">
          &#36;{carDetail?.price ? carDetail.price + carDetail.price * 0.1 : 0}
        </div>
      </div>
    </div>
  );
};
