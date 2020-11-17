/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../../../../store/actions';
import Request from '../../../../../services/api-services';

import Button from '../../../../../components/Button';
import './index.scss';

const API = new Request();

const Profile = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [uploadFeedBack, setUploadFeedBack] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { user, processing, update_error, message } = useSelector((state: { auth }) => state.auth);

  const initialValues = {
    email: user?.email || '',
    full_name: user?.full_name || '',
    phone_number: user?.phone_number || '',
  };
  const logValidationSchema = Yup.object().shape({
    full_name: Yup.string().required('Provide your full name please'),
    phone_number: Yup.number().min(11, 'Invalid phone_number').required('Provide your phone_number please'),
    email: Yup.string()
      .email('Hey,just letting you know that your email is quite weird')
      .required('Provide your email please'),
  });

  const fileChangedHandler = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const uploadHandler = async () => {
    try {
      if (!image) {
        alert('Please choose an image to upload');
        return;
      }
      setUploading(true);
      const formData = new FormData();
      formData.append('profile_image', image);
      const resData = await API.uploadProfileImage(formData);
      if (resData.error) {
        alert('Your session has expired, please log in again');
        return;
      }
      await dispatch(update(resData));
      setUploadFeedBack('Image Upload Successful');
    } catch (error) {
      setUploadFeedBack('Image Upload Failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(update(values));
    } catch (err) {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="profile-settings-section">
        <div className="profile_image_handler">
          <img
            src={user?.profile_image || 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'}
            alt="user_profile_image"
          />
          <div className="change_profile_image">
            <input type="file" onChange={fileChangedHandler} required />
            <Button dashboard onClick={uploadHandler} className="upload-btn">
              {uploading ? 'Please wait...' : 'Upload Image'}
            </Button>
            <p>{uploadFeedBack}</p>
          </div>
        </div>
        <div className="user_profile_details">
          <Formik
            initialValues={initialValues}
            validationSchema={logValidationSchema}
            onSubmit={handleSubmit}
            render={(formProps) => {
              return (
                <>
                  <Form>
                    <div className="input-container">
                      <div>
                        <span>First name</span>
                        <Field type="text" name="full_name" placeholder="John Doe" />
                        <ErrorMessage name="full_name" render={(msg) => <div className="error">{msg}</div>} />
                      </div>
                    </div>

                    <div className="input-container">
                      <span>Phone number</span>
                      <Field type="text" name="phone_number" placeholder="Phone number" />
                      <ErrorMessage name="phone_number" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container">
                      <span>Email</span>
                      <Field type="text" name="email" placeholder="Email" />
                      <ErrorMessage name="email" render={(msg) => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input-container btn_container">
                      <Button disabled={formProps.isSubmitting} dashboard>
                        {processing ? 'Please wait...' : 'Update details'}
                      </Button>
                    </div>
                    {
                      <p className="modal_error" style={{ textAlign: 'center' }}>
                        {message || update_error?.response.data.message}
                      </p>
                    }
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

export default Profile;
