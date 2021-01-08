/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import dayjs from 'dayjs';
import cx from 'classnames';
import { RootState } from '../../../../store';
import { TRANSACTION_DESTINATION_TYPE, CATEGORIES } from '../../../../interfaces/business';
import Modal from '../../../../components/Modal';
import FundForm from '../../components/FundForm';
import Button from '../../../../components/Button';
import { formatNumber } from '../../../../utils/tools';
import alpLogo from '../../../../assets/images/images.png';
import EmptyImg from '../../../../assets/images/removebg.png';

import './index.scss';

const Overview = (): JSX.Element => {
  const [showFundModal, setShowFundModal] = useState(false);
  const { wallet } = useSelector((state: RootState) => state.wallet);
  const { transactions } = useSelector((state: RootState) => state.transaction);

  return (
    <>
      <Modal open={showFundModal} closed={(): void => setShowFundModal(false)}>
        <FundForm closed={(): void => setShowFundModal(false)} />
      </Modal>
      <Fade bottom duration={1000} distance="50px">
        <section className="overview">
          <div className="actions">
            <div className="wallet_actions">
              <p>
                <span>NGN </span>
                {formatNumber(wallet?.available_balance)}
              </p>
              <span className="available_sm">AVAILABLE BALANCE (NGN)</span>
            </div>
            <div className="overview_actions">
              <div>
                <Button onClick={(): void => setShowFundModal(true)}>Fund Wallet</Button>
              </div>
            </div>
          </div>
          <div className="wallet_history">
            <div className="wallet_history_search">
              <img
                alt="search_icon"
                src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/000/220/original/search.png"
              />
              <input placeholder="Search Transactions" />
            </div>
            <div className="wallet_history_content">
              {transactions?.length > 0 &&
                transactions.map((data) => {
                  return (
                    <div key={data.id} className="wallet_history_item">
                      <div className="wallet_history_item_second">
                        <div className="wallet_history_item_second_item">
                          <img alt="transactions_logo" src={alpLogo} />
                        </div>
                        <div className="wallet_history_item_second_item">
                          <p>
                            {data.transaction_type === CATEGORIES.COLLECTION
                              ? data.sender.full_name
                              : data.recipient_name}
                          </p>
                          <p>{`${dayjs(data.createdAt).format('dddd D MMM YYYY h:mm:ss a ')}`}</p>
                        </div>
                      </div>
                      <div className="wallet_history_item_second">
                        <p
                          className={cx({
                            wallet_history_item_amount: true,
                            wallet_history_item_amount_green: data.type === TRANSACTION_DESTINATION_TYPE.INCOMING,
                            wallet_history_item_amount_red: data.type === TRANSACTION_DESTINATION_TYPE.OUTGOING,
                          })}
                        >
                          {data.type === TRANSACTION_DESTINATION_TYPE.INCOMING ? '+' : '-'} {formatNumber(data.amount)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              {transactions?.length === 0 && (
                <div className="empty_state">
                  <img src={EmptyImg} alt="empty state" />
                  <p>There is nothing to see here</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </Fade>
    </>
  );
};

export default Overview;
