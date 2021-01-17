/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Fade from 'react-reveal/Fade';
import { object, number, string } from 'yup';
import {
  checkoutUserWallet,
  getUserTransactions,
  transferFunds,
  transferToBeneficiary,
} from '../../../../../store/actions';
import BankAccountVerification from '../../../components/BankAccountVerification';
import AlphaAccountVerification from '../../../components/AlphaAccountVerification';
import Beneficiaries from '../../../components/Beneficiaries';
import Button from '../../../../../components/Button';
import { BankAccountDetails, AlphaAccountDetails, BeneficiaryDetails } from '../../../../../interfaces/business';
import './index.scss';
import { RootState } from '../../../../../store';

const Transfer = (): JSX.Element => {
  enum TransferType {
    BANK_ACCOUNT = 'bank_account',
    ALPHA = 'alpha',
    BENEFICIARY = 'beneficiary',
  }
  const initialValues = {
    amount: '',
    narration: '',
  };
  const dispatch = useDispatch();
  const [transferType, setTransferType] = useState<TransferType>(null);
  const [bankAccount, setBankAccount] = useState<BankAccountDetails>(null);
  const [alphaAccount, setAlphaAccount] = useState<AlphaAccountDetails>(null);
  const [beneficiary, setBeneficiary] = useState<BeneficiaryDetails>(null);
  const [transferLoading, setTransferLoading] = useState(false);
  const { wallet } = useSelector((state: RootState) => state.wallet);

  const transferValidationSchema = wallet
    ? object().shape({
        amount: number().required('Please provide an amount to send'),
        narration: string().required('Please state the reason for this transaction'),
        pin: wallet.pin ? number().required('Please provide your pin') : number(),
      })
    : null;

  const sendMoney = async (values, helpers): Promise<void> => {
    try {
      setTransferLoading(true);
      switch (transferType) {
        case TransferType.BANK_ACCOUNT:
          await dispatch(
            checkoutUserWallet({
              amount: values.amount,
              bank_code: bankAccount.bank_code,
              bank_account: bankAccount.account_number,
              bank_name: bankAccount.bank_name,
              account_name: bankAccount.account_name || 'NOT AVAILABLE',
              pin: values.pin,
              narration: values.narration,
            }),
          );
          setBankAccount(null);
          break;
        case TransferType.ALPHA:
          await dispatch(
            transferFunds({
              amount: values.amount,
              narration: values.narration,
              recipient_phone_number: alphaAccount.phone_number,
              pin: values.pin,
            }),
          );
          setAlphaAccount(null);
          break;
        case TransferType.BENEFICIARY:
          await dispatch(
            transferToBeneficiary({
              amount: values.amount,
              narration: values.narration,
              pin: values.pin,
              beneficiaryId: beneficiary.id,
            }),
          );
          break;
        default:
          break;
      }
      await dispatch(getUserTransactions());
      setTransferLoading(false);
      toast.success('Transaction Successful');
      setTransferType(null);
      helpers.resetForm(initialValues);
    } catch (error) {
      toast.error(error.message);
      setTransferLoading(false);
    }
  };

  return (
    <Fade bottom duration={1000} distance="50px">
      <section className="send_money_section">
        <Formik
          initialValues={initialValues}
          validationSchema={transferValidationSchema}
          onSubmit={(values, { resetForm }): Promise<void> => sendMoney(values, { resetForm })}
        >
          {(formProps): JSX.Element => {
            return (
              <>
                <Form>
                  <div className="send_money_input_container">
                    <label>HOW MUCH DO YOU WANT TO SEND? (NGN)</label>
                    <div className="send_money_input_amount">
                      <Field type="number" name="amount" placeholder="0" className="amount_input" />
                    </div>
                    <ErrorMessage
                      name="amount"
                      render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                    />
                  </div>
                  {!transferType && (
                    <Fade top duration={500} distance="10px">
                      <section className="send_money_choice_btn">
                        <Button dashboard onClick={(): void => setTransferType(TransferType.BENEFICIARY)}>
                          Send To Beneficiary
                        </Button>
                        <Button dashboard onClick={(): void => setTransferType(TransferType.BANK_ACCOUNT)}>
                          Send To Bank Account
                        </Button>
                        <Button dashboard onClick={(): void => setTransferType(TransferType.ALPHA)}>
                          Send To An Alpha
                        </Button>
                      </section>
                    </Fade>
                  )}
                  {transferType === TransferType.BENEFICIARY && (
                    <Fade top duration={500} distance="10px">
                      <Beneficiaries
                        setBeneficiary={(data: BeneficiaryDetails): void => setBeneficiary(data)}
                        closeComponent={(): void => setTransferType(null)}
                      />
                    </Fade>
                  )}
                  {transferType === TransferType.BANK_ACCOUNT && (
                    <Fade top duration={500} distance="10px">
                      <BankAccountVerification
                        setBankAccount={(data: BankAccountDetails): void => setBankAccount(data)}
                        closeComponent={(): void => setTransferType(null)}
                      />
                    </Fade>
                  )}
                  {transferType === TransferType.ALPHA && (
                    <Fade top duration={500} distance="10px">
                      <AlphaAccountVerification
                        setAlphaAccount={(data: AlphaAccountDetails): void => setAlphaAccount(data)}
                        closeComponent={(): void => setTransferType(null)}
                      />
                    </Fade>
                  )}
                  {bankAccount && transferType === TransferType.BANK_ACCOUNT && (
                    <div className="send_money_bank_account_details">
                      <p>
                        ACCOUNT NAME: <span>{bankAccount.account_name?.toUpperCase()}</span>
                      </p>
                      <p>
                        ACCOUNT NUMBER: <span>{bankAccount.account_number}</span>
                      </p>
                      <p>
                        DESTINATION: <span>{bankAccount.bank_name?.toUpperCase()}</span>
                      </p>
                    </div>
                  )}
                  {beneficiary && transferType === TransferType.BENEFICIARY && (
                    <div className="send_money_bank_account_details">
                      <p>
                        ACCOUNT NAME: <span>{beneficiary.account_name?.toUpperCase()}</span>
                      </p>
                      <p>
                        ACCOUNT NUMBER: <span>{beneficiary.account_number}</span>
                      </p>
                      <p>
                        DESTINATION: <span>{beneficiary.account_provider?.toUpperCase()}</span>
                      </p>
                    </div>
                  )}
                  {alphaAccount && transferType === TransferType.ALPHA && (
                    <div className="send_money_alpha_account_details">
                      <div className="image_container">
                        <img
                          src={
                            alphaAccount.profile_image ||
                            'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'
                          }
                          alt="profile"
                        />
                      </div>
                      <div className="info_container">
                        <p>PHONE NUMBER: {alphaAccount.phone_number}</p>
                        <p>FULL NAME: {alphaAccount.full_name}</p>
                        <p>USERNAME: {alphaAccount.username}</p>
                      </div>
                    </div>
                  )}
                  <div className="send_money_input_container">
                    <div className="con">
                      <label>WHY ARE YOU TRANSFERRING ?</label>
                      <Field type="text" name="narration" component="textarea" rows="3" placeholder="Your reason" />
                    </div>
                    <ErrorMessage
                      name="narration"
                      render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                    />
                  </div>
                  {wallet?.pin && (
                    <div className="send_money_input_container">
                      <div className="con">
                        <label>PLEASE PROVIDE YOUR PIN</label>
                        <Field type="number" name="pin" placeholder="Your pin" />
                      </div>
                      <ErrorMessage
                        name="pin"
                        render={(msg): JSX.Element => <div className="error modal_error">{msg}</div>}
                      />
                    </div>
                  )}
                  <Button
                    disabled={formProps.isSubmitting || (!bankAccount && !alphaAccount && !beneficiary)}
                    loading={transferLoading}
                    type="submit"
                  >
                    Send Money
                  </Button>
                </Form>
              </>
            );
          }}
        </Formik>
      </section>
    </Fade>
  );
};

export default Transfer;
