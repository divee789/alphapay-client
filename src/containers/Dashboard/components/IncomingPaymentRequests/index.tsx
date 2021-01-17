import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Fade from 'react-reveal/Fade';
import dayjs from 'dayjs';
import Button from '../../../../components/Button';
import APIService from '../../../../services/api-services';
import { RootState } from '../../../../store';
import { updateWallet, getUserTransactions, getPaymentRequests } from '../../../../store/actions';
import { STATUSES } from '../../../../interfaces/business';
import EmptyImg from '../../../../assets/images/removebg.png';
import './index.scss';

const IncomingPaymentRequest = (): JSX.Element => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { incomingPaymentRequests } = useSelector((state: RootState) => state.paymentRequest);

  const API = new APIService();

  const processPaymentRequest = async (status: 'approved' | 'declined', paymentId: string): Promise<void> => {
    try {
      const confirmed = window.confirm(`Are you sure you want this request ${status} ?`);
      if (!confirmed) {
        return;
      }
      setLoading(true);
      const data = await API.processPaymentRequest(status, paymentId);
      if (data.data.wallet instanceof Object) {
        await dispatch(updateWallet(data.data.wallet));
        await dispatch(getUserTransactions());
      }
      await dispatch(getPaymentRequests());
      toast.success(`Request has been ${status} successfully`);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error(`${error.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <Fade bottom duration={1000} distance="50px">
      <section>
        {incomingPaymentRequests.length > 0 ? (
          incomingPaymentRequests.map((data) => {
            return (
              <div key={data.id} className="payment_request_detail">
                <p className="date">{`${dayjs(data.createdAt).format('dddd D MMM YYYY h:mm:ss a ')}`}</p>
                <p>
                  <span>{data.payment_sender.username}</span> is requesting for <span>NGN {data.amount}</span>
                </p>
                <p>Reason: {data.reason}</p>
                {data.status === STATUSES.PENDING ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      loading={loading}
                      dashboard
                      disabled={loading}
                      onClick={(): Promise<void> => processPaymentRequest('approved', data.id)}
                      style={{ width: '40%', fontSize: '12px' }}
                    >
                      APPROVE
                    </Button>
                    <Button
                      loading={loading}
                      disabled={loading}
                      dashboard
                      onClick={(): Promise<void> => processPaymentRequest('declined', data.id)}
                      style={{ width: '40%', fontSize: '12px' }}
                    >
                      DECLINE
                    </Button>
                  </div>
                ) : (
                  <p>You {data.status} this request.</p>
                )}
              </div>
            );
          })
        ) : (
          <div className="empty_state">
            <img src={EmptyImg} alt="empty state" />
            <p>There is nothing to see here</p>
          </div>
        )}
      </section>
    </Fade>
  );
};

export default IncomingPaymentRequest;
