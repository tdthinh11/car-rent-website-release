import BITCOIN from '@/assets/images/Bitcoin.png';
import PAY_PAL from '@/assets/images/PayPal.png';
import VISA from '@/assets/images/visa_logo.png';
import VISA_MC from '@/assets/images/visa_logo_mc.png';
import { IFormUpdate } from '@/model/interface';
import { formatCardNumber } from '@/utils/text';

import CheckBox from '../CheckBox/CheckBox';
import { InputText } from '../InputText/InputText';
import './style.css';

export const PaymentMethod = ({
  cardNumber,
  cardHolder,
  expirationDate,
  cvc,
  visa,
  payPal,
  bitCoin,
  updateFields,
  register,
  errors,
}: IFormUpdate) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFields({
      visa: e.currentTarget.value === 'visa',
      payPal: e.currentTarget.value === 'paypal',
      bitCoin: e.currentTarget.value === 'bitcoin',
    });
  };
  return (
    <div className="payment-method">
      <div className="bg-bg mt-8 rounded-[10px] p-4">
        <div className="flex items-center justify-between">
          <CheckBox
            label="Credit Card"
            onChange={handleChange}
            name="payment"
            id="credit_card"
            value="visa"
            type="radio"
            checked={visa}
            classLabel="font-semibold text-base leading-5 tracking-tight text-color-bold"
          />
          <div className="flex items-center gap-3">
            <img src={VISA} alt="visa" />
            <img src={VISA_MC} alt="visa" />
          </div>
        </div>
        {visa && (
          <div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="mt-5 lg:col-span-6 lg:mt-0">
                <InputText
                  id="cardNumber"
                  error={errors?.cardNumber?.message}
                  placeholder="Card number"
                  label="Card Number"
                  classNames="bg-white"
                  register={register}
                  value={formatCardNumber(cardNumber)}
                  onChange={(e) => {
                    updateFields({ cardNumber: e.target.value });
                  }}
                />
              </div>
              <div className="mt-5 lg:col-span-6 lg:mt-0">
                <InputText
                  id="cardHolder"
                  error={errors?.cardHolder?.message}
                  placeholder="Card Holder"
                  label="Card Holder"
                  classNames="bg-white"
                  register={register}
                  value={formatCardNumber(cardHolder)}
                  onChange={(e) => {
                    updateFields({ cardHolder: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="mt-5 lg:col-span-6 lg:mt-0">
                <InputText
                  id="expirationDate"
                  error={errors?.expirationDate?.message}
                  placeholder="DD/MMYY"
                  label="Expiration Date"
                  classNames="bg-white"
                  register={register}
                  value={expirationDate}
                  onChange={(e) => {
                    updateFields({ expirationDate: e.target.value });
                  }}
                />
              </div>
              <div className="mt-5 lg:col-span-6 lg:mt-0">
                <InputText
                  id="cvc"
                  error={errors?.cvc?.message}
                  placeholder="CVC"
                  label="CVC"
                  classNames="bg-white"
                  register={register}
                  value={cvc}
                  onChange={(e) => {
                    updateFields({ cvc: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-bg mt-5 flex items-center justify-between rounded-[10px] p-4">
        <CheckBox
          label="PayPal"
          onChange={handleChange}
          name="payment"
          id="paypal"
          value="paypal"
          type="radio"
          checked={payPal}
          classLabel="font-semibold text-sm leading-150 tracking-tight text-color-bold"
        />
        <img src={PAY_PAL} alt="paypal" />
      </div>
      <div className="bg-bg mt-5 flex items-center justify-between rounded-[10px] p-4">
        <CheckBox
          label="Bitcoin"
          onChange={handleChange}
          name="payment"
          id="bitcoin"
          value="bitcoin"
          type="radio"
          checked={bitCoin}
          classLabel="font-semibold text-sm leading-150 tracking-tight text-color-bold"
        />
        <img src={BITCOIN} alt="bitcoin" />
      </div>
    </div>
  );
};
