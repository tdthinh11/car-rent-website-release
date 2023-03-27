import { InputText } from '@/components/InputText/InputText';
import { RentalForm } from '@/components/RentalForm/RentalForm';

export const BillingInfo = () => {
  return (
    <RentalForm
      title="Billing Info"
      description="Please enter your billing info"
      current={1}
      total={4}
    >
      <div className="bg-white md:flex md:gap-8">
        <div className="w-full grow basis-0">
          <InputText label="Name" placeholder="Your name" />
          <InputText label="Address" placeholder="Address" />
        </div>
        <div className="w-full grow basis-0">
          <InputText label="Phone Number" placeholder="Phone Number" />
          <InputText label="Town / City" placeholder="Town / City" />
        </div>
      </div>
    </RentalForm>
  );
};
