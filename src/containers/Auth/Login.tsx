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

const LogIn: React.FC = (props: any) => {
  const [feedback, setFeedback] = useState(null);
  const [recaptcha, setRecaptcha] = useState(true);
  const { processing } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  interface FormValues {
    email: string;
    password: string;
  }
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const logvalidationSchema = Yup.object().shape({
    email: Yup.string().email('Provide a valid email please').required('Provide your email please'),
    password: Yup.string().required('Provide a password please'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any): Promise<void> => {
    try {
      await dispatch(login(values));
      console.log(recaptcha);
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
            render={(formProps): JSX.Element => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={(): void => props.history.push('/')} />
                  </div>

                  <Form className="form">
                    <h2>Log In</h2>
                    <p>Welcome back,please log in to your account to access your dashboard</p>
                    <div className="input-container">
                      <Field type="text" name="email" placeholder="example@gmail.com" />
                      <ErrorMessage
                        name="email"
                        render={(msg: string): JSX.Element => <div className="error">{msg}</div>}
                      />
                    </div>
                    <div className="input-container">
                      <Field type="password" name="password" placeholder="Password" className="password" />
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
                      <Button disabled={formProps.isSubmitting} colored>
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
          />
        </div>
      </section>
    </>
  );
};

export default withRouter(LogIn);
