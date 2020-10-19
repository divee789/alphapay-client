import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { getPaymentRequests } from '../../../../store/actions';
import Request from '../../../../services/api-services';

import Button from '../../../../components/Button';
import Dots from '../../../../components/Loaders/Dots';

const PaymentRequestForm = () => {
  const [formState, setFormState] = useState('form');
  const [loading, setLoading] = useState(null);
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const API = new Request();

  const initialValues = {
    amount: '',
    recipient_phone_number: '',
    reason: '',
  };

  const requestValidationSchema = Yup.object().shape({
    amount: Yup.number().required('Please provide the amount you are requesting for'),
    recipient_phone_number: Yup.string().required(
      'Please provide the phone number of the user you are requesting funds from',
    ),
    reason: Yup.string().required('Why are you requesting for this amount ?'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setData(values);
    try {
      const response = await API.verifyRecipientAccount(values.recipient_phone_number);
      setVerifiedAccount(response);
      setLoading(false);
      setFormState('verify');
    } catch (error) {
      toast.error(`❗ ${error.response.data.message}`, {
        autoClose: false,
      });
      setLoading(false);
    }
  };

  const requestFunds = async () => {
    try {
      setLoading(true);
      await API.createPaymentRequest(data);
      toast.success('Request sent successfully');
      await dispatch(getPaymentRequests());
      setLoading(false);
    } catch (error) {
      toast.error(`❗ ${error.response.data.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      {formState === 'form' && (
        <>
          <Formik initialValues={initialValues} validationSchema={requestValidationSchema} onSubmit={handleSubmit}>
            {() => {
              return (
                <>
                  <Form className="fund_wallet_form">
                    <h2>REQUEST FUNDS</h2>
                    <div>
                      <p>HOW MUCH DO YOU WANT TO REQUEST?</p>
                      <div className="con">
                        {' '}
                        <span>NGN</span> <Field type="number" name="amount" placeholder="0" className="amount_input" />
                      </div>
                      <ErrorMessage name="amount" render={(msg) => <div className="error modal_error">{msg}</div>} />
                    </div>
                    <div>
                      <p>WHO DO YOU WANT TO REQUEST FUNDS FROM?</p>
                      <div className="con">
                        <Field type="string" name="recipient_phone_number" placeholder="08024110355" />
                      </div>
                      <ErrorMessage
                        name="phone_number"
                        render={(msg) => <div className="error modal_error">{msg}</div>}
                      />
                    </div>
                    <div>
                      <p>WHY ARE YOU REQUESTING FUNDS?</p>
                      <div className="con">
                        <Field type="text" name="reason" component="textarea" rows="5" placeholder="Your reason" />
                      </div>
                      <ErrorMessage name="reason" render={(msg) => <div className="error modal_error">{msg}</div>} />
                    </div>
                    <div className="fund_btn">
                      <Button disabled={loading} dashboard>
                        {loading ? <Dots /> : 'REQUEST FUNDS'}
                      </Button>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </>
      )}

      {formState === 'verify' && (
        <section className="transfer_verified_account">
          <div>
            <img
              src={verifiedAccount.profile_image || 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'}
              alt="profile_image"
            />
            <p>
              Request NGN {data.amount} from {verifiedAccount.username}
            </p>
          </div>
          <div className="verify_actions_btn">
            <Button dashboard onClick={requestFunds}>
              {loading ? <Dots /> : 'PROCEED'}
            </Button>
            <Button dashboard onClick={() => setFormState('form')}>
              GO BACK
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default PaymentRequestForm;
