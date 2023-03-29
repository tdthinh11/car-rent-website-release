import { useTranslation } from 'react-i18next';

import { InputText } from '@/components/InputText/InputText';
import { IFormUpdate } from '@/model/interface';

export const BillingInfo = ({
  name,
  address,
  phoneNumber,
  city,
  updateFields,
  register,
  errors,
}: IFormUpdate) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white md:flex md:gap-8">
      <div className="w-full grow basis-0">
        <InputText
          id="name"
          error={errors?.name?.message}
          label={t('rental.billingInfo.name')}
          placeholder={t('rental.billingInfo.namePlaceHolder')}
          register={register}
          value={name}
          onChange={(e) => {
            updateFields({ name: e.target.value });
          }}
        />
        <InputText
          id="address"
          error={errors?.address?.message}
          label={t('rental.billingInfo.address')}
          placeholder={t('rental.billingInfo.address')}
          register={register}
          value={address}
          onChange={(e) => {
            updateFields({ address: e.target.value });
          }}
        />
      </div>
      <div className="w-full grow basis-0">
        <InputText
          id="phoneNumber"
          error={errors?.phoneNumber?.message}
          label={t('rental.billingInfo.phoneNumber')}
          placeholder={t('rental.billingInfo.phoneNumber')}
          register={register}
          value={phoneNumber}
          onChange={(e) => {
            updateFields({ phoneNumber: e.target.value });
          }}
        />
        <InputText
          id="city"
          error={errors?.city?.message}
          label={t('rental.billingInfo.city')}
          placeholder={t('rental.billingInfo.city')}
          register={register}
          value={city}
          onChange={(e) => {
            updateFields({ city: e.target.value });
          }}
        />
      </div>
    </div>
  );
};
