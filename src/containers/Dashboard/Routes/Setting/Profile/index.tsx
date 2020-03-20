import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../../../../store/actions'
import Request from '../../../../../services/api-services'

import Button from '../../../../../components/Button'
import './index.scss'


const api = new Request(process.env.SERVER_URL)


const Profile = (props: any) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const [feedBack, setFeedBack] = useState(false)
    const [uploadFeedBack, setUploadFeedBack] = useState(false)

    const { user, processing, update_error, message } = useSelector((state: any) => state.auth)
    const initialValues = {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number
    }
    const logvalidationSchema = Yup.object().shape({
        first_name: Yup.string().required('Provide your first name please'),
        last_name: Yup.string().required('Provide your last name please'),
        phone_number: Yup.number()
            .min(11, 'Invalid phone_number')
            .required('Provide your phone_number please'),
        email: Yup.string().email('Hey,just letting you know that your email is quite weird').required('Provide your email please'),
    });

    const fileChangedHandler = (event) => {
        const file = event.target.files[0]
        setImage(file)
    }
    const uploadHandler = async () => {
        try {
            if (!image) {
                alert('Please choose an image to upload')
            }
            const formData = new FormData()
            formData.append('profile_image', image)
            setUploadFeedBack(true)
            let resData = await api.uploadProfileImage(formData)
            console.log('resData', resData)
            dispatch(update(resData))
            setUploadFeedBack(false)
        } catch (error) {
            setUploadFeedBack(false)
        }
    }

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            console.log(values)
            await dispatch(update(values))
            setFeedBack(message)
        } catch (err) {
            console.log('log err', err);
            console.log(err.message);
            setFeedBack(update_error.response.data.message)
            setSubmitting(false);
        }
    }

    return (
        <>
            <section className='profile-settings-section'>
                <div className="profile_image_handler">
                    <img src={user.profile_image ? user.profile_image : 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'} alt='user_profile_image' />
                    <div className="change_profile_image">
                        <input type="file" onChange={fileChangedHandler} required />
                        <Button colored onClick={uploadHandler} className='upload-btn'>{uploadFeedBack ? 'Please wait...' : 'Upload Image'}</Button>
                    </div>
                </div>
                <div className="user_profile_details">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={logvalidationSchema}
                        onSubmit={handleSubmit}
                        render={formProps => {
                            return (
                                <>
                                    {/* {update_error && <p>{update_error.response.data.message}</p>} */}
                                    {feedBack && <p>{feedBack}</p>}
                                    <Form>
                                        <div className="input-container-dual">
                                            <div>
                                                <span>First name</span>
                                                <Field type="text" name="first_name" placeholder="First Name" />
                                                <ErrorMessage name="first_name" render={msg => <div className="error">{msg}</div>} />
                                            </div>
                                            <div>
                                                <span>Last Name</span>
                                                <Field type="text" name="last_name" placeholder="Last Name" />
                                                <ErrorMessage name="last_name" render={msg => <div className="error">{msg}</div>} />
                                            </div>

                                        </div>

                                        <div className="input-container">
                                            <span>Phone number</span>
                                            <Field type="text" name="phone_number" placeholder="Phone number" />
                                            <ErrorMessage name="phone_number" render={msg => <div className="error">{msg}</div>} />
                                        </div>
                                        <div className="input-container">
                                            <span>Email</span>
                                            <Field type="text" name="email" placeholder="Email" />
                                            <ErrorMessage name="email" render={msg => <div className="error">{msg}</div>} />
                                        </div>
                                        <div className="input-container btn_container">
                                            <Button disabled={formProps.isSubmitting} colored>{processing ? 'Please wait...' : 'Update details'}</Button>
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


export default Profile