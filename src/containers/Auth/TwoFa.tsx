import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import { twoFaVerify } from '../../store/actions';
import theme from '../../components/Theme';

import logo from '../../assets/images/alp.png';
import image1 from '../../assets/images/auth.jpg';

import Button from '../../components/Button';

import './auth.scss';
import APIServiceError from '../../services/error-services';

const TwoFa: React.FC = (props: any) => {
  const [feedback, setFeedback] = useState(null);
  const [processing, setProcessing] = useState(null);
  const dispatch = useDispatch();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  interface FormValues {
    email: string;
    token: string;
  }
  const initialValues: FormValues = {
    email: query.get('email'),
    token: '',
  };

  const twoFaValidationSchema = Yup.object().shape({
    token: Yup.string().required(),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any): Promise<void> => {
    try {
      setProcessing(true);
      await dispatch(twoFaVerify(values));
      props.history.push(`/dashboard/overview`);
    } catch (err) {
      if (err instanceof APIServiceError) {
        setFeedback(err.response.data.message);
        setSubmitting(false);
        setProcessing(false);
        return;
      }
      setFeedback(err.message);
      setTimeout(() => setFeedback(null), 3000);
      setSubmitting(false);
      setProcessing(false);
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
            validationSchema={twoFaValidationSchema}
            onSubmit={handleSubmit}
            render={(formProps) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={(): void => props.history.push('/')} />
                  </div>

                  <Form className="form">
                    <h2>Two Factor Auth</h2>
                    <p>Please provide your 2FA code from your authenticator app.</p>
                    <div className="input-container">
                      <Field type="numeric" name="token" placeholder="Your auth code" />
                      <ErrorMessage
                        name="token"
                        render={(msg: string): JSX.Element => <div className="error">{msg}</div>}
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

export default withRouter(TwoFa);
