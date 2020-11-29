/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import APIRequest from '../../../../services/api-services';
import { checkoutUserWallet } from '../../../../store/actions';
import Button from '../../../../components/Button';

import img1 from '../../../../assets/images/quick-and-easy.jpg';

const API = new APIRequest();

const CheckoutForm = (props: { banks: Array<{ name: string; code: string; country: string }> }): JSX.Element => {
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(null);
  }, []);
  interface FormValues {
    amount: number;
    bank: string;
    bank_account: string;
  }

  const initialValues: FormValues = {
    amount: ('' as unknown) as number,
    bank: '',
    bank_account: '',
  };

  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number().required('Please provide the amount you want to withdraw').min(100),
    bank: Yup.string().required('Please provide a bank'),
    bank_account: Yup.string()
      .matches(/^[0-9]+$/)
      .required('Please provide a valid bank account number'),
  });

  const handleSubmit = async (values, { setSubmitting }): Promise<void> => {
    try {
      setProcessing(true);
      const res = await API.confirmBankAccount({ bank: values.bank, account: values.bank_account });
      const ask = prompt(
        `You are about to pay ${values.amount} to ${res.account_name}, please type the account name again to continue`,
      );
      if (ask !== res.account_name) {
        setProcessing(false);
        setSubmitting(false);
        return;
      }
      await dispatch(checkoutUserWallet(values));
      setProcessing(false);
      setMessage('Your withdrawal is being processed. You will receive your funds shortly');
    } catch (error) {
      alert('Your bank details could not be verified, please make sure they are valid and try again');
      setProcessing(false);
      setSubmitting(false);
      setMessage('There has been an error checking out your funds from your your wallet,please try again later');
    }
  };

  if (message) {
    return (
      <>
        <div className="transfer_feedback">
          <img src={img1} alt="transfer_feedback" />
          <p>{message}</p>
        </div>
      </>
    );
  }
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={walletValidationSchema} onSubmit={handleSubmit}>
        {(formProps): JSX.Element => {
          return (
            <>
              <Form className="fund_wallet_form">
                <h2>CHECKOUT FUNDS</h2>
                <div>
                  <p>HOW MUCH DO YOU WANT TO CHECKOUT?</p>
                  <div className="con">
                    {' '}
                    <span>NGN</span> <Field type="number" name="amount" placeholder="0" className="amount_input" />
                  </div>
                  <ErrorMessage
                    name="amount"
                    render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                  />
                </div>

                <div>
                  <p>PLEASE PROVIDE YOUR CHECKOUT BANK?</p>
                  <div className="con">
                    <Field as="select" name="bank">
                      <option value="">Please select your bank</option>
                      {props.banks.map((bank) => (
                        <option key={bank.code} value={bank.code}>
                          {bank.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="bank"
                    render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                  />
                </div>

                <div>
                  <p>PLEASE PROVIDE YOUR CHECKOUT BANK ACCOUNT NUMBER?</p>
                  <div className="con">
                    <Field type="string" name="bank_account" placeholder="Your Account Number" />
                  </div>
                  <ErrorMessage
                    name="bank_Account"
                    render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                  />
                </div>
                <div className="fund_btn">
                  <Button disabled={formProps.isSubmitting} colored>
                    {processing ? 'Please wait...' : 'CHECKOUT WALLET'}
                  </Button>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default CheckoutForm;
