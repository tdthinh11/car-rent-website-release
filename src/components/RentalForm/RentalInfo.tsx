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
  const { carDetail } = useAppSelector((state) => state.carReducer);
  return (
    <div>
      <div className="mt-4">
        <div className="mb-5 flex items-center lg:col-span-6">
          <div className="bg-light-blue after:contents[*] after:bg-primary flex h-4 w-4 items-center justify-center rounded-full after:absolute after:h-2 after:w-2 after:rounded-full" />
          <h3 className="text-black-2 ml-2 font-semibold tracking-tight">Pick-Up</h3>
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Selection
              id="pickLocation"
              error={errors?.pickLocation?.message}
              placeholder="Select your city"
              option={carDetail?.pickLocation ? carDetail?.pickLocation : []}
              label="Location"
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
              placeholder="Select your time"
              label="Time"
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
              placeholder="Select your date"
              label="Date"
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
          <h3 className="text-black-2 ml-2 font-semibold tracking-tight">Drop-Off</h3>
        </div>
        <div className="gap-8 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Selection
              id="dropLocation"
              error={errors?.dropLocation?.message}
              placeholder="Select your city"
              option={carDetail?.dropLocation ? carDetail.dropLocation : []}
              label="Location"
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
              placeholder="Select your time"
              label="Time"
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
              placeholder="Select your date"
              label="Date"
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
