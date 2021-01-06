import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import { BeneficiaryDetails } from '../../../../interfaces/business';
import { RootState } from '../../../../store';
import './index.scss';

interface BeneficiariesProps {
  setBeneficiary: (data: BeneficiaryDetails) => void;
  closeComponent: () => void;
}

const Beneficiaries = (props: BeneficiariesProps): JSX.Element => {
  const { beneficiaries } = useSelector((state: RootState) => state.beneficiary);
  const [done, setDone] = useState(false);

  return (
    <>
      <section className="beneficiary_verification_section">
        {!done && (
          <Button dashboard onClick={(): void => props.closeComponent()} style={{ width: '50%' }}>
            Cancel
          </Button>
        )}
        {beneficiaries.length > 0 ? (
          beneficiaries.map((beneficiary) => {
            return (
              <div
                key={beneficiary.id}
                onClick={(): void => {
                  props.setBeneficiary(beneficiary);
                  setDone(true);
                }}
              >
                <p>
                  <span>NAME:</span> {beneficiary.account_name}
                </p>
                <p>
                  <span>ACCOUNT NUMBER:</span> {beneficiary.account_number}
                </p>
                <p>
                  <span>ACCOUNT DESTINATION:</span> {beneficiary.account_provider}
                </p>
              </div>
            );
          })
        ) : (
          <div>
            <p>You have no beneficiaries yet.</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Beneficiaries;
