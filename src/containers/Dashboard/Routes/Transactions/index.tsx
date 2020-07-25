import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_client_transactions } from '../../../../store/actions';

import Modal from '../../../../components/Modal';
import Transaction from '../../components/Transaction';
import TransactionSearch from '../../components/SearchForm';
import Button from '../../../../components/Button';

import Turn from '../../../../components/Loaders/Turning';

import img1 from '../../../../assets/images/andela1.png';
import './index.scss';

interface ITransaction {
  id: string;
  transaction_type: string;
  amount: number;
  reference: number;
  status: string;
  recipient: any;
  createdAt: Date;
  Client: any;
}

const Transactions = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [trans, setTrans] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const { processing, transactions, pager, error } = useSelector((state: any) => state.transaction);
  const { mode } = useSelector((state: any) => state.ui);
  let content;

  useEffect(() => {
    const trans = async () => {
      await dispatch(get_client_transactions());
    };
    trans();
  }, [dispatch]);

  const linkStyle = {
    color: mode === 'dark' ? '#00C9B6' : '',
  };

  const refreshTransactionHandler = async () => {
    try {
      setSearchActive(false);
      await dispatch(get_client_transactions());
    } catch (error) {
      content = <p>There has been an error getting your transactions</p>;
    }
  };

  const modalHandler = async () => {
    setShowModal(false);
  };
  const toggleModal = (transaction: ITransaction) => {
    setTrans(transaction);
    setShowModal(!showModal);
  };

  const switchStatus = (status: string) => {
    switch (status) {
      case 'success':
        return 'green';
      case 'failed':
        return 'red';
      case 'processing':
        return 'grey';
      default:
        return 'dark-grey';
    }
  };
  if (processing) {
    content = (
      <div style={{ margin: '5rem 0' }}>
        <Turn />
      </div>
    );
  }

  if (error) {
    content = (
      <>
        <p style={{ textAlign: 'center', margin: '5rem 0' }}>{error.response.data.message}</p>
      </>
    );
  }

  if (transactions && transactions.length === 0) {
    content = (
      <div className="no_transaction">
        <img src={img1} alt="no_transactions" />
        <h3>There are no transactions to show</h3>
        <p>You have not made any transactions yet.When you do,they will be shown here</p>
      </div>
    );
  } else if (transactions && transactions.length > 0) {
    content = (
      <div className="transaction_container">
        <div className="title">
          <p>status</p>
          <p>recipient</p>
          <p>amount (NGN)</p>
          <p>reference</p>
          <p>type</p>
        </div>
        {transactions.map((transaction: ITransaction) => {
          return (
            <>
              <div
                className="transaction_item"
                key={transaction.id}
                onClick={() => {
                  toggleModal(transaction);
                }}
              >
                <p className={`status ${switchStatus(transaction.status)}`}>{transaction.status}</p>
                <p>{transaction.Client.phone_number}</p>
                <p>
                  {transaction.amount
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <p>{transaction.reference}</p>
                <p>{transaction.transaction_type}</p>
              </div>
              <div
                className="transaction_item2"
                key={transaction.reference}
                onClick={() => {
                  toggleModal(transaction);
                }}
              >
                <p className={`status ${switchStatus(transaction.status)}`}>{transaction.status}</p>
                <p>Recipient: {transaction.Client.phone_number}</p>
                <p>
                  Amount:{' '}
                  {transaction.amount
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <p>Reference: {transaction.reference}</p>
                <p>Type: {transaction.transaction_type}</p>
              </div>
            </>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <section className="dashboard_transactions">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '1.5rem',
          }}
        >
          <div
            className="refresh_transaction_button"
            onClick={refreshTransactionHandler}
            style={{ color: mode === 'dark' ? 'rgb(0, 201, 182)' : 'inherit' }}
          >
            Refresh Transactions
          </div>
          <div
            className="refresh_transaction_button"
            onClick={() => {
              setSearchActive(!searchActive);
            }}
            style={{ color: mode === 'dark' ? 'rgb(0, 201, 182)' : 'inherit' }}
          >
            {searchActive ? 'Close' : 'Search/Filter'}
          </div>
        </div>

        <div className={`filter-box ${searchActive ? 'open-box' : 'close-box'}`}>
          <TransactionSearch />
        </div>
        {content}

        {transactions && transactions.length !== 0 && (
          <div className="pagination">
            {pager && pager.currentPage !== pager.startPage ? (
              <Button
                dashboard
                style={linkStyle}
                onClick={() => {
                  dispatch(get_client_transactions(pager.currentPage - 1));
                }}
              >
                Previous Page
              </Button>
            ) : (
              <Button dashboard style={linkStyle} disabled>
                Previous Page
              </Button>
            )}
            <div>
              {pager && pager.currentPage} of {pager && pager.endPage}
            </div>
            {pager && pager.currentPage !== pager.endPage ? (
              <Button
                dashboard
                style={linkStyle}
                onClick={() => {
                  dispatch(get_client_transactions(pager.currentPage + 1));
                }}
              >
                Next Page
              </Button>
            ) : (
              <Button dashboard style={linkStyle} disabled>
                Next Page
              </Button>
            )}
          </div>
        )}
      </section>
      {showModal && (
        <Modal open={showModal} closed={modalHandler} className="trans-modal">
          <Transaction transaction={trans} />
        </Modal>
      )}
    </>
  );
};

export default Transactions;
