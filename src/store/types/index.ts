export interface Wallet {
  id: string;
  available_balance: string | number;
  ledger_balance: string | number;
  user_id: string;
  pin?: number;
}

export interface Transaction {
  id: string;
  type: string;
  amount: string;
  recipient_name: string;
  sender: {
    full_name: string;
    phone_number: string;
    username: string;
    email: string;
  };
  recipient: {
    full_name: string;
    phone_number: string;
    username: string;
    email: string;
  };
  processor: string;
  status: string;
  transaction_type: string;
  createdAt: string;
}

export interface User {
  id?: string;
  full_name?: string;
  username?: string;
  email?: string;
  phone_number?: string;
  profile_image?: string;
  mobile_pin?: string;
  email_verified?: boolean;
  twofa_enabled?: boolean;
}

export interface PaymentRequest {
  id: string;
  sender_id: string;
  amount: number;
  reason: string;
  payment_sender: {
    full_name: string;
    phone_number: string;
    username: string;
    email: string;
  };
  payment_recipient: {
    full_name: string;
    phone_number: string;
    username: string;
    email: string;
  };
  status: string;
  recipient_id: string;
  createdAt: string;
}

export interface Beneficiary {
  id: string;
  account_number: string;
  account_name: string;
  account_provider: string;
  account_provider_code: string;
  user_id: string;
}

export interface Bank {
  code: string;
  name: string;
}
