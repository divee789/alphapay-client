/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Fade from 'react-reveal/Fade';
import * as Yup from 'yup';

import theme from '../../../components/Theme';
import Button from '../../../components/Button';
import Dots from '../../../components/Loaders/Dots';

import Request from '../../../services/api-services';

import logo from '../../../assets/images/alp.png';
import image1 from '../../../assets/images/auth.jpg';

import '../auth.scss';

const API = new Request();

const ForgotPassword = () => {
  const history = useHistory();
  const [processing, setProcessing] = useState(false);
  const [feedback, setFeedback] = useState(null);

  interface FormValues {
    email: string;
  }
  const initialValues: FormValues = {
    email: '',
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }) => {
    try {
      setProcessing(true);
      const res = await API.passwordReset(values.email);
      toast.success(res.message);
      setProcessing(false);
    } catch (err) {
      toast.error(`❗ ${err.response.data.message}`);
      setProcessing(false);
      setSubmitting(false);
    }
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
            render={({ isSubmitting }) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={() => history.push('/')} />
                  </div>

                  <Form className="form">
                    <h2>Forgot your Password?</h2>
                    <p className="head_info">Please provide your email and we will send a password reset link to you</p>
                    <Fade bottom>
                      <div className="input-container">
                        <Field type="text" name="email" placeholder="Your email" />
                        <ErrorMessage name="email" render={(msg) => <div className="error">{msg}</div>} />
                      </div>
                    </Fade>
                    {feedback && (
                      <div className="error_message" onClick={() => setFeedback(null)}>
                        {feedback}
                      </div>
                    )}
                    <div className="input-container btn_container">
                      <Fade bottom>
                        <Button disabled={isSubmitting || processing} colored>
                          {processing ? <Dots /> : 'Submit Request'}
                        </Button>
                      </Fade>

                      <p>
                        Did not receive an email? <Link to="/">Resend Email</Link>
                      </p>
                    </div>
                  </Form>
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

export default ForgotPassword;
