import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';
import theme from '../../components/Theme';

import { login } from '../../store/actions';

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
  }
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const logvalidationSchema = Yup.object().shape({
    email: Yup.string().email('Provide a valid email please').required('Provide your email please'),
    password: Yup.string()
      .min(9, 'Password must be 9 characters or longer')
      .required('Provide a password please')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  });

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
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
