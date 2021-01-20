/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import APIService from '../../../../services/api-services';
import CircleLoader from '../../../../components/Loaders/Circle';
import { AlphaAccountDetails } from '../../../../interfaces/business';
import './index.scss';

interface AlphaAccountVerificationProps {
  setAlphaAccount: (data: AlphaAccountDetails) => void;
  closeComponent?: () => void;
}

const AlphaAccountVerification = (props: AlphaAccountVerificationProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string>(null);

  const API = new APIService();

  const verifyPhoneNumber = async (): Promise<void> => {
    try {
      if (phoneNumber === '') {
        setError('Please provide a phone number');
        return;
      }
      const isNumber = /^\d+$/.test(phoneNumber);
      if (!isNumber) {
        setError('Please provide a valid phone number');
        return;
      }
      setLoading(true);
      const validatedAccountResponse = await API.verifyRecipientAccount(phoneNumber);
      const response = validatedAccountResponse.data.user;
      const validatedAccount = {
        id: response.id,
        phone_number: phoneNumber,
        full_name: response.full_name,
        username: response.username,
        profile_image: response.profile_image,
      };
      setLoading(false);
      return props.setAlphaAccount(validatedAccount);
    } catch (error) {
      toast.error('The provided details could not be verified, please make sure they are valid and try again');
      setLoading(false);
    }
  };

  return (
    <>
      <section className="alpha_account_verification_section">
        <div>
          <div className="alpha_account_verification_input_container">
            <label>PLEASE PROVIDE THE ALPHA PHONE NUMBER</label>
            <input
              type="text"
              name="phone_number"
              placeholder="09010000001"
              onChange={(e): void => setPhoneNumber(e.target.value)}
              onBlur={(): Promise<void> => verifyPhoneNumber()}
            />
            <p className="error modal_error">{error}</p>
          </div>
          {loading && <CircleLoader />}
        </div>
      </section>
    </>
  );
};

export default AlphaAccountVerification;
