import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';

import Request from '../../../services/api-services'


import logo from '../../../assets/images/alp.png'

import Button from '../../../components/Button'

// import './auth.scss';

const api = new Request(process.env.BASE_URL)

const styles = {
    padding: '1rem',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '10px'
}


const ForgotPassword: React.FC = (props: any) => {

    const [processing, setProcessing] = useState(false)
    const [feedback, setFeedback] = useState(null)

    interface FormValues {
        email: string
    }
    const initialValues: FormValues = {
        email: ''
    }

    let text = 'CONTINUE';
    if (processing) text = 'Please wait...';



    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            setProcessing(true)
            const res = await api.passwordReset(values.email)
            setFeedback(res.message)
            setProcessing(false)
        } catch (err) {
            console.log('log err', err);
            setFeedback(err.response.data.message)
            setTimeout(() => setFeedback(null), 3000)
            setProcessing(false)
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
                                onSubmit={handleSubmit}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string().email('Provide a valid email please')
                                        .required('Provide your email please')
                                })
                                }
                                render={formProps => {
                                    return (
                                        <>
                                            {feedback && <p style={styles} className='error_message' onClick={() => setFeedback(null)}>{feedback}</p>}
                                            <Form className="form">
                                                <h2>Forgot your Password?</h2>
                                                <p>Please provide your email.and we will send a password reset link to you</p>
                                                <div className="input-container">
                                                    <Field type="text" name="email" placeholder="Your email" />
                                                    <ErrorMessage name="email" render={msg => <div className="error">{msg}</div>} />
                                                </div>
                                                <div className="input-container btn_container">
                                                    {/* <button disabled={formProps.isSubmitting}>{text}</button> */}
                                                    <Button disabled={formProps.isSubmitting} colored>{text}</Button>
                                                    <p>Did not receive an email? <Link to='/'>Resend Email</Link></p>
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

export default withRouter(ForgotPassword);
