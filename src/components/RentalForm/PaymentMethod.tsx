import BITCOIN from '@/assets/images/Bitcoin.png';
import PAY_PAL from '@/assets/images/PayPal.png';
import VISA from '@/assets/images/visa_logo.png';
import VISA_MC from '@/assets/images/visa_logo_mc.png';

import CheckBox from '../CheckBox/CheckBox';
import { InputText } from '../InputText/InputText';
import { RentalForm } from './RentalForm';
import './style.css';

export const PaymentMethod = () => {
  return (
    <RentalForm
      title="Payment Method"
      description="Please enter your payment method"
      current={3}
      total={4}
    >
      <div className="payment-method">
        <div className="bg-bg mt-8 rounded-[10px] p-4">
          <div className="flex items-center justify-between">
            <CheckBox
              label="Credit Card"
              onChange={() => console}
              name="payment"
              id="credit_card"
              classLabel="font-semibold text-base leading-5 tracking-tight text-black-2"
            />
            <div className="flex items-center gap-3">
              <img src={VISA} alt="visa" />
              <img src={VISA_MC} alt="visa" />
            </div>
          </div>
          <div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="mt-5 lg:col-span-6 lg:mt-0">
                <InputText placeholder="Card number" label="Card Number" classNames="bg-white" />
              </div>
              <div className="mt-5 lg:col-span-6 lg:mt-0">
                <InputText placeholder="Card Holder" label="Card Holder" classNames="bg-white" />
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="mt-5 lg:col-span-6 lg:mt-0">
                <InputText placeholder="DD/MMYY" label="Expiration Date" classNames="bg-white" />
              </div>
              <div className="mt-5 lg:col-span-6 lg:mt-0">
                <InputText placeholder="CVC" label="CVC" classNames="bg-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-bg mt-5 flex items-center justify-between rounded-[10px] p-4">
          <CheckBox
            id="paypal"
            label="PayPal"
            onChange={() => console.log()}
            name="payment"
            classLabel="font-semibold text-sm leading-150 tracking-tight text-black-2"
          />
          <img src={PAY_PAL} alt="paypal" />
        </div>
        <div className="bg-bg mt-5 flex items-center justify-between rounded-[10px] p-4">
          <CheckBox
            id="bitcoin"
            label="Bitcoin"
            onChange={() => console.log()}
            name="payment"
            classLabel="font-semibold text-sm leading-150 tracking-tight text-black-2"
          />
          <img src={BITCOIN} alt="bitcoin" />
        </div>
      </div>
    </RentalForm>
  );
};
