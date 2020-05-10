import React from 'react';
import dayjs from 'dayjs';
import theme from '../../../../components/Theme';
import Close from '../../../../assets/images/close.png';

import './index.scss';

const NotificationsBar = ({ isActive, onClose, notifications, remove }) => {
  let content;

  if (notifications && notifications.length > 0) {
    content = (
      <>
        {notifications.map((item) => {
          return (
            <p key={item.id}>
              {`Your wallet was credited by ${item.sender} on ${dayjs(item.date).format('D MMM YYYY')} with NGN ${
                item.amount
              }`}{' '}
              <span
                onClick={() => {
                  remove(item.id);
                }}
              >
                Delete
              </span>
            </p>
          );
        })}
      </>
    );
  } else {
    content = <p>You do not have any notifications right now.</p>;
  }

  return (
    <>
      <div
        className={`notifications_container ${isActive ? 'open-modal' : 'close-modal'}`}
        style={theme('rgb(255, 255, 255)')}
      >
        <div className="notifications_content">{content}</div>
        <div className="close-btn" onClick={onClose}>
          <img src={Close} alt="close_icon" />
        </div>
      </div>
    </>
  );
};

export default NotificationsBar;
