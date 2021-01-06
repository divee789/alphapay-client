/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Fade from 'react-reveal/Fade';
import { string, object } from 'yup';
import APIServiceError from '../../services/error-services';
import { twoFaVerify } from '../../store/actions';
import Button from '../../components/Button';
import theme from '../../components/Theme';
import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';
import './auth.scss';

const TwoFa = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);

  const [feedback, setFeedback] = useState(null);
  const [processing, setProcessing] = useState(false);

  interface FormValues {
    token: string;
  }

  const initialValues: FormValues = {
    token: '',
  };

  const twoFaValidationSchema = object().shape({
    token: string().required(),
  });

  const handleSubmit = async (values: FormValues, { setSubmitting }) => {
    try {
      setProcessing(true);
      await dispatch(
        twoFaVerify({
          email: query.get('email'),
          token: values.token,
        }),
      );
      history.push(`/dashboard/overview`);
    } catch (err) {
      setSubmitting(false);
      setProcessing(false);
      if (err instanceof APIServiceError) {
        toast.error(`❗ ${err.response.data.message}`);
        return;
      }
      toast.error(`❗ ${err.message}`);
    }
  };

  return (
    <>
      <section className="login_auth" style={theme()}>
        <div className="auth_form">
          <Formik initialValues={initialValues} validationSchema={twoFaValidationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={(): void => history.push('/')} />
                  </div>
                  <p className="head_info">Please provide your 2FA code from your authenticator app.</p>
                  <Form className="form">
                    <Fade bottom duration={1000} distance="50px">
                      <>
                        <div className="input-container">
                          <Field type="numeric" name="token" placeholder="Your auth code" />
                          <ErrorMessage
                            name="token"
                            render={(msg: string): JSX.Element => <div className="error">{msg}</div>}
                          />
                        </div>
                        <div className="error_message" onClick={(): void => setFeedback(null)}>
                          {feedback}
                        </div>
                        <div className="input-container btn_container">
                          <Button disabled={isSubmitting || processing} loading={processing}>
                            Verify Code
                          </Button>
                        </div>
                      </>
                    </Fade>
                  </Form>
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

export default TwoFa;
