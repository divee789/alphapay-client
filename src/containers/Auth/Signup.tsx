/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import Fade from 'react-reveal/Fade';
import * as Yup from 'yup';
import { signUp } from '../../store/actions';
import { RootState } from '../../store';
import theme from '../../components/Theme';
import Button from '../../components/Button';
import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';
import invisible from '../../assets/images/invisible.svg';
import './auth.scss';

interface FormValues {
  email: string;
  full_name: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone_number: number;
}

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { processing } = useSelector((state: RootState) => state.auth);
  const initialValues: FormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    username: '',
    phone_number: ('' as unknown) as number,
  };

  const logValidationSchema = Yup.object().shape({
    full_name: Yup.string().required('Provide your full name please'),
    username: Yup.string().required('Provide a username please'),
    phone_number: Yup.number().min(11, 'Invalid phone number').required('Provide your phone number please'),
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
    delete values['confirmPassword'];
    toast.promise(dispatch(signUp(values)) as any, {
      success: () => {
        history.push(`/dashboard/overview`);
        return 'Signup Successful';
      },
      error: (err) => {
        setSubmitting(false);
        return `${err.message}`;
      },
      loading: 'Creating your account...',
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
                    <img src={logo} alt="logo" onClick={() => history.push('/')} />
                  </div>
                  <p className="head_info">Create an alphapay account and join the community of alphas</p>
                  <Form className="form signup">
                    <Fade bottom duration={1000} distance="50px">
                      <>
                        <div className="input-container">
                          <div>
                            <Field type="text" name="full_name" placeholder="Your Full Name e.g Jane Doe" />
                            <ErrorMessage name="full_name" render={(msg) => <div className="error">{msg}</div>} />
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
                          <Field
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Your Password"
                          />
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
                        <div className="input-container btn_container">
                          <Button disabled={isSubmitting || processing} loading={processing}>
                            Create Account
                          </Button>
                        </div>
                      </>
                    </Fade>
                  </Form>
                  <p>
                    Already have an account?
                    <Link to="/auth/login">Click here to sign in</Link>
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

export default SignUp;
