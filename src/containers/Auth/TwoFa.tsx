/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Fade from 'react-reveal/Fade';
import { string, object } from 'yup';
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
    toast.promise(
      dispatch(
        twoFaVerify({
          email: query.get('email'),
          token: values.token,
        }),
      ) as any,
      {
        success: () => {
          history.push(`/dashboard/overview`);
          return 'Login Successful';
        },
        error: (err) => {
          setSubmitting(false);
          return `${err.response?.data?.message || err.message}`;
        },
        loading: 'Verifying code..',
      },
    );
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
                        <div className="input-container btn_container">
                          <Button disabled={isSubmitting}>Verify Code</Button>
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
