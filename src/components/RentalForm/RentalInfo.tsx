import { ILocation } from '@/model/selection';

import { InputPicker } from '../InputText/InputPicker';
import { Selection } from '../Selection/Selection';
import { RentalForm } from './RentalForm';

const TestOption: ILocation[] = [
  {
    id: '1',
    value: 'Quan 1',
  },
  {
    id: '2',
    value: 'Quan 2',
  },
  {
    id: '3',
    value: 'Quan 3',
  },
];

export const RentalInfo = () => {
  return (
    <RentalForm
      title="Rental Info"
      description="Please select your rental date"
      current={2}
      total={4}
    >
      <div className="mt-4">
        <div className="mb-5 flex items-center lg:col-span-6">
          <div className="bg-light-blue after:contents[*] after:bg-primary flex h-4 w-4 items-center justify-center rounded-full after:absolute after:h-2 after:w-2 after:rounded-full" />
          <h3 className="text-black-2 ml-2 font-semibold tracking-tight">Pick-Up</h3>
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Selection placeholder="Select your city" option={TestOption} label="Location" />
          </div>
          <div className="mt-5 lg:order-3 lg:col-span-6 lg:mt-0">
            <InputPicker type="time" placeholder="Select your time" label="Time" />
          </div>
          <div className="mt-5 lg:order-2 lg:col-span-6 lg:mt-0">
            <InputPicker type="date" placeholder="Select your date" label="Date" />
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
            <Selection placeholder="Select your city" option={TestOption} label="Location" />
          </div>
          <div className="mt-5 lg:order-3 lg:col-span-6 lg:mt-0">
            <InputPicker type="time" placeholder="Select your time" label="Time" />
          </div>
          <div className="mt-5 lg:order-2 lg:col-span-6 lg:mt-0">
            <InputPicker type="date" placeholder="Select your date" label="Date" />
          </div>
        </div>
      </div>
    </RentalForm>
  );
};
