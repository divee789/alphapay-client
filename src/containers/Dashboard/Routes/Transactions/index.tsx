import React, { useEffect } from 'react';
import img1 from '../../../../assets/images/newpassword.png'

import { get_client_transactions } from '../../../../store/actions/transactions'
import { useDispatch, useSelector } from 'react-redux';

import './index.scss'

interface Transaction {
    transaction_type: string;
    amount: number;
    reference: number;
    narration: string;
    status: string
    recipient: any;

}

const Transactions: React.FC = () => {

    const dispatch = useDispatch()
    const { processing, transactions } = useSelector((state: any) => state.transaction)

    const refreshTransactionHandler = async () => {
        try {
            await dispatch(get_client_transactions())
        } catch (error) {
            console.log('error', error)
        }
    }

    if (processing) {
        return (
            <p>Getting your transactions</p>
        )
    }
    console.log(transactions)
    let content


    if (transactions === null || transactions.length === 0) {
        content = <div className='no_transaction'>
            <img src={img1} />
            <h3>There are no transactions to show</h3>
            <p>You have not made any transactions yet.When you do,they will be shown here</p>
        </div>
    } else {
        content = <div className="transaction_container">
            <div>
                <p>status</p>
                <p>recipient</p>
                <p>amount</p>
                <p>reference</p>
                <p>type</p>
            </div>
            {transactions.map((transaction: Transaction) => {
                return <div className='transaction_item' key={transaction.reference}>
                    <p>{transaction.status}</p>
                    <p>{transaction.recipient.email}</p>
                    <p>{transaction.amount}</p>
                    <p>{transaction.reference}</p>
                    <p>{transaction.transaction_type}</p>
                </div>
            })}
        </div>
    }



    return (
        <>
            <section className='dashboard_transactions'>
                <div className='refresh_transaction_button' onClick={refreshTransactionHandler}>Refresh transactions</div>
                {content}
            </section>
        </>
    )
}

export default Transactions