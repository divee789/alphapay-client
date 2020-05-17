import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { checkout_client_wallet } from '../../../../store/actions';
import Button from '../../../../components/Button';

import img1 from '../../../../assets/images/quick-and-easy.jpg';

const CheckoutForm = (props) => {
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(null);

  const dispatch = useDispatch();
  interface FormValues {
    amount: number;
    bank: string;
    bank_account: string;
  }

  const linkStyle = {
    color: props.mode === 'dark' ? '#00C9B6' : '',
  };

  const initialValues: FormValues = {
    amount: ('' as unknown) as number,
    bank: '035',
    bank_account: '3119907684',
  };

  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number().required('Please provide the amount you want to withdraw').min(100),
    bank: Yup.string().required('Please provide a bank'),
    bank_account: Yup.string()
      .matches(/^[0-9]+$/)
      .required('Please provide a valid bank account number'),
  });

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      let data = {
        ...values,
      };
      setProcessing(true);
      await dispatch(checkout_client_wallet(data));
      setProcessing(false);
      setMessage('Transaction successful');
    } catch (error) {
      console.log('checkout error', error);
      setProcessing(false);
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
      <Formik
        initialValues={initialValues}
        validationSchema={walletValidationSchema}
        onSubmit={handleSubmit}
        render={(formProps) => {
          return (
            <>
              <Form className="fund_wallet_form">
                <h2>CHECKOUT FUNDS</h2>
                <div>
                  <p>HOW MUCH DO YOU WANT TO CHECKOUT?</p>
                  <div className="con">
                    {' '}
                    <span>NGN</span>{' '}
                    <Field type="number" name="amount" placeholder="0" style={linkStyle} className="amount_input" />
                  </div>
                  <ErrorMessage name="amount" render={(msg) => <div className="error modal_error">{msg}</div>} />
                </div>

                <div>
                  <p>PLEASE PROVIDE YOUR CHECKOUT BANK?</p>
                  <div className="con">
                    {' '}
                    <span>NGN</span>{' '}
                    <Field
                      type="string"
                      name="bank"
                      placeholder="0"
                      style={linkStyle}
                      className="amount_input"
                      value={formProps.values.bank}
                    />
                  </div>
                  <ErrorMessage name="bank" render={(msg) => <div className="error modal_error">{msg}</div>} />
                </div>

                <div>
                  <p>PLEASE PROVIDE YOUR CHECKOUT BANK ACCOUNT NUMBER?</p>
                  <div className="con">
                    {' '}
                    <span>NGN</span>{' '}
                    <Field
                      type="string"
                      name="bank_Account"
                      placeholder="0"
                      style={linkStyle}
                      className="amount_input"
                      value={formProps.values.bank_account}
                    />
                  </div>
                  <ErrorMessage name="bank_Account" render={(msg) => <div className="error modal_error">{msg}</div>} />
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
      />
    </>
  );
};

export default CheckoutForm;
