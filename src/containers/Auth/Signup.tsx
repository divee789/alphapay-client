import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { signup } from '../../store/actions';

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

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
  phone_number: number;
}

const SignUp: React.FC = (props: any) => {
  const [feedback, setFeedback] = useState(null);
  const [recaptcha, setRecaptcha] = useState(true);
  const { processing } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone_number: ('' as unknown) as number,
  };

  const logvalidationSchema = Yup.object().shape({
    first_name: Yup.string().required('Provide your first name please'),
    last_name: Yup.string().required('Provide your last name please'),
    phone_number: Yup.number().min(11, 'Invalid phone_number').required('Provide your phone_number please'),
    email: Yup.string()
      .email('Hey,just letting you know that your email is quite weird')
      .required('Provide your email please'),
    password: Yup.string()
      .min(9, 'Password must be 9 characters or longer')
      .required('Provide a password please')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    confirmPassword: Yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
    }),
  });

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      delete values['confirmPassword'];
      await dispatch(signup(values));
      return props.history.push(`/auth/verify_email`);
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
                  <Form className="form signup">
                    <h2>Sign Up</h2>
                    <p>Join the community,Sign up and move on to your dashboard</p>
                    <div className="input-container-dual">
                      <div>
                        <Field type="text" name="first_name" placeholder="First name" />
                        <ErrorMessage name="first_name" render={(msg) => <div className="error">{msg}</div>} />
                      </div>
                      <div>
                        <Field type="text" name="last_name" placeholder="Last Name" />
                        <ErrorMessage name="last_name" render={(msg) => <div className="error">{msg}</div>} />
                      </div>
                    </div>

                    <div className="input-container">
                      <Field type="text" name="phone_number" placeholder="Phone number" />
                      <ErrorMessage name="phone_number" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <Field type="text" name="email" placeholder="Email" />
                      <ErrorMessage name="email" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <Field type="password" name="password" placeholder="Password" />
                      <ErrorMessage name="password" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                      <ErrorMessage name="confirmPassword" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <RecaptchaComponent
                        verifyCallback={(response) => {
                          setRecaptcha(false);
                        }}
                        expiredCallback={(response) => {
                          setRecaptcha(true);
                        }}
                      />
                    </div>
                    <div className="input-container btn_container">
                      <Button disabled={formProps.isSubmitting || recaptcha} colored>
                        {processing ? 'Please wait...' : 'CONTINUE'}
                      </Button>
                      <p>Already have an account?</p>
                      <p>
                        <Link to="/auth/login">Click here to sign in</Link>
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

export default withRouter(SignUp);
