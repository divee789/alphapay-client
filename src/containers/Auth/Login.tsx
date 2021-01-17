/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Fade from 'react-reveal/Fade';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { logIn } from '../../store/actions';
import { RootState } from '../../store';
import theme from '../../components/Theme';
import Button from '../../components/Button';
import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';
import invisible from '../../assets/images/invisible.svg';
import './auth.scss';

const LogIn = () => {
  const history = useHistory();
  const [feedback, setFeedback] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { processing } = useSelector((state: RootState) => state.auth);
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

  const handleSubmit = async (values: FormValues, { setSubmitting }) => {
    toast.promise(dispatch(logIn(values)) as any, {
      success: () => {
        history.push(`/dashboard/overview`);
        return 'Login Successful';
      },
      error: (err) => {
        setSubmitting(false);
        if (err.message === '2FA Required') {
          history.push(`/auth/2fa?email=${values.email}`);
          setSubmitting(false);
          return 'TwoFA Required';
        }
        return `${err.message}`;
      },
      loading: 'Logging you in...',
    });
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
                  <p className="head_info">Welcome back, Please log in to your account to access your dashboard</p>
                  <Form className="form">
                    <Fade bottom duration={1000} distance="50px">
                      <>
                        <div className="input-container">
                          <Field type="email" name="email" placeholder="example@gmail.com" />
                          <ErrorMessage name="email" render={(msg: string) => <div className="error">{msg}</div>} />
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
                            placeholder="password"
                            className="password"
                          />
                          <ErrorMessage name="password" render={(msg: string) => <div className="error">{msg}</div>} />
                        </div>
                        <div className="error_message" onClick={(): void => setFeedback(null)}>
                          {feedback}
                        </div>
                        <div className="input-container btn_container">
                          <Button disabled={isSubmitting || processing} loading={processing}>
                            Sign In
                          </Button>
                        </div>
                      </>
                    </Fade>
                  </Form>
                  <p>
                    Can not remember your password? <Link to="/auth/password_reset_request">Reset</Link>
                  </p>
                  <p>
                    Do not have an account? <Link to="/auth/signup"> Register</Link>
                  </p>
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
