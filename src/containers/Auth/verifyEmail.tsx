import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';
import theme from '../../components/Theme';
import { getUser } from '../../store/actions/auth';

import Request from '../../services/api-services';

import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';

import Button from '../../components/Button';

import './auth.scss';

const api = new Request();

const styles = {
  padding: '1rem',
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '10px',
};

const VerifyEmail: React.FC = (props: any) => {
  const [feedback, setFeedback] = useState(null);
  const { processing } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  interface FormValues {
    token: string;
  }
  const initialValues: FormValues = {
    token: '',
  };

  const validationSchema = Yup.object().shape({
    token: Yup.string().required('Provide provide a valid tokens'),
  });

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      await api.verifyEmail(values.token);
      await dispatch(getUser());
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
            validationSchema={validationSchema}
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
                    <p>
                      Your verification token has been sent to your email,please check your email and provide the token
                      here to enable us verify the email{' '}
                    </p>
                    <div className="input-container">
                      <Field type="text" name="token" placeholder="Please put your token here" />
                      <ErrorMessage name="token" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container btn_container">
                      {/* <button disabled={formProps.isSubmitting}>{text}</button> */}
                      <Button disabled={formProps.isSubmitting} colored>
                        {processing ? 'Please wait...' : 'CONTINUE'}
                      </Button>
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
      </section>
    </>
  );
};

export default withRouter(VerifyEmail);
