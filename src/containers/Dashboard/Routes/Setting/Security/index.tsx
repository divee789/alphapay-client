/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { toast } from 'react-hot-toast';
import { object, string } from 'yup';
import { RootState } from '../../../../../store';
import { setTransactionPin, getUser } from '../../../../../store/actions';
import APIServices from '../../../../../services/api-services';
import Button from '../../../../../components/Button';
import invisible from '../../../../../assets/images/invisible.svg';
import './index.scss';

const API = new APIServices();

const Security = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [twoFaImageUrl, setTwoFaImageUrl] = useState<string>(null);
  const [twoFaLoading, setTwoFaLoading] = useState(false);
  const [twoFaState, setTwoFaState] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState('');
  const [twoFaError, setTwoFaError] = useState('');
  const [emailProcessing, setEmailProcessing] = useState(null);
  const [pinLoading, setPinLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { wallet } = useSelector((state: RootState) => state.wallet);

  interface FormValues {
    password?: string;
    new_password?: string;
    transaction_pin?: string;
    type: string;
  }

  const initialValues: FormValues = {
    password: '',
    new_password: '',
    type: 'Password',
  };

  const passwordValidationSchema = object().shape({
    password: string().min(9, 'Password must be 9 characters or longer').required('Provide your old password please'),
    new_password: string()
      .min(9, 'Password must be 9 characters or longer')
      .required('Provide a password please')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  });

  const transactionValidationSchema = object().shape({
    transaction_pin: string().min(4, 'Your pin must be at least 4 digits').required('Provide a transaction pin please'),
  });

  const sendVerificationEmail = async (): Promise<void> => {
    try {
      setEmailProcessing(true);
      await API.sendEmail(user?.email);
      setEmailProcessing(false);
      history.push('/auth/verify_email');
    } catch (error) {
      toast.error('There has been an error verifying your email, please contact support');
      setEmailProcessing(false);
    }
  };

  const getImageUrl = async (): Promise<void> => {
    try {
      setTwoFaLoading(true);
      const res = await API.activateTwoFa();
      setTwoFaImageUrl(res.data.image_url);
      setTwoFaState(true);
      setTwoFaLoading(false);
    } catch (error) {
      setTwoFaLoading(false);
      toast.error('There has been an error, please try again or contact support');
    }
  };

  const verifyTwoFaCode = async (): Promise<void> => {
    try {
      if (twoFaCode === '') {
        setTwoFaError('Please provide a code');
        return;
      }
      setTwoFaLoading(true);
      await API.twoFaAuthorize({
        token: twoFaCode,
        email: user.email,
      });
      await dispatch(getUser());
      toast.success('TwoFA Authorization Enabled Successfully');
      setTwoFaLoading(false);
    } catch (error) {
      setTwoFaLoading(false);
      if (error.response) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  const deactivateTwoFa = async (): Promise<void> => {
    try {
      setTwoFaLoading(true);
      await API.deactivate2FA();
      await dispatch(getUser());
      toast.success('TwoFA Authorization Disabled Successfully');
      setTwoFaLoading(false);
    } catch (error) {
      setTwoFaLoading(false);
      toast.error('There has been an error, please try again or contact support');
    }
  };

  const handleSubmit = async (values: FormValues, { resetForm }): Promise<void> => {
    const type = values.type;
    try {
      switch (type) {
        case 'Password':
          delete values['type'];
          setPasswordLoading(true);
          await API.changePassword({
            new_password: values.new_password,
            password: values.password,
          });
          toast.success('Password updated successfully');
          setPasswordLoading(false);
          resetForm();
          break;
        case 'Transaction':
          delete values['type'];
          setPinLoading(true);
          await dispatch(setTransactionPin({ pin: values.transaction_pin.toString() }));
          toast.success('Pin updated successfully');
          setPinLoading(false);
          resetForm();
          break;
        default:
          break;
      }
    } catch (error) {
      switch (type) {
        case 'Password':
          setPasswordLoading(false);
          if (error.response?.status === 409) {
            toast.error('Your password is invalid');
          } else {
            toast.error(error.response?.data?.message);
          }
          break;
        case 'Transaction':
          setPinLoading(false);
          toast.error(error.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Fade bottom duration={1000} distance="50px">
      <section className="dashboard_security">
        <div className="password_security_change">
          <Formik initialValues={initialValues} validationSchema={passwordValidationSchema} onSubmit={handleSubmit}>
            {(): JSX.Element => {
              return (
                <>
                  <Form>
                    <div className="old_password_form">
                      <p>Change Password</p>
                      <Field type="password" name="password" placeholder="Old Password" />
                      <ErrorMessage
                        name="password"
                        render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                      />
                    </div>
                    <div className="new_password_form">
                      <img
                        src={invisible}
                        alt="show/hide"
                        className="password_icon"
                        onClick={(): void => {
                          setShowPassword(!showPassword);
                        }}
                      />
                      <Field type={showPassword ? 'text' : 'password'} name="new_password" placeholder="New Password" />
                      <ErrorMessage
                        name="new_password"
                        render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                      />
                    </div>
                    <div className="btn_cont">
                      <Button disabled={passwordLoading} loading={passwordLoading} type="submit">
                        Change Password
                      </Button>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>

        <div className="transaction_options">
          <Formik
            initialValues={{ transaction_pin: '', type: 'Transaction' }}
            validationSchema={transactionValidationSchema}
            onSubmit={handleSubmit}
          >
            {(): JSX.Element => {
              return (
                <>
                  <Form>
                    <div className="transaction_pin_form">
                      <p>Set Transaction Pin</p>
                      <Field type="number" name="transaction_pin" placeholder="1234" />
                      <ErrorMessage
                        name="transaction_pin"
                        render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                      />
                    </div>
                    <div className="btn_cont">
                      <Button disabled={pinLoading} loading={pinLoading}>
                        {`${wallet?.pin ? 'Change Pin' : 'Enable Pin'}`}
                      </Button>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>

        <div className="security-options">
          {!user?.email_verified && (
            <div className="two_fa">
              <p>
                We have placed limits on your account due to security reason. Please verify your email to remove those
                limits and have unrestricted access to our services
              </p>
              <Button
                onClick={(): Promise<void> => sendVerificationEmail()}
                disabled={emailProcessing}
                loading={emailProcessing}
              >
                Verify Email
              </Button>
            </div>
          )}
          {!user?.twofa_enabled && (
            <>
              {!twoFaState && (
                <div className="two_fa">
                  <p>
                    You are strongly advised to enable Two Factor Authorization in order to add an extra layer of
                    security to your account
                  </p>
                  <Button onClick={(): Promise<void> => getImageUrl()} loading={twoFaLoading} disabled={twoFaLoading}>
                    Activate Two Factor Authorization
                  </Button>
                </div>
              )}
              {twoFaState && (
                <div className="two_fa_verif">
                  <div className="two_fa_image">
                    <img src={twoFaImageUrl} alt="Two Factor QR Code" />
                  </div>
                  <div className="two_fa_form">
                    <p>Please scan the image with any appropriate authenticator app and provide the code given.</p>
                    <input type="text" onChange={(e): void => setTwoFaCode(e.target.value)} />
                    <p className="error">{twoFaError}</p>
                    <Button onClick={(): Promise<void> => verifyTwoFaCode()} loading={twoFaLoading}>
                      Submit Code
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
          {user?.twofa_enabled && (
            <div className="two_fa">
              <p>
                Deactivate 2FA on your account. You are strongly advised against this course of action, if you have any
                issues, it is better to contact our support team
              </p>
              <Button onClick={(): Promise<void> => deactivateTwoFa()} loading={twoFaLoading} disabled={twoFaLoading}>
                Disable Two Factor Authorization
              </Button>
            </div>
          )}
        </div>
      </section>
    </Fade>
  );
};

export default Security;
