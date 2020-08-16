/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';

import RecaptchaComponent from '../Recaptcha';
import theme from '../../../components/Theme';
import Button from '../../../components/Button';

import Request from '../../../services/api-services';

import logo from '../../../assets/images/alp.png';
import image1 from '../../../assets/images/auth.jpg';

import '../auth.scss';

const api = new Request();

const ForgotPassword = (props: { history }) => {
  const [recaptcha, setRecaptcha] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [feedback, setFeedback] = useState(null);

  interface FormValues {
    email: string;
  }
  const initialValues: FormValues = {
    email: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setProcessing(true);
      const res = await api.passwordReset(values.email);
      setFeedback(res.message);
      setProcessing(false);
    } catch (err) {
      setFeedback(err.response.data.message);
      setTimeout(() => setFeedback(null), 3000);
      setProcessing(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="login_auth" style={theme()}>
        <div className="auth_image">
          <img src={image1} alt="auth" />
        </div>
        <div className="auth_form">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Provide a valid email please').required('Provide your email please'),
            })}
            render={(formProps) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={() => props.history.push('/')} />
                  </div>

                  <Form className="form">
                    <h2>Forgot your Password?</h2>
                    <p>Please provide your email.and we will send a password reset link to you</p>
                    <div className="input-container">
                      <Field type="text" name="email" placeholder="Your email" />
                      <ErrorMessage name="email" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <RecaptchaComponent
                        verifyCallback={() => {
                          setRecaptcha(false);
                        }}
                        expiredCallback={() => {
                          setRecaptcha(true);
                        }}
                      />
                    </div>
                    {feedback && (
                      <div className="error_message" onClick={() => setFeedback(null)}>
                        {feedback}
                      </div>
                    )}
                    <div className="input-container btn_container">
                      <Button disabled={formProps.isSubmitting || recaptcha} colored>
                        {processing ? 'Please wait...' : 'CONTINUE'}
                      </Button>
                      <p>
                        Did not receive an email? <Link to="/">Resend Email</Link>
                      </p>
                    </div>
                  </Form>
                </>
              );
            }}
          />
        </div>
      </section>
    </>
  );
};

export default withRouter(ForgotPassword);
