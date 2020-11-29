/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { fundUserWallet, getUserTransactions } from '../../../../store/actions';
import { payWithKorapay } from '../../../../services/payment';
import Button from '../../../../components/Button';

import './index.scss';
import img1 from '../../../../assets/images/quick-and-easy.jpg';
import APIServiceError from '../../../../services/error-services';

declare global {
  interface Window {
    Korapay;
  }
}

const FundForm = (): JSX.Element => {
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(null);
  const { user } = useSelector((state: { auth }) => state.auth);

  const dispatch = useDispatch();
  interface FormValues {
    amount: number;
  }

  const initialValues: FormValues = {
    amount: ('' as unknown) as number,
  };

  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number().required('Please provide the amount you want to fund').min(100),
  });

  const handleSubmit = async (values, { setSubmitting }): Promise<void> => {
    try {
      const data = {
        ...values,
        ...user,
      };
      setProcessing(true);
      payWithKorapay(
        data,
        async (ref) => {
          const feedback = {
            ...values,
            processor: 'Korapay',
            processor_reference: ref,
            transaction_status: 'success',
            narration: 'Deposit funds to wallet',
          };
          try {
            await dispatch(fundUserWallet(feedback));
            await dispatch(getUserTransactions);
            setProcessing(false);
            return setMessage('Transaction successful');
          } catch (error) {
            if (error instanceof APIServiceError) {
              setProcessing(false);
              return setMessage(
                'Oops,it looks like your network is disconnected ,please contact support as soon as possible and your funds will be sorted out',
              );
            }
          }
        },
        () => {
          setProcessing(false);
          return setMessage('There has been an error funding your wallet,please try again later');
        },
        () => {
          return setProcessing(false);
        },
      );
      setSubmitting(false);
      setProcessing(false);
    } catch (error) {
      setSubmitting(false);
      setProcessing(false);
      setMessage('There has been an error funding your wallet,please try again later');
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
                <h2>FUND YOUR WALLET</h2>
                <div>
                  <p>HOW MUCH DO YOU WANT TO FUND?</p>
                  <div className="con">
                    {' '}
                    <span>NGN</span> <Field type="number" name="amount" placeholder="0" className="amount_input" />
                  </div>
                  <ErrorMessage
                    name="amount"
                    render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                  />
                </div>
                <div className="fund_btn">
                  <Button disabled={formProps.isSubmitting} colored>
                    {processing ? 'Please wait...' : 'FUND WALLET'}
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

export default FundForm;
