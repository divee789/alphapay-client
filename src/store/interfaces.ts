import { User, Wallet } from './types';

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
  processing: boolean;
  error: any;
  pinError: any;
  fundProcessing: boolean;
}

export interface TransactionReducer {
  transactions: any;
  processing: boolean;
  error: any;
  pager: any;
}

export interface PaymentRequestReducer {
  processing: boolean;
  incomingPaymentRequests: any;
  outgoingPaymentRequests: any;
  error: any;
}

export interface Store {
  auth: AuthReducer;
  wallet: WalletReducer;
  transaction: TransactionReducer;
  paymentRequest: PaymentRequestReducer;
}
