import { useTranslation } from 'react-i18next';

import { IFormUpdate } from '@/model/interface';
import { useAppSelector } from '@/store/hook';

import { InputPicker } from '../InputText/InputPicker';
import { Selection } from '../Selection/Selection';

export const RentalInfo = ({
  pickDate,
  pickTime,
  dropDate,
  dropTime,
  updateFields,
  register,
  errors,
}: IFormUpdate) => {
  const { t } = useTranslation();
  const { carDetail } = useAppSelector((state) => state.carReducer);
  return (
    <div>
      <div className="mt-4">
        <div className="mb-5 flex items-center lg:col-span-6">
          <div className="bg-light-blue after:contents[*] after:bg-primary flex h-4 w-4 items-center justify-center rounded-full after:absolute after:h-2 after:w-2 after:rounded-full" />
          <h3 className="text-black-2 ml-2 font-semibold tracking-tight">{t('common.pickUp')}</h3>
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Selection
              id="pickLocation"
              error={errors?.pickLocation?.message}
              placeholder={t('rental.rentalInfo.locationPlaceHolder')}
              option={carDetail?.pickLocation ? carDetail?.pickLocation : []}
              label={t('rental.rentalInfo.location')}
              register={register}
              onChange={(e) => {
                updateFields({ pickLocation: e.currentTarget.value });
              }}
            />
          </div>
          <div className="mt-5 lg:order-3 lg:col-span-6 lg:mt-0">
            <InputPicker
              id="pickTime"
              error={errors?.pickTime?.message}
              value={pickTime}
              type="time"
              placeholder={t('rental.rentalInfo.timePlaceHolder')}
              label={t('rental.rentalInfo.time')}
              register={register}
              onChange={(e) => {
                updateFields({ pickTime: e.currentTarget.value });
              }}
            />
          </div>
          <div className="mt-5 lg:order-2 lg:col-span-6 lg:mt-0">
            <InputPicker
              id="pickDate"
              error={errors?.pickDate?.message}
              value={pickDate}
              type="date"
              placeholder={t('rental.rentalInfo.datePlaceHolder')}
              label={t('rental.rentalInfo.date')}
              register={register}
              onChange={(e) => {
                updateFields({ pickDate: e.currentTarget.value });
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 lg:mt-8">
        <div className="mb-5 flex items-center lg:mb-6">
          <div className="bg-light-blue-1 after:contents[*] after:bg-secondary flex h-4 w-4 items-center justify-center rounded-full after:absolute after:h-2 after:w-2 after:rounded-full" />
          <h3 className="text-black-2 ml-2 font-semibold tracking-tight">{t('common.dropOff')}</h3>
        </div>
        <div className="gap-8 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Selection
              id="dropLocation"
              error={errors?.dropLocation?.message}
              placeholder={t('rental.rentalInfo.locationPlaceHolder')}
              option={carDetail?.dropLocation ? carDetail.dropLocation : []}
              label={t('rental.rentalInfo.location')}
              register={register}
              onChange={(e) => {
                updateFields({ dropLocation: e.currentTarget.value });
              }}
            />
          </div>
          <div className="mt-5 lg:order-3 lg:col-span-6 lg:mt-0">
            <InputPicker
              id="dropTime"
              error={errors?.dropTime?.message}
              value={dropTime}
              type="time"
              placeholder={t('rental.rentalInfo.timePlaceHolder')}
              label={t('rental.rentalInfo.time')}
              register={register}
              onChange={(e) => {
                updateFields({ dropTime: e.currentTarget.value });
              }}
            />
          </div>
          <div className="mt-5 lg:order-2 lg:col-span-6 lg:mt-0">
            <InputPicker
              id="dropDate"
              error={errors?.dropDate?.message}
              value={dropDate}
              type="date"
              placeholder={t('rental.rentalInfo.datePlaceHolder')}
              label={t('rental.rentalInfo.date')}
              register={register}
              onChange={(e) => {
                updateFields({ dropDate: e.currentTarget.value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
