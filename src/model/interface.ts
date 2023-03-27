export interface IPayment {
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
  payPal: boolean;
  bitCoin: boolean;
  confirmation: [];
}
