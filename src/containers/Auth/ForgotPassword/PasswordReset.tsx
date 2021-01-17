/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import theme from '../../../components/Theme';
import APIServices from '../../../services/api-services';
import logo from '../../../assets/images/alp.png';
import image1 from '../../../assets/images/auth.jpg';
import { User } from '../../../store/types';
import '../auth.scss';

const API = new APIServices();

const PasswordReset = () => {
  const history = useHistory();
  const { token }: any = useParams();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const call = async () => {
      try {
        const res = await API.confirmPasswordReset(token);
        setUser(res.data.user);
      } catch (error) {
        toast.error('There has been an issue verifying your identity,please contact support');
      }
    };

    call();
  }, [token]);

  interface FormValues {
    password: string;
  }
  const initialValues: FormValues = {
    password: '',
  };

  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be 8 characters or longer')
      .required('Provide a password please')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    toast.promise(API.passwordResetEmail({ ...values, email: user.email }) as any, {
      success: (data: any) => {
        return data.message;
      },
      error: (err) => {
        setSubmitting(false);
        return `${err.response.data.message}`;
      },
      loading: 'Resetting your password...',
    });
  };

  return (
    <>
      <section className="login_auth" style={theme()}>
        <div className="auth_form">
          <Formik initialValues={initialValues} validationSchema={passwordValidationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => {
              return (
                <>
                  <div className="logo">
                    <img src={logo} alt="logo" onClick={() => history.push('/')} />
                  </div>
                  {user && (
                    <>
                      <p className="head_info">Hello {user.username},please provide a new password for your account</p>
                      <Form className="form">
                        <Fade bottom duration={1000} distance="50px">
                          <>
                            <div className="input-container">
                              <Field type="password" name="password" placeholder="Password" className="password" />
                              <ErrorMessage name="password" render={(msg) => <div className="error">{msg}</div>} />
                            </div>
                            <div className="input-container btn_container">
                              <Button disabled={isSubmitting}>Change Password</Button>
                            </div>
                          </>
                        </Fade>
                      </Form>
                    </>
                  )}
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

export default PasswordReset;
