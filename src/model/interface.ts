import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface IPayment {
  promoteCode: string;
  name: string;
  address: string;
  phoneNumber: string;
  city: string;
  pickLocation: string;
  pickDate: string;
  pickTime: string;
  dropLocation: string;
  dropDate: string;
  dropTime: string;
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvc: string;
  visa: boolean;
  payPal: boolean;
  bitCoin: boolean;
  confirmation: boolean;
}

export interface IFormUpdate extends IPayment {
  updateFields: (filed: Partial<IPayment>) => void;
  register: UseFormRegister<IPayment>;
  errors?: FieldErrors<IPayment>;
}
