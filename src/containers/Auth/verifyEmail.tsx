/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { object, string } from 'yup';
import Fade from 'react-reveal/Fade';
import theme from '../../components/Theme';
import Button from '../../components/Button';
import APIService from '../../services/api-services';
import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';
import './auth.scss';

const API = new APIService();

const VerifyEmail = () => {
  const history = useHistory();
  interface FormValues {
    token: string;
  }
  const initialValues: FormValues = {
    token: '',
  };

  const validationSchema = object().shape({
    token: string().required('Provide provide a valid token'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    toast.promise(API.verifyEmail(values.token) as any, {
      success: () => {
        history.push(`/dashboard/overview`);
        return 'Email verified successfully';
      },
      error: (err) => {
        setSubmitting(false);
        return `${err.response?.data?.message}`;
      },
      loading: 'Verifying your email...',
    });
  };

  return (
    <>
      <section className="login_auth" style={theme()}>
        <div className="auth_form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            render={({ isSubmitting }) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={() => history.push('/')} />
                  </div>
                  <p className="head_info">
                    Your verification code has been sent to your email, Please check your email and provide the code
                    here to enable us verify the email{' '}
                  </p>
                  <Form className="form">
                    <Fade bottom duration={1000} distance="50px">
                      <>
                        <div className="input-container">
                          <Field type="text" name="token" placeholder="Please put your token here" />
                          <ErrorMessage name="token" render={(msg) => <div className="error">{msg}</div>} />
                        </div>
                        <div className="input-container btn_container">
                          <Button disabled={isSubmitting}>Verify Email</Button>
                        </div>
                      </>
                    </Fade>
                  </Form>
                  <p>
                    Did not receive an email? <Link to="/">Resend</Link>
                  </p>
                </>
              );
            }}
          />
        </div>
        <div className="auth_image">
          <img src={image1} alt="auth" />
        </div>
      </section>
    </>
  );
};

export default VerifyEmail;
