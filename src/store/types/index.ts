export interface Wallet {
  id: string;
  available_balance: number;
  ledger_balance: number;
  client_id: string;
  transaction_pin?: number;
}

export interface Transaction {
  id: string;
  transaction_type: string;
  processor: string;
  amount: number;
  processor_reference: string;
  reference: string;
  status: string;
  recipient: unknown;
  Client?: Client;
  createdAt?: string;
}

export interface Client {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  profile_image?: string;
  mobile_pin?: string;
  email_verified?: boolean;
  twofa_enabled?: boolean;
}
