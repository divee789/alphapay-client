import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import theme from '../../../components/Theme'

import * as Yup from 'yup';


import Request from '../../../services/api-services'


import logo from '../../../assets/images/alp.png'

import Button from '../../../components/Button'

const api = new Request('http://localhost:1000')

const styles = {
    padding: '1rem',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '10px'
}


const PasswordReset: React.FC = (props: any) => {
    const [user, setUser] = useState(null)
    const [feedback, setFeedback] = useState(null)
    const [loading, setLoading] = useState(true)

    const token = props.match.params.token

    useEffect(() => {
        const call = async () => {
            try {
                const res = await api.confirmPasswordReset(token)
                setUser(res.client)
                setLoading(false)
            } catch (error) {
                setFeedback('There has been an issue verifying your identity,please contact support')
                console.log(error)
                setLoading(false)
            }
        }

        call()

    }, [token])



    interface FormValues {
        password: string;
    }
    const initialValues: FormValues = {
        password: ''
    }

    let text = 'CONTINUE';
    if (loading) text = 'Please wait...';

    const passwordvalidationSchema = Yup.object().shape({

        password: Yup.string()
            .min(9, 'Password must be 9 characters or longer')
            .required('Provide a password please')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            )
    });

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            console.log(values)
            const res = await api.passwordResetEmail({ ...values, email: user.email })
            setFeedback(res.message)
        } catch (err) {
            console.log('log err', err);
            setFeedback(err.response.data.message)
            setTimeout(() => setFeedback(null), 3000)
            setSubmitting(false);
        }
    };

    return (
        <>
            <section className='login_auth' style={theme()}>
                <div className="logo">
                    <img src={logo} alt="logo" onClick={() => props.history.push('/')} />
                </div>
                <div className='page_content'>
                    <div className='page_content_container'>
                        <div className='page_content_container2'>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={passwordvalidationSchema}
                                onSubmit={handleSubmit}
                                render={formProps => {
                                    return (
                                        <>
                                            {feedback && <p style={styles} className='error_message' onClick={() => setFeedback(null)}>{feedback}</p>}
                                            <Form className="form">
                                                <h2>Password Reset</h2>
                                                <p>Hello {user && user.first_name},please provide a new password for your account</p>
                                                <div className="input-container">
                                                    <Field type="password" name="password" placeholder="Password" className='password' />
                                                    <ErrorMessage name="password" render={msg => <div className="error">{msg}</div>} />
                                                </div>
                                                <div className="input-container btn_container">
                                                    {/* <button disabled={formProps.isSubmitting}>{text}</button> */}
                                                    <Button disabled={formProps.isSubmitting} colored>{text}</Button>

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

export default withRouter(PasswordReset);
