/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';

import { logIn } from '../../store/actions';
import theme from '../../components/Theme';
import RecaptchaComponent from './Recaptcha';

import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';
import invisible from '../../assets/images/invisible.svg';

import Button from '../../components/Button';

import './auth.scss';

const LogIn = (props: { history }) => {
  const [feedback, setFeedback] = useState(null);
  const [recaptcha, setRecaptcha] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { processing } = useSelector((state: { auth }) => state.auth);
  const dispatch = useDispatch();

  interface FormValues {
    email: string;
    password: string;
  }
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const logValidationSchema = Yup.object().shape({
    email: Yup.string().email('Provide a valid email please').required('Provide your email please'),
    password: Yup.string().required('Provide a password please'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(logIn(values));
      console.log(recaptcha);
      props.history.push(`/dashboard/overview`);
    } catch (err) {
      if (err.message === '2FA required') {
        props.history.push(`/auth/2fa?email=${values.email}`);
        setSubmitting(false);
      }
      setFeedback(err.message);
      setTimeout(() => setFeedback(null), 3000);
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
          <Formik initialValues={initialValues} validationSchema={logValidationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={(): void => props.history.push('/')} />
                  </div>

                  <Form className="form">
                    <h2>Log In</h2>
                    <p>Welcome back,please log in to your account to access your dashboard</p>
                    <div className="input-container">
                      <Field type="email" name="email" placeholder="example@gmail.com" />
                      <ErrorMessage
                        name="email"
                        render={(msg: string): JSX.Element => <div className="error">{msg}</div>}
                      />
                    </div>
                    <div className="input-container">
                      <img
                        src={invisible}
                        alt="show/hide"
                        className="password_icon"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        className="password"
                      />
                      <ErrorMessage
                        name="password"
                        render={(msg: string): JSX.Element => <div className="error">{msg}</div>}
                      />
                    </div>
                    <div className="input-container">
                      <RecaptchaComponent
                        verifyCallback={(): void => {
                          setRecaptcha(false);
                        }}
                        expiredCallback={(): void => {
                          setRecaptcha(true);
                        }}
                      />
                    </div>
                    {feedback && (
                      <div className="error_message" onClick={(): void => setFeedback(null)}>
                        {feedback}
                      </div>
                    )}

                    <div className="input-container btn_container">
                      <Button disabled={isSubmitting} colored>
                        {processing ? 'Please wait...' : 'CONTINUE'}
                      </Button>

                      <p>
                        Can not remember your password? <Link to="/auth/password_reset_request">Reset</Link>
                      </p>
                      <p>
                        Do not have an account? <Link to="/auth/signup"> Register</Link>
                      </p>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default withRouter(LogIn);
