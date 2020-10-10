/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Fade from 'react-reveal/Fade';
import * as Yup from 'yup';

import { logIn } from '../../store/actions';
import theme from '../../components/Theme';
// import RecaptchaComponent from './Recaptcha';

import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';
import invisible from '../../assets/images/invisible.svg';

import Button from '../../components/Button';

import './auth.scss';

const LogIn = () => {
  const history = useHistory();
  const [feedback, setFeedback] = useState(null);
  // const [recaptcha, setRecaptcha] = useState(true);
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
      history.push(`/dashboard/overview`);
    } catch (err) {
      if (err.message === '2FA required') {
        history.push(`/auth/2fa?email=${values.email}`);
        setSubmitting(false);
      }
      setFeedback(err.message);
      setTimeout(() => setFeedback(null), 3000);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>alphapay | Authentication</title>
      </Helmet>
      <section className="login_auth" style={theme()}>
        <div className="auth_form">
          <Formik initialValues={initialValues} validationSchema={logValidationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={(): void => history.push('/')} />
                  </div>

                  <Form className="form">
                    <p className="head_info">Welcome back, Please log in to your account to access your dashboard</p>
                    <Fade bottom>
                      <div className="input-container">
                        <Field type="email" name="email" placeholder="example@gmail.com" />
                        <ErrorMessage name="email" render={(msg: string) => <div className="error">{msg}</div>} />
                      </div>
                    </Fade>
                    <Fade bottom>
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
                          placeholder="password"
                          className="password"
                        />
                        <ErrorMessage name="password" render={(msg: string) => <div className="error">{msg}</div>} />
                      </div>
                    </Fade>

                    {/* <div className="input-container">
                      <RecaptchaComponent
                        verifyCallback={(): void => {
                          setRecaptcha(false);
                        }}
                        expiredCallback={(): void => {
                          setRecaptcha(true);
                        }}
                      />
                    </div> */}
                    {feedback && (
                      <div className="error_message" onClick={(): void => setFeedback(null)}>
                        {feedback}
                      </div>
                    )}

                    <div className="input-container btn_container">
                      <Fade bottom>
                        <Button disabled={isSubmitting} colored>
                          {processing ? 'Please wait...' : 'Sign In'}
                        </Button>
                      </Fade>

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
        <div className="auth_image">
          <img src={image1} alt="auth" />
        </div>
      </section>
    </>
  );
};

export default LogIn;
