/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { transferFunds } from '../../../../store/actions';

import Button from '../../../../components/Button';
import img1 from '../../../../assets/images/quick-and-easy.jpg';

const TransferForm = (props: { mode }) => {
  const [message, setMessage] = useState(null);
  const [pin, setPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { wallet } = useSelector((state: { wallet }) => state.wallet);
  const dispatch = useDispatch();

  interface FormValues {
    amount: string;
    recipient_phone_number: string;
    transaction_type: string;
  }

  const initialValues: FormValues = {
    amount: '',
    recipient_phone_number: '',
    transaction_type: 'transfer',
  };

  const linkStyle = {
    color: props.mode === 'dark' ? '#00C9B6' : '',
  };

  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number().required('Please provide the amount you want to transfer'),
    recipient_phone_number: Yup.string().required('Please provide the recipient phone number'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      if (wallet && wallet.transaction_pin) {
        setLoading(false);
        setPin(true);
        return;
      }
      await dispatch(transferFunds(values));
      setMessage('Transaction successful');
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setLoading(false);
      setSubmitting(false);
    }
  };

  const transfer = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      await dispatch(transferFunds(values));
      setMessage('Transaction successful');
      setLoading(false);
      setPin(false);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setPin(false);
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (message) {
    setTimeout(function () {
      setMessage(null);
    }, 5000);
    return (
      <>
        <div className="transfer_feedback">
          <img src={img1} alt="transfer_feedback" />
          <p>{message}</p>
        </div>
      </>
    );
  }

  if (pin) {
    return (
      <Formik
        initialValues={{ pin: '' }}
        validationSchema={Yup.object().shape({
          pin: Yup.string()
            .required()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(4, 'Must be exactly 4 digits')
            .max(4, 'Must be exactly 4 digits'),
        })}
        onSubmit={transfer}
        render={() => {
          return (
            <>
              <Form className="fund_wallet_form">
                <div>
                  <p>PLEASE PROVIDE YOUR TRANSACTION PIN</p>
                  <div className="con">
                    <Field type="string" name="pin" placeholder="1111" style={linkStyle} />
                  </div>
                  <ErrorMessage name="pin" render={(msg) => <div className="error">{msg}</div>} />
                </div>
                <div className="fund_btn">
                  <Button colored>{loading ? 'Please wait...' : 'TRANSFER FUNDS'}</Button>
                </div>
              </Form>
            </>
          );
        }}
      />
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
                <h2>TRANSFER FUNDS</h2>
                <div>
                  <p>HOW MUCH DO YOU WANT TO TRANSFER?</p>
                  <div className="con">
                    {' '}
                    <span>NGN</span>{' '}
                    <Field type="number" name="amount" placeholder="0" style={linkStyle} className="amount_input" />
                  </div>
                  <ErrorMessage name="amount" render={(msg) => <div className="error modal_error">{msg}</div>} />
                </div>
                <div>
                  <p>WHO DO YOU WANT TO TRANSFER TO?</p>
                  <div className="con">
                    <Field type="string" name="recipient_phone_number" placeholder="08024110355" style={linkStyle} />
                  </div>
                  <ErrorMessage
                    name="recipient_phone_number"
                    render={(msg) => <div className="error modal_error">{msg}</div>}
                  />
                </div>
                <div className="fund_btn">
                  <Button disabled={formProps.isSubmitting} colored>
                    {loading ? 'Please wait...' : 'TRANSFER FUNDS'}
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

export default TransferForm;
