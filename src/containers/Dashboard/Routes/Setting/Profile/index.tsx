/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { toast } from 'react-toastify';
import { getUser, updateUser } from '../../../../../store/actions';
import APIServices from '../../../../../services/api-services';
import { RootState } from '../../../../../store';
import Button from '../../../../../components/Button';
import './index.scss';

const API = new APIServices();

const Profile = (): JSX.Element => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<File>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);

  const initialValues = {
    email: user?.email,
    full_name: user?.full_name,
    phone_number: user?.phone_number,
    username: user?.username,
  };

  const validationSchema = object().shape({
    full_name: string().trim().required('Provide your full name please'),
    username: string().trim().required('Provide a username please'),
  });

  const fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files[0];
    setImage(file);
  };

  const uploadHandler = async (): Promise<void> => {
    try {
      if (!image) {
        alert('Please choose an image to upload');
        return;
      }
      setUploading(true);
      const formData = new FormData();
      formData.append('profile_image', image);
      await API.uploadProfileImage(formData);
      await dispatch(getUser());
      toast.success('Image Upload Successful');
    } catch (error) {
      toast.error('Image Upload Failed');
    }
    setUploading(false);
  };

  const handleSubmit = async ({ username, full_name }): Promise<void> => {
    try {
      setLoading(true);
      await dispatch(
        updateUser({
          username,
          full_name,
        }),
      );
      setLoading(false);
      toast.success('Update Successful');
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return user ? (
    <Fade bottom duration={1000} distance="50px">
      <section className="profile-settings-section">
        <div className="profile_image_handler">
          <label htmlFor="file-input">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="user_profile_image" />
            ) : (
              <img
                src={user.profile_image || 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'}
                alt="user_profile_image"
              />
            )}
          </label>
          <input type="file" id="file-input" onChange={(e): void => fileChangedHandler(e)} required />
          <Button
            onClick={(): Promise<void> => uploadHandler()}
            className="upload-btn"
            loading={uploading}
            disabled={!image || uploading}
          >
            Save
          </Button>
        </div>
        <div className="user_profile_details">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(): JSX.Element => {
              return (
                <>
                  <Form>
                    <div className="input_container">
                      <label>Full Name</label>
                      <Field type="text" name="full_name" placeholder="John Doe" />
                      <ErrorMessage
                        name="full_name"
                        render={(msg): JSX.Element => <div className="error">{msg}</div>}
                      />
                    </div>
                    <div className="input_container">
                      <label>Username</label>
                      <Field type="text" name="username" placeholder="Doe" />
                      <ErrorMessage name="username" render={(msg): JSX.Element => <div className="error">{msg}</div>} />
                    </div>
                    <div className="input_container">
                      <label>Phone number</label>
                      <Field type="text" name="phone_number" placeholder="Phone Number" disabled />
                    </div>
                    <div className="input_container">
                      <label>Email</label>
                      <Field type="text" name="email" placeholder="Email" disabled />
                    </div>
                    <Button disabled={loading} loading={loading}>
                      Update Info
                    </Button>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </section>
    </Fade>
  ) : null;
};

export default Profile;
