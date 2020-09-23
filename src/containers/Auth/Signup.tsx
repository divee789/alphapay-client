/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { signUp } from '../../store/actions';

import theme from '../../components/Theme';
import RecaptchaComponent from './Recaptcha';

import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';
import invisible from '../../assets/images/invisible.svg';

import Button from '../../components/Button';

import './auth.scss';

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone_number: number;
}

const SignUp = () => {
  const history = useHistory();
  const [feedback, setFeedback] = useState(null);
  const [recaptcha, setRecaptcha] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { processing } = useSelector((state: { auth }) => state.auth);
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    username: '',
    phone_number: ('' as unknown) as number,
  };

  const logValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('Provide your first name please'),
    last_name: Yup.string().required('Provide your last name please'),
    username: Yup.string().required('Provide a username please'),
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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      delete values['confirmPassword'];
      console.log('recaptcha', recaptcha);
      await dispatch(signUp(values));
      history.push(`/auth/verify_email`);
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
            validationSchema={logValidationSchema}
            onSubmit={handleSubmit}
            render={(formProps) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={() => history.push('/')} />
                  </div>

                  <Form className="form signup">
                    <h2>Sign Up</h2>
                    <p>Join the community,Sign up and move on to your dashboard</p>
                    <div className="input-container-dual">
                      <div>
                        <Field type="text" name="first_name" placeholder="Your First name" />
                        <ErrorMessage name="first_name" render={(msg) => <div className="error">{msg}</div>} />
                      </div>
                      <div>
                        <Field type="text" name="last_name" placeholder="Your Last Name" />
                        <ErrorMessage name="last_name" render={(msg) => <div className="error">{msg}</div>} />
                      </div>
                    </div>

                    <div className="input-container">
                      <Field type="text" name="username" placeholder="Your Username" />
                      <ErrorMessage name="username" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <Field type="text" name="phone_number" placeholder="Your Phone Number" />
                      <ErrorMessage name="phone_number" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <Field type="text" name="email" placeholder="Your Email" />
                      <ErrorMessage name="email" render={(msg) => <div className="error">{msg}</div>} />
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
                      <Field type={showPassword ? 'text' : 'password'} name="password" placeholder="Your Password" />
                      <ErrorMessage name="password" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <img
                        src={invisible}
                        alt="show/hide"
                        className="password_icon"
                        onClick={() => {
                          setShowPassword2(!showPassword2);
                        }}
                      />
                      <Field
                        type={showPassword2 ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage name="confirmPassword" render={(msg) => <div className="error">{msg}</div>} />
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
                      <div className="error_message" onClick={(): void => setFeedback(null)}>
                        {feedback}
                      </div>
                    )}
                    <div className="input-container btn_container">
                      <Button disabled={formProps.isSubmitting} colored>
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

export default SignUp;
