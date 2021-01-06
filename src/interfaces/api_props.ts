export interface BaseAPIProps {
  success: boolean;
  message: string;
}

export interface ActivateTwoFAResponseProps extends BaseAPIProps {
  data: {
    image_url: string;
  };
}

export interface TwoFaAuthorizeRequestProps {
  email: string;
  token: string;
}

export interface TwoFaAuthorizeResponseProps extends BaseAPIProps {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface LogInRequestProps {
  email: string;
  password: string;
}

export interface LogInResponseProps extends BaseAPIProps {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface SignUpRequestProps {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface SignUpResponseProps extends BaseAPIProps {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface UpdateUserRequestProps {
  full_name: string;
  username: string;
}

export interface UpdateUserResponseProps extends BaseAPIProps {
  data: {
    user: {
      id: string;
      full_name: string;
      username: string;
      email: string;
      phone_number: string;
      profile_image: string;
      email_verified: boolean;
      twofa_enabled: boolean;
    };
  };
}

export interface ChangePasswordRequestProps {
  new_password: string;
  password: string;
}

export interface GetUserResponseProps extends BaseAPIProps {
  data: {
    user: {
      id: string;
      full_name: string;
      username: string;
      email: string;
      phone_number: string;
      profile_image: string;
      email_verified: boolean;
      twofa_enabled: boolean;
    };
  };
}

export interface ConfirmPasswordResetResponseProps extends BaseAPIProps {
  data: {
    user: {
      id: string;
      full_name: string;
      username: string;
      email: string;
      phone_number: string;
      profile_image: string;
      email_verified: boolean;
      twofa_enabled: boolean;
    };
  };
}

export interface UploadProfileImageResponseProps extends BaseAPIProps {
  data: {
    user: {
      id: string;
      full_name: string;
      username: string;
      email: string;
      phone_number: string;
      profile_image: string;
      email_verified: boolean;
      twofa_enabled: boolean;
    };
  };
}

export interface GetWalletResponseProps extends BaseAPIProps {
  data: {
    wallet: {
      pin: number;
      available_balance: number;
      ledger_balance: number;
      id: string;
      user_id: string;
    };
  };
}

export interface GetBeneficiaryResponseProps extends BaseAPIProps {
  data: {
    beneficiaries: Array<{
      id: string;
      account_number: string;
      account_name: string;
      account_provider: string;
      account_provider_code: string;
      user_id: string;
    }>;
  };
}

export interface GetModalProcessorResponseProps extends BaseAPIProps {
  data: string;
}

export interface FundWalletRequestProps {
  amount: string | number;
  narration?: string;
  processor: string;
  processor_reference: string;
  transaction_status: string;
  pin: string;
}

export interface FundWalletResponseProps extends BaseAPIProps {
  data: {
    wallet: {
      pin: number;
      available_balance: number;
      ledger_balance: number;
      id: string;
      user_id: string;
    };
  };
}

export interface CheckoutWalletRequestProps {
  amount: string;
  bank_code: string;
  bank_account: string;
  bank_name: string;
  account_name: string;
  pin: string;
}

export interface CheckoutWalletResponseProps extends BaseAPIProps {
  data: {
    wallet: {
      pin: number;
      available_balance: number;
      ledger_balance: number;
      id: string;
      user_id: string;
    };
  };
}

export interface VerifyTransactionResponseProps extends BaseAPIProps {
  data: {
    transactionId: string;
    status: string;
  };
}

export interface GetBanksResponseProps extends BaseAPIProps {
  data: {
    banks: Array<{ id: string; code: string; name: string }>;
  };
}

export interface ConfirmBankAccountRequestProps {
  bank_code: string;
  bank_account: string;
}

export interface ConfirmBankAccountResponseProps extends BaseAPIProps {
  data: {
    account_name: string;
    account_number: string;
    bank_name: string;
    bank_code: string;
  };
}

export interface TransferFundsRequestProps {
  amount: string | number;
  recipient_phone_number?: string;
  narration?: string;
  pin?: string;
}

export interface TransferFundsResponseProps extends BaseAPIProps {
  data: {
    amount: string;
    wallet: {
      available_balance: number;
      ledger_balance: number;
      id: string;
      pin: number;
      user_id: string;
    };
  };
}

export interface BeneficiaryTransferRequestProps {
  beneficiaryId: string;
  amount: string;
  pin: string;
  narration: string;
}

export interface BeneficiaryTransferResponseProps extends BaseAPIProps {
  data: {
    amount?: string;
    wallet: {
      available_balance: number;
      ledger_balance: number;
      id: string;
      pin: number;
      user_id: string;
    };
  };
}

export interface VerifyRecipientResponseProps extends BaseAPIProps {
  data: {
    user: {
      id: string;
      profile_image: string;
      username: string;
      full_name: string;
    };
  };
}

export interface GetTransactionsResponseProps extends BaseAPIProps {
  data: {
    pager: any;
    transactions: Array<any>;
  };
}

export interface SetTransactionPinResponseProps extends BaseAPIProps {
  data: {
    wallet: {
      id: string;
      available_balance: number;
      ledger_balance: number;
      pin: number;
      user_id: string;
    };
  };
}

export interface GetPaymentResponseProps extends BaseAPIProps {
  data: {
    outGoingPaymentRequest: Array<{ id: string; amount: string; reason: string; status: string }>;
    incomingPaymentRequest: Array<{ id: string; amount: string; reason: string; status: string }>;
  };
}

export interface CreatePaymentRequestProps {
  amount: string;
  reason: string;
  recipients: Array<string>;
}

export interface ProcessPaymentRequestResponseProps {
  data: {
    wallet: {
      id: string;
      available_balance: number;
      ledger_balance: number;
      pin: number;
      user_id: string;
    };
  };
}
