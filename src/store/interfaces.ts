export interface Store {
  auth: {
    user: any;
    processing: boolean;
    isAuth: boolean;
    error: any;
    update_error: any;
    message: any;
  };
  wallet: {
    wallet: any;
    processing: boolean;
    error: any;
    pin_error: any;
    fund_processing: boolean;
  };
  transaction: {
    transactions: any;
    processing: boolean;
    error: any;
    pager: any;
  };
  paymentRequest: {
    processing: boolean;
    incomingPaymentRequests: any;
    outgoingPaymentRequests: any;
    error: any;
  };
}
