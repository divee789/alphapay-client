import React from 'react';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import dayjs from 'dayjs';
import { RootState } from '../../../../store';
import EmptyImg from '../../../../assets/images/removebg.png';
import './index.scss';
import Button from '../../../../components/Button';

const OutgoingPaymentRequest = (): JSX.Element => {
  const { outgoingPaymentRequests } = useSelector((state: RootState) => state.paymentRequest);

  return (
    <Fade bottom duration={1000} distance="50px">
      <section>
        {outgoingPaymentRequests.length > 0 ? (
          outgoingPaymentRequests.map((data) => {
            return (
              <div key={data.id} className="payment_request_detail">
                <p className="date">{`${dayjs(data.createdAt).format('dddd D MMM YYYY h:mm:ss a ')}`}</p>
                <p>
                  Your request for <span>NGN{data.amount}</span> from <span>{data.payment_recipient.username}</span> is{' '}
                  {data.status}
                </p>
                <p>Reason: {data.reason}</p>
              </div>
            );
          })
        ) : (
          <div className="empty_state">
            <img src={EmptyImg} alt="empty state" />
            <p>There is nothing to see here</p>
            <Button dashboard>Request for money</Button>
          </div>
        )}
      </section>
    </Fade>
  );
};

export default OutgoingPaymentRequest;
