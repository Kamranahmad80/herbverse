export type PaymentMethod = {
  id?: string;
  cardNumber: string;
  cardHolder: string;
  expiry: string; // Format: "MM/YY"
  cvv: string;
};
