export interface Wallet {
  id: string;
  available_balance: string | number;
  ledger_balance: string | number;
  user_id: string;
  transaction_pin?: number;
}

export interface Transaction {
  id: string;
  transaction_type: string;
  processor: string;
  amount: string | number;
  processor_reference: string;
  reference: string;
  status: string;
  recipient: User;
  createdAt?: string;
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
