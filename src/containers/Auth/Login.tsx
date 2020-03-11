import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../store/actions';

import logo from '../../assets/images/alp.png'

import Button from '../../components/Button'

import './auth.scss';

const styles = {
    padding: '1rem',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '10px'
}


const LogIn: React.FC = (props: any) => {
    const [feedback, setFeedback] = useState(null)
    const { processing, error } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    interface FormValues {
        email: string;
        password: string;
    }
    const initialValues: FormValues = {
        email: '',
        password: ''
    }

    let text = 'CONTINUE';
    if (processing) text = 'Please wait...';
    if (error) {

    }
    const logvalidationSchema = Yup.object().shape({
        email: Yup.string().email('Provide a valid email please')
            .required('Provide email please'),
        password: Yup.string()
            .min(9, 'Password must be 9 characters or longer')
            .required('Provide a password please')
    });

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            console.log(values)
            await dispatch(login(values))
            props.history.push(`/dashboard/overview`);
        } catch (err) {
            console.log('log err', err);
            setFeedback(err.message)
            setTimeout(() => setFeedback(null), 3000)
            setSubmitting(false);
        }
    };

    return (
        <>
            <section className='login_auth'>
                <div className="logo">
                    <img src={logo} alt="logo" onClick={() => props.history.push('/')} />
                </div>
                <div className='page_content'>
                    <div className='page_content_container'>
                        <div className='page_content_container2'>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={logvalidationSchema}
                                onSubmit={handleSubmit}
                                render={formProps => {
                                    return (
                                        <>
                                            {feedback && <p style={styles} className='error_message' onClick={() => setFeedback(null)}>{feedback}</p>}
                                            <Form className="form">
                                                <h2>Log In</h2>
                                                <p>Welcome back,please log in to your account to access your dashboard</p>
                                                <div className="input-container">
                                                    <Field type="text" name="email" placeholder="example@gmail.com" />
                                                    <ErrorMessage name="email" render={msg => <div className="error">{msg}</div>} />
                                                </div>
                                                <div className="input-container">
                                                    <Field type="password" name="password" placeholder="Password" className='password' />
                                                    <ErrorMessage name="password" render={msg => <div className="error">{msg}</div>} />
                                                </div>
                                                <div className="input-container btn_container">
                                                    {/* <button disabled={formProps.isSubmitting}>{text}</button> */}
                                                    <Button disabled={formProps.isSubmitting} colored>{text}</Button>
                                                    <p>Can't remember your password? <Link to='/password_reset_request'>Reset</Link></p>
                                                    <p>Don't have an account? <Link to="/auth/signup">Click here to register</Link></p>
                                                </div>
                                            </Form>
                                        </>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default withRouter(LogIn);
