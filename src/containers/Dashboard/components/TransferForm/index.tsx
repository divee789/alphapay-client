/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { transferFunds } from '../../../../store/actions';
import Request from '../../../../services/api-services';

import Button from '../../../../components/Button';
import Dots from '../../../../components/Loaders/Dots';

import './index.scss';

const TransferForm = (): JSX.Element => {
  const [transferState, setTransferState] = useState('form');
  const [recipient, setRecipient] = useState(null);
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const { wallet } = useSelector((state: { wallet }) => state.wallet);
  const dispatch = useDispatch();

  const API = new Request();

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

  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number().required('Please provide the amount you want to transfer'),
    recipient_phone_number: Yup.string().required('Please provide the recipient phone number'),
  });

  const handleSubmit = async (values): Promise<void> => {
    setLoading(true);
    setRecipient(values);
    try {
      const response = await API.verifyRecipientAccount(values.recipient_phone_number);
      setVerifiedAccount(response.data.user);
      setLoading(false);
      setTransferState('verify');
    } catch (error) {
      toast.error(`❗ ${error.response.data.message}`, {
        autoClose: false,
      });
      setLoading(false);
      return;
    }
  };

  const transfer = async (): Promise<void> => {
    try {
      setLoading(true);
      if (wallet?.pin && transferState !== 'pin') {
        setLoading(false);
        setTransferState('pin');
        return;
      }
      await dispatch(transferFunds(recipient));
      toast.success('Transaction successful');
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const VerifyPin = (): JSX.Element => (
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
    >
      {(): JSX.Element => {
        return (
          <>
            <Form className="fund_wallet_form">
              <div>
                <p>PLEASE PROVIDE YOUR TRANSACTION PIN</p>
                <div className="con">
                  <Field type="string" name="pin" placeholder="1111" />
                </div>
                <ErrorMessage name="pin" render={(msg): JSX.Element => <div className="error">{msg}</div>} />
              </div>
              <div className="fund_btn">
                <Button colored>{loading ? <Dots /> : 'TRANSFER FUNDS'}</Button>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );

  const VerifyAccount = (): JSX.Element => (
    <section className="transfer_verified_account">
      <div>
        <img
          src={verifiedAccount.profile_image || 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'}
          alt="profile_image"
        />
        <p>
          Transfer {recipient.amount} to {verifiedAccount.username}
        </p>
      </div>
      <div className="verify_actions_btn">
        <Button dashboard onClick={transfer}>
          {loading ? <Dots /> : 'PROCEED'}
        </Button>
        <Button dashboard onClick={(): void => setTransferState('form')}>
          GO BACK
        </Button>
      </div>
    </section>
  );

  const TransferForm = (): JSX.Element => (
    <>
      <Formik initialValues={initialValues} validationSchema={walletValidationSchema} onSubmit={handleSubmit}>
        {(formProps): JSX.Element => {
          return (
            <>
              <Form className="fund_wallet_form">
                <h2>TRANSFER FUNDS</h2>
                <div>
                  <p>HOW MUCH DO YOU WANT TO TRANSFER?</p>
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
                  <p>WHO DO YOU WANT TO TRANSFER TO?</p>
                  <div className="con">
                    <Field type="string" name="recipient_phone_number" placeholder="08024110355" />
                  </div>
                  <ErrorMessage
                    name="recipient_phone_number"
                    render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                  />
                </div>
                <div className="fund_btn">
                  <Button disabled={formProps.isSubmitting} dashboard>
                    {loading ? <Dots /> : 'TRANSFER FUNDS'}
                  </Button>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );

  return (
    <>
      {transferState === 'form' && <TransferForm />}
      {transferState === 'verify' && <VerifyAccount />}
      {transferState === 'pin' && <VerifyPin />}
    </>
  );
};

export default TransferForm;
