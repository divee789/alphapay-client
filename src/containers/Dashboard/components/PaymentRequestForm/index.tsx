/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, number, string } from 'yup';
import { toast } from 'react-toastify';
import Fade from 'react-reveal/Fade';
import { getPaymentRequests } from '../../../../store/actions';
import APIService from '../../../../services/api-services';
import AlphaAccountVerification from '../AlphaAccountVerification';
import Button from '../../../../components/Button';
import { User } from '../../../../store/types';
import { AlphaAccountDetails } from '../../../../interfaces/business';
import './index.scss';

const PaymentRequestForm = (): JSX.Element => {
  interface PaymentRequestProps {
    amount: string;
    recipient_phone_number: string;
    reason: string;
  }

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [verifiedAccount, setVerifiedAccount] = useState<User>(null);

  const API = new APIService();

  const initialValues: PaymentRequestProps = {
    amount: '',
    recipient_phone_number: '',
    reason: '',
  };

  const requestValidationSchema = object().shape({
    amount: number().required('Please provide the amount you are requesting for'),
    reason: string().required('Why are you requesting for this amount ?'),
  });

  const handleSubmit = async (values: PaymentRequestProps, { resetForm }): Promise<void> => {
    try {
      setLoading(true);
      await API.createPaymentRequest({
        amount: values.amount,
        reason: values.reason,
        recipients: [`${verifiedAccount.id}`],
      });
      toast.success('Request sent successfully');
      await dispatch(getPaymentRequests());
      resetForm();
      setLoading(false);
    } catch (error) {
      toast.error(`❗ ${error.response.data.message}`);
      setLoading(false);
    }
  };

  return (
    <Fade bottom duration={1000} distance="50px">
      <section className="payment_request_form_section">
        <Formik initialValues={initialValues} validationSchema={requestValidationSchema} onSubmit={handleSubmit}>
          {(): JSX.Element => {
            return (
              <>
                <Form>
                  <div className="payment_request_form_input_container">
                    <label htmlFor="amount">HOW MUCH DO YOU WANT TO REQUEST?</label>
                    <Field type="number" name="amount" placeholder="0" className="amount_input" id="amount" />
                    <ErrorMessage
                      name="amount"
                      render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                    />
                  </div>
                  <Fade top duration={500} distance="10px">
                    <AlphaAccountVerification
                      setAlphaAccount={(data: AlphaAccountDetails): void => setVerifiedAccount(data)}
                    />
                  </Fade>
                  {verifiedAccount && (
                    <div className="payment_request_form_recipient">
                      <div className="image_container">
                        <img
                          src={
                            verifiedAccount.profile_image ||
                            'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'
                          }
                          alt="user profile image"
                        />
                      </div>
                      <div className="info_container">
                        <p>{verifiedAccount.username}</p>
                        <p>{verifiedAccount.phone_number}</p>
                      </div>
                    </div>
                  )}
                  <div className="payment_request_form_input_container">
                    <label htmlFor="reason">WHY ARE YOU REQUESTING FUNDS?</label>
                    <Field
                      type="text"
                      name="reason"
                      component="textarea"
                      rows="5"
                      placeholder="Your reason"
                      id="reason"
                    />
                    <ErrorMessage
                      name="reason"
                      render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                    />
                  </div>
                  <div className="payment_request_form_btn">
                    <Button disabled={loading || !verifiedAccount} loading={loading}>
                      Request Funds
                    </Button>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </section>
    </Fade>
  );
};

export default PaymentRequestForm;
