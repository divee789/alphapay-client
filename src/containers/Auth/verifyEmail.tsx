/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Fade from 'react-reveal/Fade';

import theme from '../../components/Theme';
import Button from '../../components/Button';
import Dots from '../../components/Loaders/Dots';

import Request from '../../services/api-services';
import APIServiceError from '../../services/error-services';

import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';

import './auth.scss';

const API = new Request();

const VerifyEmail = () => {
  const history = useHistory();
  const [feedback, setFeedback] = useState(null);
  const [processing, setProcessing] = useState(false);

  interface FormValues {
    token: string;
  }
  const initialValues: FormValues = {
    token: '',
  };

  const validationSchema = Yup.object().shape({
    token: Yup.string().required('Provide provide a valid token'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setProcessing(true);
      await API.verifyEmail(values.token);
      setProcessing(false);
      history.push(`/dashboard/overview`);
    } catch (err) {
      if (err instanceof APIServiceError) {
        toast.error(`❗ ${err.response.data.message}`);
        setSubmitting(false);
        setProcessing(false);
        return;
      }
      toast.error(
        '❗ There has been an issue verifying your account, please check that your code is valid and try again',
      );
      setSubmitting(false);
      setProcessing(false);
    }
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
                  <Form className="form">
                    <p className="head_info">
                      Your verification code has been sent to your email, Please check your email and provide the code
                      here to enable us verify the email{' '}
                    </p>
                    <Fade bottom>
                      <div className="input-container">
                        <Field type="text" name="token" placeholder="Please put your token here" />
                        <ErrorMessage name="token" render={(msg) => <div className="error">{msg}</div>} />
                      </div>
                    </Fade>
                    {feedback && (
                      <div className="error_message" onClick={(): void => setFeedback(null)}>
                        {feedback}
                      </div>
                    )}
                    <div className="input-container btn_container">
                      <Fade bottom>
                        <Button disabled={isSubmitting || processing} colored>
                          {processing ? <Dots /> : 'Verify Email'}
                        </Button>
                      </Fade>
                      <p>
                        Did not receive an email? <Link to="/">Resend</Link>
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

export default VerifyEmail;
