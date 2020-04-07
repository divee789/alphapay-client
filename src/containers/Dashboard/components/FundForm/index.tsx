import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import * as actionTypes from '../../../../store/actions/actionTypes';
import { Wallet } from '../../../../store/types';
import { payWithKorapay } from '../../../../services/payment';
import Api from '../../../../services/api-services';
import Button from '../../../../components/Button';

import './index.scss';
import img1 from '../../../../assets/images/quick-and-easy.jpg';

const request = new Api(process.env.REACT_APP_STAGING);

//Wallet reducer
function success(wallet: Wallet) {
  return { type: actionTypes.walletConstants.FETCH_WALLET_SUCCESS, wallet };
}

declare global {
  interface Window {
    Korapay: any;
    getpaidSetup: any;
  }
}

const FundForm = (props) => {
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(null);
  const { user } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }, []);
  interface FormValues {
    amount: number;
    narration: string;
  }

  const linkStyle = {
    color: props.mode === 'dark' ? '#00C9B6' : '',
  };

  const initialValues: FormValues = {
    amount: undefined,
    narration: '',
  };

  let text = 'FUND WALLET';
  if (processing) text = 'Please wait....';

  const walletValidationSchema = Yup.object().shape({
    amount: Yup.number().required('Please provide the amount you want to inject'),
    pin: Yup.number(),
  });

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      let data = {
        ...values,
        narration: 'testing',
        ...user,
      };
      setProcessing(true);

      await payWithKorapay(
        data,
        async (ref) => {
          let feedback = {
            ...values,
            processor: 'Korapay',
            processor_reference: ref,
            transaction_status: 'success',
            narration: 'hi',
          };
          console.log(feedback);
          const res = await request.fundWallet(feedback);
          console.log('funding', res);
          setProcessing(false);
          setMessage(res.message);
          await dispatch(success(res.wallet));
        },
        () => {
          setProcessing(false);
          setMessage('There has been an error funding your wallet,please try again later');
        },
      );
    } catch (error) {
      console.log('funding error', error);
      setProcessing(false);
      setMessage('There has been an error funding your wallet,please try again later');
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
                <h2>FUND YOUR WALLET</h2>
                <div>
                  <p>HOW MUCH DO YOU WANT TO FUND?</p>
                  <div className="con">
                    {' '}
                    <span>NGN</span> <Field type="number" name="amount" placeholder="0" style={linkStyle} />
                  </div>
                  <ErrorMessage name="amount" render={(msg) => <div className="error">{msg}</div>} />
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

export default FundForm;
