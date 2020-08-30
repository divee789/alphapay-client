/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getClientWallet } from '../../../../store/actions';

import Modal from '../../../../components/Modal';
import FundForm from '../../components/FundForm';
import CheckoutForm from '../../components/CheckoutForm';
import TransferForm from '../../components/TransferForm';
import Button from '../../../../components/Button';

import Refresh from '../../../../assets/images/refresh.png';

import './index.scss';
import constants from '../../../../utils/constants';

const Overview = (props: { data: any[] }) => {
  const history = useHistory();
  const [showFundModal, setShowFundModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const { wallet, processing } = useSelector((state: { wallet }) => state.wallet);
  const { user } = useSelector((state: any) => state.auth);
  const { mode } = useSelector((state: { ui }) => state.ui);

  const dispatch = useDispatch();

  const styles = {
    background: mode === 'dark' ? constants.darkMode : '#fff',
    color: mode === 'dark' ? '#00C9B6' : '#000',
  };

  const renderGreeting = () => {
    const currentDate = new Date();
    const hrs = currentDate.getHours();

    if (hrs < 12) return '🌄 Good Morning';
    else if (hrs >= 12 && hrs <= 17) return '🌞 Good Afternoon';
    else if (hrs >= 17 && hrs <= 24) return '🌙 Good Evening';

    return '🌻 Good Day';
  };

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

  return (
    <section className="overview">
      <h1>
        {renderGreeting()}, {user?.first_name}!
      </h1>
      <div className="wallet_actions" style={styles}>
        <span
          className="wallet_refresh"
          onClick={() => {
            dispatch(getClientWallet());
          }}
        >
          <img src={Refresh} alt="refresh balance" />
        </span>
        <p>
          {processing
            ? 'Loading...'
            : wallet?.available_balance
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <span>AVAILABLE BALANCE (NGN)</span>
        <div className="btn_fund">
          <Button dashboard onClick={() => toggleModal('fund')} style={{ color: mode === 'dark' ? '#00C9B6' : '' }}>
            Fund Wallet
          </Button>
          <Button
            dashboard
            style={{ color: mode === 'dark' ? '#00C9B6' : '' }}
            onClick={() => toggleModal('checkout')}
            disabled={wallet?.available_balance <= 100 ? true : false}
          >
            Withdraw Funds
          </Button>
        </div>
      </div>

      <div className="overview_actions" style={styles}>
        <div>
          <Button dashboard style={{ color: mode === 'dark' ? '#00C9B6' : '' }} onClick={() => toggleModal('transfer')}>
            TRANSFER FUNDS
          </Button>
        </div>
        <div>
          <Button dashboard style={{ color: mode === 'dark' ? '#00C9B6' : '' }} onClick={() => toggleModal('transfer')}>
            PAY BILLS
          </Button>
        </div>
        <div>
          <Button
            dashboard
            style={{ color: mode === 'dark' ? '#00C9B6' : '' }}
            onClick={() => history.push('/dashboard/transactions')}
          >
            VIEW TRANSACTIONS
          </Button>
        </div>
        <div>
          <Button dashboard style={{ color: mode === 'dark' ? '#00C9B6' : '' }}>
            AUDIT LOGS
          </Button>
        </div>
      </div>

      {showFundModal && (
        <Modal open={showFundModal} closed={() => modalHandler('fund')}>
          <FundForm mode={mode} />
        </Modal>
      )}
      {showTransferModal && (
        <Modal open={showTransferModal} closed={() => modalHandler('transfer')}>
          <TransferForm mode={mode} />
        </Modal>
      )}
      {showCheckoutModal && (
        <Modal open={showCheckoutModal} closed={() => modalHandler('checkout')}>
          <CheckoutForm mode={mode} banks={props.data} />
        </Modal>
      )}
    </section>
  );
};

export default Overview;
