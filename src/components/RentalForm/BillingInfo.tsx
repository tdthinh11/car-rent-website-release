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
  return (
    <div className="bg-white md:flex md:gap-8">
      <div className="w-full grow basis-0">
        <InputText
          id="name"
          error={errors?.name?.message}
          label="Name"
          placeholder="Your name"
          register={register}
          value={name}
          onChange={(e) => {
            updateFields({ name: e.target.value });
          }}
        />
        <InputText
          id="address"
          error={errors?.address?.message}
          label="Address"
          placeholder="Address"
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
          label="Phone Number"
          placeholder="Phone Number"
          register={register}
          value={phoneNumber}
          onChange={(e) => {
            updateFields({ phoneNumber: e.target.value });
          }}
        />
        <InputText
          id="city"
          error={errors?.city?.message}
          label="Town / City"
          placeholder="Town / City"
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
