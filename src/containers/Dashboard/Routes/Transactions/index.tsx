import React, { useState, useEffect } from 'react';
import img1 from '../../../../assets/images/newpassword.png'

import { get_client_transactions } from '../../../../store/actions/transactions'
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../../../components/Modal'
import Transaction from '../../components/Transaction'

import './index.scss'

interface ITransaction {
    _id: string;
    transaction_type: string;
    amount: number;
    reference: number;
    narration: string;
    status: string
    recipient: any;
    createdAt: Date
}

const Transactions: React.FC = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [transRef, setTransRef] = useState(null)
    const { processing, transactions, error } = useSelector((state: any) => state.transaction)
    let content


    useEffect(() => {
        const trans = async () => {
            try {
                await dispatch(get_client_transactions())
            } catch (error) {
                content = <p>There has been an error getting your transactions</p>
            }
        }
        trans()
    }, [dispatch])

    const refreshTransactionHandler = async () => {
        try {
            await dispatch(get_client_transactions())
        } catch (error) {
            content = <p>There has been an error getting your transactions</p>
        }
    }

    const modalHandler = async () => {
        setShowModal(false)
    }
    const toggleModal = (reference) => {
        setTransRef(reference)
        setShowModal(!showModal)
    }

    const switchStatus = status => {
        switch (status) {
            case 'success':
                return 'green';
            case 'failed':
                return 'red';
            case 'processing':
                return 'yellow';
            default:
                return 'dark-grey';
        }
    };
    if (processing) {
        return (
            <p>Getting your transactions</p>
        )
    }

    if (error) {
        content = (
            <>
                <p>There has been an error getting your transactions</p>
                <p>{error.response.data.message}</p>
            </>
        )
    }


    if (transactions !== null && transactions.length === 0) {
        content = <div className='no_transaction'>
            <img src={img1} alt='no_transactions' />
            <h3>There are no transactions to show</h3>
            <p>You have not made any transactions yet.When you do,they will be shown here</p>
        </div>
    } else if (transactions && transactions.length > 0) {
        content = <div className="transaction_container">
            <div className='title'>
                <p>status</p>
                <p>recipient</p>
                <p>amount (NGN)</p>
                <p>reference</p>
                <p>type</p>
            </div>
            {transactions.reverse().map((transaction: ITransaction) => {

                return (
                    <>
                        <div className='transaction_item' key={transaction._id} onClick={() => {
                            toggleModal(transaction)
                        }}>
                            <p className={`status ${switchStatus(transaction.status)}`}>{transaction.status}</p>
                            <p>{transaction.recipient.email}</p>
                            <p>{transaction.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>{transaction.reference}</p>
                            <p>{transaction.transaction_type}</p>
                        </div>
                        <div className='transaction_item2' key={transaction.reference} onClick={() => {
                            toggleModal(transaction)
                        }}>
                            <p className={`status ${switchStatus(transaction.status)}`}>{transaction.status}</p>
                            <p>Recipient: {transaction.recipient.email}</p>
                            <p>Amount: {transaction.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>Reference: {transaction.reference}</p>
                            <p>Type: {transaction.transaction_type}</p>
                        </div>
                    </>
                )
            })}
        </div>
    }



    return (
        <>

            <section className='dashboard_transactions'>
                <div className='refresh_transaction_button' onClick={refreshTransactionHandler}>Refresh transactions</div>
                {content}
            </section>
            {showModal && <Modal open={showModal} closed={modalHandler} className='trans-modal'>
                <Transaction transaction={transRef} />
            </Modal>}
        </>
    )
}

export default Transactions