import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { signup } from '../../store/actions';

import logo from '../../assets/images/alp.png'

import Button from '../../components/Button'

import './auth.scss';


const styles = {
    padding: '1rem',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '10px'
}

interface FormValues {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirmPassword: string;
    phone_number: number;
    level: string;
    department: string;
}


const SignUp: React.FC = (props: any) => {
    const [feedback, setFeedback] = useState(null)
    const { processing, error } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const initialValues: FormValues = {
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        level: '',
        department: '',
        phone_number: undefined
    }
    let text = 'CONTINUE';

    if (processing) text = 'Please wait...';

    const logvalidationSchema = Yup.object().shape({
        first_name: Yup.string().required('Provide your first name please'),
        last_name: Yup.string().required('Provide your last name please'),
        level: Yup.string().required('Provide your current level please'),
        department: Yup.string().required('Provide your department please'),
        phone_number: Yup.number()
            .min(11, 'Invalid phone_number')
            .required('Provide your phone_number please'),
        email: Yup.string().email('Hey,just letting you know that your email is quite weird').required('Provide your email please'),
        password: Yup.string()
            .min(9, 'Password must be 9 characters or longer')
            .required('Provide a password please')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
        confirmPassword: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        })
    });

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            console.log(values)
            await dispatch(signup(values))
            // return props.history.push(`/dashboard/overview`);
            return props.history.push(`/auth/verify_email`);
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
                                                <h2>Sign Up</h2>
                                                <p>Join the community,Sign up and move on to your dashboard</p>
                                                <div className="input-container-dual">
                                                    <div>
                                                        <Field type="text" name="first_name" placeholder="First name" />
                                                        <ErrorMessage name="first_name" render={msg => <div className="error">{msg}</div>} />
                                                    </div>
                                                    <div>
                                                        <Field type="text" name="last_name" placeholder="Last Name" />
                                                        <ErrorMessage name="last_name" render={msg => <div className="error">{msg}</div>} />
                                                    </div>
                                                </div>
                                                <div className="input-container-dual">
                                                    <div>
                                                        {/* <Field type="number" name="level" placeholder="Current Level" /> */}
                                                        <select
                                                            name="level"
                                                            onChange={formProps.handleChange}
                                                            value={formProps.values.level}
                                                        >
                                                            <option value="" label="Select your current level" />
                                                            <option value="400" label='400' />
                                                            <option value='300' label="300" />
                                                            <option value="200" label="200" />
                                                            <option value="100" label="100" />
                                                        </select>
                                                        <ErrorMessage name="level" render={msg => <div className="error">{msg}</div>} />
                                                    </div>
                                                    <div>
                                                        {/* <Field type="text" name="department" placeholder="Current Department" /> */}
                                                        <select
                                                            name="department"
                                                            value={formProps.values.department}
                                                            onChange={formProps.handleChange}
                                                        >
                                                            <option value="" label="Select your department" />
                                                            <option value='Pure mathematics' label="Pure mathematics" />
                                                            <option value="Applied Mathematics" label="Applied Mathematics" />
                                                            <option value="Pure and Applied" label="Pure and Applied" />


                                                        </select>
                                                        <ErrorMessage name="department" render={msg => <div className="error">{msg}</div>} />
                                                    </div>
                                                </div>
                                                <div className="input-container">
                                                    <Field type="text" name="phone_number" placeholder="Phone number" />
                                                    <ErrorMessage name="phone_number" render={msg => <div className="error">{msg}</div>} />
                                                </div>
                                                <div className="input-container">
                                                    <Field type="text" name="email" placeholder="Email" />
                                                    <ErrorMessage name="email" render={msg => <div className="error">{msg}</div>} />
                                                </div>
                                                <div className="input-container">
                                                    <Field type="password" name="password" placeholder="Password" />
                                                    <ErrorMessage name="password" render={msg => <div className="error">{msg}</div>} />
                                                </div>
                                                <div className="input-container">
                                                    <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                                                    <ErrorMessage name="confirmPassword" render={msg => <div className="error">{msg}</div>} />
                                                </div>
                                                <div className="input-container btn_container">
                                                    <Button disabled={formProps.isSubmitting} colored>{text}</Button>
                                                    <p>Already have an account?</p>
                                                    <p><Link to='/auth/login'>Click here to sign in</Link></p>
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

export default withRouter(SignUp);
