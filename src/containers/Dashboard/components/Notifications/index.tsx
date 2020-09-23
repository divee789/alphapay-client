/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import theme from '../../../../components/Theme';
import Close from '../../../../assets/images/close.png';

import './index.scss';

const NotificationsBar = ({ isActive, onClose, remove }: { isActive: boolean; onClose; remove }) => {
  const { notifications } = useSelector((state: { wallet }) => state.wallet);

  return (
    <>
      <div
        className={`notifications_container ${isActive ? 'open-modal' : 'close-modal'}`}
        style={theme('rgb(255, 255, 255)')}
      >
        <div className="notifications_content">
          {notifications && notifications.length > 0 ? (
            notifications.map((item) => {
              return (
                <div key={item.id}>
                  <p>
                    {item.sender_name} credited your wallet with NGN {item.amount} on{' '}
                    {`${dayjs(item.date).format('D MMM YYYY')}  ${dayjs(item.date).format('h:mm:ss a')}`}
                  </p>
                  <span
                    onClick={() => {
                      remove(item.id);
                    }}
                    className="item_delete"
                  >
                    Delete
                  </span>
                </div>
              );
            })
          ) : (
            <p>You do not have any notifications right now</p>
          )}
        </div>
        <div className="close-btn" onClick={onClose}>
          <img src={Close} alt="close_icon" />
        </div>
      </div>
    </>
  );
};

export default NotificationsBar;
