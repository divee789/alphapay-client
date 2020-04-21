import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { transfer_funds } from '../../../../store/actions';

import Button from '../../../../components/Button';
import img1 from '../../../../assets/images/quick-and-easy.jpg';

const TransferForm = (props) => {
  const [message, setMessage] = useState(null);
  const [pin, setPin] = useState(false);
  const { wallet } = useSelector((state: any) => state.wallet);
  const dispatch = useDispatch();

  interface FormValues {
    amount: any;
    narration: string;
    recipient_phone_number: any;
    transaction_type: string;
  }

  const initialValues: FormValues = {
    amount: '',
    narration: '',
    recipient_phone_number: '',
    transaction_type: 'Internal',
  };

  const linkStyle = {
    color: props.mode === 'dark' ? '#00C9B6' : '',
  };
  let text = 'TRANSFER FUNDS';

  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number().required('Please provide the amount you want to transfer'),
    narration: Yup.string().required('Please provide a narration for this transaction'),
    recipient_phone_number: Yup.string().required('Please provide the recipient phone number'),
  });

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      text = 'Please wait';
      if (wallet && wallet.transaction_pin) {
        setPin(true);
        return;
      }
      let data = {
        ...values,
      };
      const transRes = await dispatch(transfer_funds(data));
      console.log(transRes);
      setMessage('Transaction successful');
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setSubmitting(false);
    }
  };

  const transfer = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      const transRes = await dispatch(transfer_funds(values));
      console.log(transRes);
      setMessage('Transaction successful');
      setPin(false);
    } catch (error) {
      setMessage(error.message);
      setPin(false);
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
        render={(formProps) => {
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
                  <Button disabled={formProps.isSubmitting} colored>
                    {text}
                  </Button>
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
                <div>
                  <p>WHY ARE YOU TRANSFERRING?</p>
                  <div className="con">
                    <Field type="textarea" name="narration" placeholder="To pay my levy" style={linkStyle} />
                  </div>
                  <ErrorMessage name="narration" render={(msg) => <div className="error modal_error">{msg}</div>} />
                </div>
                <div className="fund_btn">
                  <Button disabled={formProps.isSubmitting} colored>
                    {text}
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
