import React from 'react';

import SAFETY from '@/assets/images/Layer_Safe.png';

import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';
import { RentalForm } from './RentalForm';

export const Confirmation = () => {
  return (
    <RentalForm
      title="Confirmation"
      description="We are getting to the end. Just few clicks and your rental is ready!"
      current={4}
      total={4}
    >
      <div>
        <div className="bg-bg mt-5 flex items-center justify-between rounded-[10px] p-4">
          <CheckBox
            id="confirm-one"
            label="I agree with sending an Marketing and newsletter emails. No spam, promised!"
            onChange={() => console.log()}
            name="payment"
            classLabel="lg:leading-150 leading-160 text-black-2 ml-2 text-xs font-medium tracking-tight lg:ml-5 lg:text-base lg:font-semibold"
            type="square"
          />
        </div>
        <div className="bg-bg mt-5 mb-6 flex items-center justify-between rounded-[10px] p-4">
          <CheckBox
            id="confirm-two"
            label="I agree with our terms and conditions and privacy policy."
            onChange={() => console.log()}
            name="payment"
            classLabel="lg:leading-150 leading-160 text-black-2 ml-2 text-xs font-medium tracking-tight lg:ml-5 lg:text-base lg:font-semibold"
            type="square"
          />
        </div>
        <Button variant="primary" className="py-[10px] px-[16px]">
          Rental Now
        </Button>
        <img src={SAFETY} alt="safety" className="mt-[34px]" />
        <div className="mt-[14px]">
          <h3 className="leading-150 text-black-2 font-bold tracking-tight">
            All your data are safe
          </h3>
          <p className="text-grey mt-1 text-xs font-medium tracking-tight">
            We are using the most advanced security to provide you the best experience ever.
          </p>
        </div>
      </div>
    </RentalForm>
  );
};
