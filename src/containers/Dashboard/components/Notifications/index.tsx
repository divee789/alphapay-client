import React from 'react';
import $ from 'jquery';
import Close from '../../../../assets/images/close.png';
import dayjs from 'dayjs';
import './index.scss';

const NotificationsBar = ({ isActive, onClose, notifications, remove }) => {
  const handleOnClose = () => {
    $('.notifications_container').addClass('close-modal');
    $('.notifications_container').removeClass('open-modal');
    setTimeout(() => {
      onClose();
    }, 500);
  };

  let content;

  if (notifications && notifications.length > 0) {
    content = (
      <>
        {notifications.map((item) => {
          return (
            <p key={item._id}>
              {`Your wallet was credited by ${item.sender} on ${dayjs(item.date).format('D MMM YYYY')} with NGN ${
                item.amount
              }`}{' '}
              <span
                onClick={() => {
                  remove(item._id);
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

  return isActive ? (
    <>
      <div className={`notifications_container ${isActive ? 'open-modal' : ''}`}>
        <div className="notifications_content">{content}</div>
        <div className="close-btn" onClick={handleOnClose}>
          <img src={Close} alt="close_icon" />
        </div>
      </div>
    </>
  ) : null;
};

export default NotificationsBar;
