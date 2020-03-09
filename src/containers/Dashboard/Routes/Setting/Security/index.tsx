import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import Button from '../../../../../components/Button'



const Security = () => {

    const [feedback, setFeedback] = useState(null)
    const { processing, error } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const initialValues = {
        old_password: undefined,
        new_password: undefined
    }

    const passwordValidationSchema = Yup.object().shape({
        new_password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Provide your new password please'),
        old_password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Provide your old password please')
    })

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            console.log(values)
        } catch (error) {
            console.log('password error', error)
        }
    }

    return (
        <>
            <section>
                <div className="password_security_change">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={passwordValidationSchema}
                        onSubmit={handleSubmit}
                        render={formProps => {
                            return (
                                <>
                                    <Form>
                                        <h3>Change Password</h3>
                                        <div className="old_password_form">
                                            <Field
                                                type='password'
                                                name='old_password'
                                                placeholder='Old Password'
                                            />
                                            <ErrorMessage name="old_password" render={msg => <div className="error">{msg}</div>} />
                                        </div>
                                        <div className="new_password_form">
                                            <Field
                                                type='password'
                                                name='new_password'
                                                placeholder='New Password'
                                            />
                                            <ErrorMessage name="new_password" render={msg => <div className="error">{msg}</div>} />
                                        </div>
                                        <div className="btn_cont">
                                            <Button disabled={formProps.isSubmitting} colored>{processing ? 'please wait...' : 'UPDATE PASSWORD'}</Button>
                                        </div>
                                    </Form>
                                </>
                            )
                        }}
                    />
                    <div>
                        <p>You are strongly advised to enable 2 factor authentication in order to add an extra layer of security to your account</p>
                        <Button colored>Enable 2 factor authentication</Button>
                    </div>
                </div>


                <div className="transaction_options">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={passwordValidationSchema}
                        onSubmit={handleSubmit}
                        render={formProps => {
                            return (
                                <>
                                    <Form>
                                        <h3>Activate Transaction Pin</h3>
                                        <div className="transaction_pin_form">
                                            <Field
                                                type='text'
                                                name='transaction_pin'
                                                placeholder='1234'
                                            />
                                            <ErrorMessage name="transaction_pin" render={msg => <div className="error">{msg}</div>} />
                                        </div>
                                        <div className="btn_cont">
                                            <Button disabled={formProps.isSubmitting} colored>{processing ? 'please wait...' : 'ENABLE PIN'}</Button>
                                        </div>
                                    </Form>
                                </>
                            )
                        }}
                    />
                </div>
            </section>
        </>
    )
}

export default Security