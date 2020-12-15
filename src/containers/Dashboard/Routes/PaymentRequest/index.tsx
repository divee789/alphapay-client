import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import PaymentRequestForm from '../../components/PaymentRequestForm';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import Dots from '../../../../components/Loaders/Dots';

import { getPaymentRequests, updateWallet, getUserTransactions } from '../../../../store/actions';
import Request from '../../../../services/api-services';

import { Store } from '../../../../store/interfaces';

import './index.scss';

const PaymentRequest = (): JSX.Element => {
  const [paymentState, setPaymentState] = useState('incoming');
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const { incomingPaymentRequests, outgoingPaymentRequests } = useSelector((state: Store) => state.paymentRequest);

  const dispatch = useDispatch();

  const API = new Request();

  const processPaymentRequest = async (status: 'approved' | 'declined', paymentId: string): Promise<void> => {
    try {
      const confirmed = window.confirm(`Are you sure you want this request ${status} ?`);
      if (!confirmed) {
        return;
      }
      setLoading(true);
      const wallet = await API.processPaymentRequest(status, paymentId);
      if (wallet instanceof Object) {
        await dispatch(updateWallet(wallet));
        await dispatch(getUserTransactions);
      }
      await dispatch(getPaymentRequests());
      toast.success(`Request has been ${status} successfully`);
      setLoading(false);
    } catch (error) {
      toast.error(`❗ ${error.response.data.message}`, {
        autoClose: false,
      });
      setLoading(false);
    }
  };

  const EmptyState = (): JSX.Element => {
    return (
      <section className="empty_state">
        <p>There is nothing to see here.</p>
        {paymentState === 'outgoing' && (
          <Button dashboard onClick={(): void => setShowModal(true)}>
            REQUEST FUNDS
          </Button>
        )}
      </section>
    );
  };

  return (
    <>
      <section className="payment_requests_section">
        <div className="section_action">
          <p
            className={paymentState === 'incoming' ? 'active' : 'inactive'}
            onClick={(): void => setPaymentState('incoming')}
          >
            Incoming
          </p>
          <p
            className={paymentState === 'outgoing' ? 'active' : 'inactive'}
            onClick={(): void => setPaymentState('outgoing')}
          >
            Outgoing
          </p>
          <Button dashboard onClick={(): void => setShowModal(true)}>
            REQUEST FUNDS
          </Button>
        </div>
        {paymentState === 'incoming' && (
          <section>
            {incomingPaymentRequests.length > 0 ? (
              incomingPaymentRequests.map((data) => {
                return (
                  <div key={data.id}>
                    <p>
                      {data.payment_sender.username} requested for NGN {data.amount} for {data.reason}
                    </p>
                    <p>{data.status}</p>
                    <div>
                      <Button
                        dashboard
                        disabled={loading}
                        onClick={(): Promise<void> => processPaymentRequest('approved', data.id)}
                      >
                        {loading ? <Dots /> : 'APPROVE REQUEST'}
                      </Button>
                      <Button
                        dashboard
                        disabled={loading}
                        onClick={(): Promise<void> => processPaymentRequest('declined', data.id)}
                      >
                        {loading ? <Dots /> : 'DECLINE REQUEST'}
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState />
            )}
          </section>
        )}
        {paymentState === 'outgoing' && (
          <section>
            {outgoingPaymentRequests.length > 0 ? (
              outgoingPaymentRequests.map((data) => {
                return (
                  <div key={data.id}>
                    Request for NGN {data.amount} from {data.payment_recipient.username} is {data.status}
                  </div>
                );
              })
            ) : (
              <EmptyState />
            )}
          </section>
        )}
      </section>
      <Modal open={showModal} closed={(): void => setShowModal(false)}>
        <PaymentRequestForm />
      </Modal>
    </>
  );
};

export default PaymentRequest;
