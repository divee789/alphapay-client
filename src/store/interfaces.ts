import { User, Wallet, Bank, Beneficiary, Transaction, PaymentRequest } from './types';

export interface AuthReducer {
  user: User;
  processing: boolean;
  isAuth: boolean;
  error: any;
  updateError: any;
  message: any;
}

export interface WalletReducer {
  wallet: Wallet;
}

export interface MiscReducer {
  banks: Array<Bank>;
}

export interface BeneficiaryReducer {
  beneficiaries: Array<Beneficiary>;
}

export interface TransactionReducer {
  transactions: Array<Transaction>;
  processing: boolean;
  error: any;
  pager: any;
}

export interface PaymentRequestReducer {
  processing: boolean;
  incomingPaymentRequests: Array<PaymentRequest>;
  outgoingPaymentRequests: Array<PaymentRequest>;
  error: any;
}
