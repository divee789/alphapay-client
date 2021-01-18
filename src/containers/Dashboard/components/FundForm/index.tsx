/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import APIService from '../../../../services/api-services';
import { fundUserWallet, getUserTransactions } from '../../../../store/actions';
import { payWithKorapay, payWithFlutterwave } from '../../../../services/payment';
import { RootState } from '../../../../store';
import Button from '../../../../components/Button';
import './index.scss';

declare global {
  interface Window {
    Korapay;
    FlutterwaveCheckout;
  }
}

const FundForm = (props: { closed: () => void }): JSX.Element => {
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const API = new APIService();

  interface FormValues {
    amount: number;
  }

  const initialValues: FormValues = {
    amount: ('' as unknown) as number,
  };

  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number().required('Please provide the amount you want to fund').min(100),
  });

  const callbackFn = async (reference: string, values: any, processor: string): Promise<void> => {
    setProcessing(true);
    const data = {
      ...values,
      processor,
      processor_reference: reference,
      transaction_status: 'success',
      narration: 'Deposit funds to wallet',
    };
    try {
      const response = await API.verifyTransaction(processor, reference);
      if (response.data.status === 'success') {
        await dispatch(fundUserWallet(data));
        await dispatch(getUserTransactions());
      }
      setProcessing(false);
      props.closed();
      toast.success('Funds added to wallet', {
        icon: `🔥`,
      });
    } catch (error) {
      setProcessing(false);
      toast.error(
        '❗ Oops, There has been an error.Please contact support as soon as possible and your funds will be sorted out',
      );
    }
  };

  const handleSubmit = async (values): Promise<void> => {
    try {
      const data = {
        ...values,
        ...user,
      };
      setProcessing(true);
      const processor = await API.getModalProcessor();
      setProcessing(false);
      switch (processor.data) {
        case 'FLUTTERWAVE':
          payWithFlutterwave(data, async (ref) => {
            await callbackFn(ref, values, 'FLUTTERWAVE');
          });
          break;
        case 'KORAPAY':
          payWithKorapay(data, async (ref) => {
            await callbackFn(ref, values, 'KORAPAY');
          });
          break;
        default:
          alert(
            'Sorry, we are unable to process your wallet top-up at this time, please contact support or try again later',
          );
          return;
      }
    } catch (error) {
      toast.error('❗ There has been an error funding your wallet,please contact support.');
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={walletValidationSchema} onSubmit={handleSubmit}>
        {(): JSX.Element => {
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
                  <Button disabled={processing} loading={processing} type="submit">
                    Fund Wallet
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
