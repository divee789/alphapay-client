import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { set_transaction_pin } from '../../../../../store/actions';
import * as Yup from 'yup';
import Request from '../../../../../services/api-services';
import Button from '../../../../../components/Button';

import emailImg from '../../../../../assets/images/email.jpg';
import phoneVer from '../../../../../assets/images/andela1.png';

import './index.scss';

const api = new Request();

const Security = (props: any) => {
  const [feedback, setFeedback] = useState(null);
  const [feedback2, setFeedback2] = useState(null);
  const { processing, user } = useSelector((state: any) => state.auth);
  const { wallet, pin_error } = useSelector((state: any) => state.wallet);
  const dispatch = useDispatch();

  const initialValues = {
    old_password: '',
    new_password: '',
    type: 'Password',
  };

  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(9, 'Password must be 9 characters or longer')
      .required('Provide your old password please'),
    new_password: Yup.string()
      .min(9, 'Password must be 9 characters or longer')
      .required('Provide your new password please'),
  });

  const transactionValidationSchema = Yup.object().shape({
    transaction_pin: Yup.string()
      .min(4, 'Your pin must be at least 4 digits')
      .required('Provide a transaction pin please'),
  });

  const handleSubmit = async (values: any, { setSubmitting, setErrors, resetForm }: any) => {
    try {
      switch (values.type) {
        case 'Password':
          const res = await api.changePassword(values);
          console.log(res);
          setFeedback(res.message);
          setSubmitting(false);
          return resetForm();
        case 'Transaction':
          await dispatch(set_transaction_pin(values));
          setFeedback2('Request successful');
          setSubmitting(false);
          return resetForm();
      }
    } catch (error) {
      switch (values.type) {
        case 'Password':
          setFeedback(error.response.data.message);
          if (error.response.status === 409) {
            setFeedback('Your password is invalid');
            return;
          }
        case 'Transaction':
          setFeedback2(pin_error);
      }
    }
  };

  return (
    <>
      <section className="dashboard_security">
        <div className="password_security_change">
          <Formik
            initialValues={initialValues}
            validationSchema={passwordValidationSchema}
            onSubmit={handleSubmit}
            render={(formProps) => {
              return (
                <>
                  <Form>
                    <h3>Change Password</h3>
                    <div className="old_password_form">
                      <Field type="password" name="password" placeholder="Old Password" />
                      <ErrorMessage name="password" render={(msg) => <div className="error modal_error">{msg}</div>} />
                    </div>
                    <div className="new_password_form">
                      <Field type="password" name="new_password" placeholder="New Password" />
                      <ErrorMessage
                        name="new_password"
                        render={(msg) => <div className="error modal_error">{msg}</div>}
                      />
                    </div>
                    <div className="btn_cont">
                      <Button disabled={formProps.isSubmitting} dashboard>
                        {processing ? 'please wait...' : 'UPDATE PASSWORD'}
                      </Button>
                    </div>
                    {feedback && <p className="modal_error">{feedback}</p>}
                  </Form>
                </>
              );
            }}
          />
        </div>

        <div className="transaction_options">
          <Formik
            initialValues={{ transaction_pin: '', type: 'Transaction' }}
            validationSchema={transactionValidationSchema}
            onSubmit={handleSubmit}
            render={(formProps) => {
              return (
                <>
                  <Form>
                    <h3>Activate Transaction Pin</h3>
                    <div className="transaction_pin_form">
                      <Field type="text" name="transaction_pin" placeholder="1234" />
                      <ErrorMessage
                        name="transaction_pin"
                        render={(msg) => <div className="error modal_error">{msg}</div>}
                      />
                    </div>
                    <div className="btn_cont">
                      {wallet && (
                        <Button disabled={formProps.isSubmitting} dashboard>
                          {processing ? 'please wait...' : `${wallet.transaction_pin ? 'CHANGE PIN' : 'ENABLE PIN'}`}
                        </Button>
                      )}
                    </div>
                  </Form>
                  {feedback2 && <p className="modal_error">{feedback2}</p>}
                </>
              );
            }}
          />
        </div>
      </section>
      <div className="security-options">
        {user && !user.email_verified && (
          <div className="two_fa">
            <img src={emailImg} alt="email" />
            <p>Please verify your email to confirm your identity</p>
            <Button
              dashboard
              onClick={async () => {
                await api.sendEmail();
                props.history.push('/auth/verify_email');
              }}
            >
              Verify Email
            </Button>
          </div>
        )}
        <div className="two_fa">
          <img src={phoneVer} alt="phone" />
          <p>
            You are strongly advised to enable 2 factor authentication in order to add an extra layer of security to
            your account
          </p>
          <Button dashboard>Enable 2 factor authentication</Button>
        </div>
      </div>
    </>
  );
};

export default Security;
