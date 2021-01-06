export enum PROCESSORS {
  KORAPAY = 'KORAPAY',
  FLUTTERWAVE = 'FLUTTERWAVE',
  ALPHAPAY = 'ALPHAPAY',
}

export enum STATUSES {
  DECLINED = 'declined',
  APPROVED = 'approved',
  SUCCESS = 'success',
  FAILED = 'failed',
  PROCESSING = 'processing',
  PENDING = 'pending',
}

export enum TRANSACTION_DESTINATION_TYPE {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

export enum CATEGORIES {
  DISBURSEMENT = 'disbursement',
  BILLS = 'bills',
  AIRTIME = 'airtime',
  COLLECTION = 'collection',
}

export enum WalletActions {
  FUND = 'fund',
  TRANSFER = 'transfer',
  CHECKOUT = 'checkout',
}

export type WalletActionType = WalletActions;

export interface BankAccountDetails {
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
}

export interface AlphaAccountDetails {
  id: string;
  username: string;
  full_name: string;
  phone_number: string;
  profile_image: string;
}

export interface BeneficiaryDetails {
  id: string;
  account_number: string;
  account_name: string;
  account_provider: string;
}
