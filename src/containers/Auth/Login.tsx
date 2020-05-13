import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';

import { login } from '../../store/actions';
import theme from '../../components/Theme';
import RecaptchaComponent from './Recaptcha';

import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';

import Button from '../../components/Button';

import './auth.scss';

const styles = {
  padding: '1rem',
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '10px',
};

const LogIn: React.FC = (props: any) => {
  const [feedback, setFeedback] = useState(null);
  const { processing } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  interface FormValues {
    email: string;
    password: string;
    recaptcha: string;
  }
  const initialValues: FormValues = {
    email: '',
    password: '',
    recaptcha: '',
  };

  const logvalidationSchema = Yup.object().shape({
    email: Yup.string().email('Provide a valid email please').required('Provide your email please'),
    password: Yup.string().required('Provide a password please'),
    recaptcha: Yup.string().required(),
  });

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      delete values['recaptcha'];
      await dispatch(login(values));
      props.history.push(`/dashboard/overview`);
    } catch (err) {
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
          <Formik
            initialValues={initialValues}
            validationSchema={logvalidationSchema}
            onSubmit={handleSubmit}
            render={(formProps) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={() => props.history.push('/')} />
                  </div>
                  {feedback && (
                    <p style={styles} className="error_message" onClick={() => setFeedback(null)}>
                      {feedback}
                    </p>
                  )}

                  <Form className="form">
                    <h2>Log In</h2>
                    <p>Welcome back,please log in to your account to access your dashboard</p>
                    <div className="input-container">
                      <Field type="text" name="email" placeholder="example@gmail.com" />
                      <ErrorMessage name="email" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <Field type="password" name="password" placeholder="Password" className="password" />
                      <ErrorMessage name="password" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <RecaptchaComponent
                        verifyCallback={(response) => {
                          formProps.setFieldValue('recaptcha', response);
                        }}
                        expiredCallback={(response) => {
                          formProps.setFieldValue('recaptcha', '');
                        }}
                      />
                      <ErrorMessage name="recaptcha" render={(msg) => <div className="error">{msg}</div>} />
                    </div>

                    <div className="input-container btn_container">
                      <Button disabled={formProps.isSubmitting} colored>
                        {processing ? 'Please wait...' : 'CONTINUE'}
                      </Button>
                      <p>
                        Can't remember your password? <Link to="/auth/password_reset_request">Reset</Link>
                      </p>
                      <p>
                        Don't have an account? <Link to="/auth/signup"> Register</Link>
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

export default withRouter(LogIn);
