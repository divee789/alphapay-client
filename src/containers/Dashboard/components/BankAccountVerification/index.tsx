/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { RootState } from '../../../../store';
import APIService from '../../../../services/api-services';
import CircleLoader from '../../../../components/Loaders/Circle';
import { BankAccountDetails } from '../../../../interfaces/business';
import './index.scss';

interface BankAccountVerificationProps {
  setBankAccount: (data: BankAccountDetails) => void;
  closeComponent: () => void;
}

interface FormValues {
  bank_code: string;
  bank_account: string;
}

const BankAccountVerification = (props: BankAccountVerificationProps): JSX.Element => {
  const { banks } = useSelector((state: RootState) => state.misc);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    bank_code: '',
    bank_account: '',
  });
  const [errors, setErrors] = useState({
    bank_code: null,
    bank_account: null,
  });

  const API = new APIService();

  const validateValues = (): boolean => {
    if (formValues.bank_code === '') {
      setErrors({
        ...errors,
        bank_code: 'Please select a bank',
      });
      return false;
    }
    if (formValues.bank_account === '') {
      setErrors({
        ...errors,
        bank_account: 'Please provide an account number',
      });
      return false;
    }
    const isNumber = /^\d+$/.test(formValues.bank_account);
    if (!isNumber) {
      setErrors({
        ...errors,
        bank_account: 'Please provide a valid account number',
      });
      return false;
    }
    return true;
  };

  const verifyBankAccount = async (values: FormValues): Promise<void> => {
    try {
      setLoading(true);
      const validatedAccountResponse = await API.confirmBankAccount(values);
      const validatedAccount = validatedAccountResponse.data;
      setLoading(false);
      return props.setBankAccount(validatedAccount);
    } catch (error) {
      toast.error('Your bank details could not be verified, please make sure they are valid and try again');
      setLoading(false);
    }
  };

  return (
    <section className="bank_account_verification_section">
      <div>
        <div className="bank_account_verification_input_container">
          <label>PLEASE PROVIDE THE BANK NAME</label>
          <div className="con">
            <select
              name="bank_code"
              onChange={(e): void => setFormValues({ ...formValues, bank_code: e.target.value })}
              value={formValues.bank_code}
              onBlur={(): void => {
                if (formValues.bank_code !== '') {
                  setErrors({ ...errors, bank_code: null });
                }
              }}
            >
              <option value="">Please select your bank</option>
              {banks.map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          <p className="error modal_error">{errors.bank_code}</p>
        </div>

        <div className="bank_account_verification_input_container">
          <label>PLEASE PROVIDE THE BANK ACCOUNT NUMBER?</label>
          <div className="con">
            <input
              type="string"
              name="bank_account"
              placeholder="Your account number"
              onBlur={async (): Promise<void> => {
                const validated = validateValues();
                if (validated) {
                  await verifyBankAccount(formValues);
                }
              }}
              onChange={(e): void => {
                setFormValues({
                  ...formValues,
                  bank_account: e.target.value,
                });
              }}
            />
          </div>
          <p className="error modal_error">{errors.bank_account}</p>
        </div>
        {loading && <CircleLoader />}
      </div>
    </section>
  );
};

export default BankAccountVerification;
