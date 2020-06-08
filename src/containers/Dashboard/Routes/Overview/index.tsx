import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_client_wallet } from '../../../../store/actions';

import Modal from '../../../../components/Modal';
import FundForm from '../../components/FundForm';
import CheckoutForm from '../../components/CheckoutForm';
import TransferForm from '../../components/TransferForm';
import Button from '../../../../components/Button';

// import image1 from '../../../../assets/images/transfer.png';
// import image2 from '../../../../assets/images/airtime.png';
// import image3 from '../../../../assets/images/pay-bills.png';
// import image4 from '../../../../assets/images/coffee.png';

import './index.scss';

const Overview = () => {
  const [showFundModal, setShowFundModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const { wallet, processing } = useSelector((state: any) => state.wallet);
  const { mode } = useSelector((state: any) => state.ui);

  const dispatch = useDispatch();

  let content: any;

  const modalHandler = (category: string) => {
    switch (category) {
      case 'fund':
        return setShowFundModal(false);
      case 'transfer':
        return setShowTransferModal(false);
      case 'checkout':
        return setShowCheckoutModal(false);
      default:
        return;
    }
  };
  const toggleModal = (form: string) => {
    switch (form) {
      case 'fund':
        return setShowFundModal(!showFundModal);
      case 'transfer':
        return setShowTransferModal(!showTransferModal);
      case 'checkout':
        return setShowCheckoutModal(!showCheckoutModal);
      default:
        return;
    }
  };

  if (processing === true) {
    content = <p className="info_alert">Getting your wallet..</p>;
  }
  if (wallet) {
    content = (
      <p
        onClick={() => {
          dispatch(get_client_wallet());
        }}
      >
        NGN{' '}
        {wallet.available_balance
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </p>
    );
  } else {
    content = <p style={{ textAlign: 'center', fontSize: '14px' }}>There has been an error fetching your wallet</p>;
  }

  return (
    <>
      <div className="overview_details">
        <div className="item">
          <div className="wallet_card">
            <p className="wallet_text">Wallet Balance</p>
            {content}
          </div>
          <div className="btn_fund">
            <Button
              dashboard
              onClick={() => {
                toggleModal('fund');
              }}
              style={{ color: mode === 'dark' ? '#00C9B6' : '' }}
            >
              Fund Wallet
            </Button>
            {wallet && wallet.available_balance <= 100 ? (
              <Button dashboard disabled>
                Withdraw Funds
              </Button>
            ) : (
              <Button
                dashboard
                style={{ color: mode === 'dark' ? '#00C9B6' : '' }}
                onClick={() => {
                  toggleModal('checkout');
                }}
              >
                Withdraw Funds
              </Button>
            )}
          </div>
        </div>

        <div className="funds_control item">
          <div
            className="option_card"
            onClick={() => {
              toggleModal('transfer');
            }}
            style={{ background: mode === 'dark' ? null : 'white' }}
          >
            {/* <img src={image1} alt="transfer" /> */}
            <p>Transfer Funds</p>
          </div>
          <div className="option_card" style={{ background: mode === 'dark' ? null : 'white' }}>
            {/* <img src={image2} alt="request" /> */}
            <p>Contact Support</p>
          </div>
          <div className="option_card" style={{ background: mode === 'dark' ? null : 'white' }}>
            {/* <img src={image3} alt="pay-bills" /> */}
            <p>Pay Bills</p>
          </div>
          <div className="option_card" style={{ background: mode === 'dark' ? null : 'white' }}>
            {/* <img src={image4} alt="buy airtime" /> */}
            <p>Buy Airtime</p>
          </div>
        </div>
      </div>
      {showFundModal && (
        <Modal open={showFundModal} closed={() => modalHandler('fund')}>
          <FundForm close={() => modalHandler('fund')} mode={mode} />
        </Modal>
      )}
      {showTransferModal && (
        <Modal open={showTransferModal} closed={() => modalHandler('transfer')}>
          <TransferForm close={() => modalHandler('transfer')} mode={mode} />
        </Modal>
      )}
      {showCheckoutModal && (
        <Modal open={showCheckoutModal} closed={() => modalHandler('checkout')}>
          <CheckoutForm close={() => modalHandler('checkout')} mode={mode} />
        </Modal>
      )}
    </>
  );
};

export default Overview;
