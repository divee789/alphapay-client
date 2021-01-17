/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Fade from 'react-reveal/Fade';
import * as Yup from 'yup';
import theme from '../../../components/Theme';
import Button from '../../../components/Button';
import APIServices from '../../../services/api-services';
import logo from '../../../assets/images/alp.png';
import image1 from '../../../assets/images/auth.jpg';
import '../auth.scss';
const API = new APIServices();

const ForgotPassword = () => {
  const history = useHistory();
  interface FormValues {
    email: string;
  }
  const initialValues: FormValues = {
    email: '',
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }) => {
    toast.promise(API.passwordReset(values.email) as any, {
      success: (data: any) => {
        return data.message;
      },
      error: (err) => {
        setSubmitting(false);
        return `${err.response.data.message}`;
      },
      loading: 'Generating password reset link...',
    });
  };

  return (
    <>
      <section className="login_auth" style={theme()}>
        <div className="auth_form">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Provide a valid email please').required('Provide your email please'),
            })}
          >
            {({ isSubmitting }) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={() => history.push('/')} />
                  </div>
                  <p className="head_info">Please provide your email and we will send a password reset link to you</p>
                  <Form className="form">
                    <Fade bottom duration={1000} distance="50px">
                      <>
                        <div className="input-container">
                          <Field type="text" name="email" placeholder="Your email" />
                          <ErrorMessage name="email" render={(msg) => <div className="error">{msg}</div>} />
                        </div>
                        <div className="input-container btn_container">
                          <Button disabled={isSubmitting}>Submit Request</Button>
                        </div>
                      </>
                    </Fade>
                  </Form>
                  <p>
                    Did not receive an email? <Link to="/">Resend Email</Link>
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

export default ForgotPassword;
