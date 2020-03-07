import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_client_wallet } from '../../../../store/actions';

import Modal from '../../../../components/Modal'
import FundForm from '../../components/FundForm'
import TransferForm from '../../components/TransferForm'
import Button from '../../../../components/Button'



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
            <p>NGN {wallet.available_balance.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
    } else {
        content = <p style={{ textAlign: 'center' }}>There has been an error fetching your wallet</p>
    }

    let btn = <Button className='bordered'>Withdraw Funds</Button>
    if (wallet && wallet.available_balance <= 100) {
        btn = <Button className='bordered' disabled>Withdraw Funds</Button>
    }

    return (
        <>
            <Modal open={showFundModal} closed={() => modalHandler('fund')}>
                <FundForm close={() => modalHandler('fund')} />
            </Modal>
            <Modal open={showTransferModal} closed={() => modalHandler('transfer')}>
                <TransferForm close={() => modalHandler('transfer')} />
            </Modal>
            <div style={{ fontSize: '24px', textAlign: 'center', fontFamily: 'firma-bold' }}>Account Number: {user.phone_number}</div>
            <div className="overview_details">
                <div className='item'>
                    {content}
                    <div className='btn_fund'>
                        <Button className='bordered' onClick={() => {
                            toggleModal('fund')
                        }}>Fund Wallet</Button>
                        {
                            btn
                        }

                    </div>
                </div>
                <div className="funds_control item">
                    <div>
                        <Button className='bordered' onClick={() => {
                            toggleModal('transfer')
                        }}>Transfer Funds</Button>
                        <Button className='bordered'>Request Funds</Button>
                        <Button className='bordered'>Buy Airtime</Button>
                        <Button className='bordered'>Pay Bills</Button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Overview