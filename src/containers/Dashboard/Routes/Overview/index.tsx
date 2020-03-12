import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_client_wallet } from '../../../../store/actions';

import Modal from '../../../../components/Modal'
import FundForm from '../../components/FundForm'
import TransferForm from '../../components/TransferForm'
import Button from '../../../../components/Button'

import image1 from '../../../../assets/images/transfer.png'
import image2 from '../../../../assets/images/airtime.png'
import image3 from '../../../../assets/images/pay-bills.png'
import image4 from '../../../../assets/images/coffee.png'



import './index.scss'


const Overview: React.FC = () => {
    const dispatch = useDispatch()
    const [showFundModal, setShowFundModal] = useState(false)
    const [showTransferModal, setShowTransferModal] = useState(false)


    const { user } = useSelector((state: any) => state.auth)
    const { wallet, processing, error } = useSelector((state: any) => state.wallet);

    let content: any;

    const modalHandler = async (category) => {

        if (category === 'fund') setShowFundModal(false);
        if (category === 'transfer') {
            setShowTransferModal(false)
        }
    };
    const toggleModal = (form) => {
        if (form === 'fund') setShowFundModal(!showFundModal);
        if (form === 'transfer') setShowTransferModal(!showTransferModal)
    };



    if (processing === true) {
        content = <p className='info_alert'>Getting your wallet</p>
    }
    if (wallet !== null) {
        content = <div className='wallet_card'>
            <p>Wallet Balance</p>
            <p>NGN {wallet.available_balance.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
    } else {
        content = <p style={{ textAlign: 'center' }}>There has been an error fetching your wallet</p>
    }

    let btn = <Button dashboard>Withdraw Funds</Button>
    if (wallet && wallet.available_balance <= 100) {
        btn = <Button dashboard disabled>Withdraw Funds</Button>
    }

    return (
        <>

            <div className="overview_details">
                <div className='item'>
                    {content}
                    <div className='btn_fund'>
                        <Button dashboard onClick={() => {
                            toggleModal('fund')
                        }}>Fund Wallet</Button>
                        {
                            btn
                        }

                    </div>
                </div>

                <div className="funds_control item">

                    <div className="option_card" onClick={() => {
                        toggleModal('transfer')
                    }}>
                        <img src={image1} />
                        <p>Transfer Funds</p>
                    </div>
                    <div className="option_card">
                        <img src={image2} />
                        <p>Request Funds</p>
                    </div>
                    <div className="option_card">
                        <img src={image3} />
                        <p>Pay Bills</p>
                    </div>
                    <div className="option_card">
                        <img src={image4} />
                        <p>Buy Airtime</p>
                    </div>


                </div>

            </div>
            {showFundModal && <Modal open={showFundModal} closed={() => modalHandler('fund')}>
                <FundForm close={() => modalHandler('fund')} />
            </Modal>}
            {showTransferModal && <Modal open={showTransferModal} closed={() => modalHandler('transfer')}>
                <TransferForm close={() => modalHandler('transfer')} />
            </Modal>}
        </>
    )
}

export default Overview