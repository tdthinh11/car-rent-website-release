import { Confirmation } from '@/components/RentalForm/Confirmation';
import { PaymentMethod } from '@/components/RentalForm/PaymentMethod';
import { RentalInfo } from '@/components/RentalForm/RentalInfo';
import { SummaryRental } from '@/components/SummaryRental/SummaryRental';

import { BillingInfo } from '../../components/RentalForm/BillingInfo';

export const Rental = () => {
  return (
    <div className="wrapper mb-11 p-6 lg:mb-0 lg:grid lg:grid-cols-12 lg:p-8">
      <div className="lg:order-2 lg:col-span-5">
        <SummaryRental />
      </div>
      <div className="mt-8 mr-0 lg:order-1 lg:col-span-7 lg:mt-0 lg:mr-8">
        <div>
          <BillingInfo />
        </div>
        <div className="mt-8">
          <RentalInfo />
        </div>
        <div className="mt-8">
          <PaymentMethod />
        </div>
        <div className="mt-8">
          <Confirmation />
        </div>
      </div>
    </div>
  );
};
