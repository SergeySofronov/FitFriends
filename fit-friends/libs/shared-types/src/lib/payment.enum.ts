export enum Payment {
  Visa = 'Visa',
  Mir = 'Mir',
  Umoney = 'Umoney',
}

export type PaymentType = keyof typeof Payment;
