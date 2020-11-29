import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';

import { getUserWallet } from '../../../../store/actions';

import Modal from '../../../../components/Modal';
import FundForm from '../../components/FundForm';
import CheckoutForm from '../../components/CheckoutForm';
import TransferForm from '../../components/TransferForm';

import Button from '../../../../components/Button';
import Dots from '../../../../components/Loaders/Dots';

import Refresh from '../../../../assets/images/refresh.png';

import './index.scss';

const Overview = (props: { data: any[] }): JSX.Element => {
  const [showFundModal, setShowFundModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const { wallet, processing } = useSelector((state: { wallet }) => state.wallet);
  const { transactions } = useSelector((state: { transaction }) => state.transaction);

  const dispatch = useDispatch();

  const styles = {
    background: '#fff',
    color: '#000',
  };

  const modalHandler = (category: 'fund' | 'transfer' | 'checkout'): void => {
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
  const toggleModal = (form: 'fund' | 'transfer' | 'checkout'): void => {
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

  const formatMessage = (
    type: string,
  ): {
    messageType: string;
    source: string;
  } => {
    let messageType;
    let source;
    if (type === 'incoming') {
      messageType = 'credited';
      source = 'sender';
    } else {
      messageType = 'debited';
      source = 'recipient';
    }
    return { messageType, source };
  };

  return (
    <>
      <section className="overview">
        <div className="actions">
          <Fade top duration={200} distance="10px">
            <div className="wallet_actions">
              <span
                className="wallet_refresh"
                onClick={(): void => {
                  dispatch(getUserWallet());
                }}
              >
                <img src={Refresh} alt="refresh balance" />
              </span>
              <p>
                {processing ? (
                  <Dots color="black" width={1} height={1} />
                ) : (
                  wallet?.available_balance
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                )}
              </p>
              <span>AVAILABLE BALANCE (NGN)</span>
            </div>
          </Fade>

          <div className="overview_actions" style={styles}>
            <div>
              <Button dashboard onClick={(): void => toggleModal('fund')}>
                FUND WALLET
              </Button>
            </div>
            <div>
              <Button
                dashboard
                onClick={(): void => toggleModal('checkout')}
                disabled={wallet?.available_balance <= 100 ? true : false}
              >
                WITHDRAW FUNDS
              </Button>
            </div>
            <div>
              <Button dashboard onClick={(): void => toggleModal('transfer')}>
                TRANSFER FUNDS
              </Button>
            </div>
            <div>
              <Button dashboard onClick={(): void => toggleModal('transfer')}>
                PAY BILLS
              </Button>
            </div>
          </div>
        </div>
        <div className="wallet_history">
          <h3>WALLET HISTORY</h3>
          <hr />
          <div className="wallet_history_content">
            {transactions?.length > 0 &&
              transactions.map((data) => {
                return (
                  <div key={data.id}>
                    Your wallet was {formatMessage(data.type).messageType} by{' '}
                    {data[`${formatMessage(data.type).source}`].username} with NGN {data.amount}
                  </div>
                );
              })}
            {transactions?.length === 0 && (
              <div className="wallet_history_empty_state">There is nothing to see here</div>
            )}
          </div>
        </div>
      </section>
      <Modal open={showFundModal} closed={(): void => modalHandler('fund')}>
        <FundForm />
      </Modal>
      <Modal open={showTransferModal} closed={(): void => modalHandler('transfer')}>
        <TransferForm />
      </Modal>
      <Modal open={showCheckoutModal} closed={(): void => modalHandler('checkout')}>
        <CheckoutForm banks={props.data} />
      </Modal>
    </>
  );
};

export default Overview;
