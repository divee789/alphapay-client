import React from 'react';

import img1 from '../../../../assets/images/newpassword.png'

import './index.scss'

const Transactions: React.FC = () => {

    let content

    content = <div className='no_transaction'>
        <img src={img1} />
        <h3>There are no transactions to show</h3>
        <p>You have not made any transactions yet.When you do,they will be shown here</p>
    </div>

    return (
        <>
            {content}
        </>
    )
}

export default Transactions