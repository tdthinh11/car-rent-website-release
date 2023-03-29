import React, { useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Confirmation } from '@/components/RentalForm/Confirmation';
import { PaymentMethod } from '@/components/RentalForm/PaymentMethod';
import { RentalForm } from '@/components/RentalForm/RentalForm';
import { RentalInfo } from '@/components/RentalForm/RentalInfo';
import { SummaryRental } from '@/components/SummaryRental/SummaryRental';
import { IPayment } from '@/model/interface';
import { Notification } from '@/utils/Notification';

import { BillingInfo } from '../../components/RentalForm/BillingInfo';

const initialPaymentData: IPayment = {
  promoteCode: '',
  name: '',
  address: '',
  phoneNumber: '',
  city: '',
  pickLocation: '',
  pickDate: '',
  pickTime: '',
  dropLocation: '',
  dropDate: '',
  dropTime: '',
  cardNumber: '',
  cardHolder: '',
  expirationDate: '',
  cvc: '',
  visa: true,
  payPal: false,
  bitCoin: false,
  confirmation: false,
};

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
const schema = yup.object().shape({
  promoteCode: yup
    .string()
    .required('Promote is required')
    .length(5, 'Promote is not correct, must contain 5 characters'),
  name: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .length(10, 'Phone number is not valid')
    .matches(phoneRegExp, 'Phone number is not valid'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  pickLocation: yup.string().required('Location is required'),
  pickDate: yup.string().required('Date is required'),
  pickTime: yup.string().required('Time is required'),
  dropLocation: yup.string().required('Location is required'),
  dropDate: yup.string().required('Date is required'),
  dropTime: yup.string().required('Time is required'),
  confirmation: yup.boolean().oneOf([true], 'All confirmation must be clicked'),
  visa: yup.boolean().required(),
  cardNumber: yup.string().when('visa', {
    is: true,
    then: (schema) => schema.required('Card number is required'),
  }),
  cardHolder: yup.string().when('visa', {
    is: true,
    then: (schema) => schema.required('Card holder is required'),
  }),
  expirationDate: yup.string().when('visa', {
    is: true,
    then: (schema) => schema.required('Expiration date is required'),
  }),
  cvc: yup.string().when('visa', {
    is: true,
    then: (schema) => schema.required('CVC is required'),
  }),
});

interface IRental {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const Rental = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPayment>({
    resolver: yupResolver(schema),
  });
  const [data, setData] = useState<IPayment>(initialPaymentData);
  const updateFields = (field: Partial<IPayment>) => {
    setData((prev) => {
      return { ...prev, ...field };
    });
  };

  useEffect(() => {
    setValue('confirmation', data.confirmation);
    setValue('visa', data.visa);
  }, [data, setValue]);

  const onSubmit: SubmitHandler<IPayment> = (value) => {
    console.log('Call api to handle submit ', value);
    setTimeout(() => {
      navigate('/');
    }, 1000);
    Notification('success', 'Rental successfully');
  };

  const onInvalid: SubmitErrorHandler<IPayment> = () => {
    Notification('error', 'Rental unsuccessfully', 'Invalid field');
  };

  const stepPayment: IRental[] = [
    {
      id: '1',
      title: t('rental.billingInfo.title'),
      description: t('rental.billingInfo.subTitle'),
      children: (
        <BillingInfo {...data} updateFields={updateFields} register={register} errors={errors} />
      ),
    },
    {
      id: '2',
      title: t('rental.rentalInfo.title'),
      description: t('rental.billingInfo.subTitle'),
      children: (
        <RentalInfo {...data} updateFields={updateFields} register={register} errors={errors} />
      ),
    },
    {
      id: '3',
      title: t('rental.paymentMethod.title'),
      description: t('rental.paymentMethod.subTitle'),
      children: (
        <PaymentMethod {...data} updateFields={updateFields} register={register} errors={errors} />
      ),
    },
    {
      id: '4',
      title: t('rental.confirmation.title'),
      description: t('rental.confirmation.subTitle'),
      children: (
        <Confirmation
          {...data}
          updateFields={updateFields}
          register={register}
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          errors={errors}
        />
      ),
    },
  ];

  return (
    <form>
      <div className="wrapper mb-11 p-6 lg:mb-0 lg:grid lg:grid-cols-12 lg:p-8">
        <div className="lg:order-2 lg:col-span-5">
          <SummaryRental
            {...data}
            updateFields={updateFields}
            register={register}
            errors={errors}
          />
        </div>
        <div className="mt-8 mr-0 lg:order-1 lg:col-span-7 lg:mt-0 lg:mr-8">
          {stepPayment.map((step, index) => {
            return (
              <div key={step.id} className={index !== 0 ? 'mt-8' : ''}>
                <RentalForm
                  title={step.title}
                  description={step.description}
                  current={index + 1}
                  total={stepPayment.length}
                >
                  {step.children}
                </RentalForm>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};
