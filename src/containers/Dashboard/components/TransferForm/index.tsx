import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Api from '../../../../services/api-services'
import * as actionTypes from '../../../../store/actions/actionTypes';
import { Wallet } from '../../../../store/types'
import Button from '../../../../components/Button'

import img1 from '../../../../assets/images/quick-and-easy.jpg'


const request = new Api(process.env.REACT_APP_STAGING)
//Wallet reducer 
function success(wallet: Wallet) {
    return { type: actionTypes.walletConstants.FETCH_WALLET_SUCCESS, wallet }
}

const TransferForm = (props) => {
    const [message, setMessage] = useState(null)
    const [pin, setPin] = useState(false)
    const [data, setData] = useState({})
    const { fund_processing, error, wallet } = useSelector((state: any) => state.wallet)
    const dispatch = useDispatch()

    interface FormValues {
        amount: number;
        narration: string;
        recipient_phone_number: number;
        transaction_type: string;
    }

    const initialValues: FormValues = {
        amount: undefined,
        narration: '',
        recipient_phone_number: undefined,
        transaction_type: 'Internal'
    }

    let text = 'TRANSFER FUNDS'


    const walletValidationSchema = Yup.object().shape({
        amount: Yup.number().required('Please provide the amount you want to transfer'),
        narration: Yup.string().required('Please provide a narration for this transaction'),
        recipient_phone_number: Yup.number().required('Please provide the recipient phone number')
    })

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            text = 'Please wait'
            console.log(values)
            setData(values)
            if (wallet.transaction_pin) {
                setPin(true)
                return
            }
            let data = {
                ...values
            }
            console.log(data)
            const res = await request.transferFunds(data)
            console.log('transfer', res)
            setMessage(res.message)
            await dispatch(success(res.wallet))
            // props.close()

        } catch (error) {
            console.log('funding error', error)
            setMessage(error.response.data.message)
            setSubmitting(false)
        }
    }

    const transfer = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            console.log(values)
            const res = await request.transferFunds(values)
            console.log('transfer', res)
            setMessage(res.message)
            await dispatch(success(res.wallet))
            setPin(false)
        } catch (error) {
            console.log('funding error', error)
            setMessage(error.response.data.message)
            setPin(false)
            setSubmitting(false)
        }
    }

    if (message) {
        setTimeout(function () { setMessage(null) }, 5000)
        return (
            <>
                <div className='transfer_feedback'>
                    <img src={img1} />
                    <p>{message}</p>
                </div>
            </>
        )
    }

    if (pin) {
        return <Formik
            initialValues={{ transaction_pin: '' }}
            validationSchema={
                Yup.object().shape({
                    pin: Yup.number().required('Please provide your transaction pin')
                })}
            onSubmit={transfer}
            render={formProps => {
                return (
                    <>
                        <Form className='fund_wallet_form'>
                            <div>
                                <p>PLEASE PROVIDE YOUR TRANSACTION PIN</p>
                                <div className="con"><Field type='text' name='pin' placeholder='1111' /></div>
                                <ErrorMessage name="pin" render={msg => <div className="error">{msg}</div>} />
                            </div>
                            <div className="fund_btn">
                                <Button disabled={formProps.isSubmitting} colored>{text}</Button>
                            </div>
                        </Form>
                    </>
                )
            }}
        />
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={walletValidationSchema}
                onSubmit={handleSubmit}
                render={formProps => {
                    return (
                        <>
                            <Form className='fund_wallet_form'>
                                <h2>TRANSFER FUNDS</h2>
                                <div>
                                    <p>HOW MUCH DO YOU WANT TO TRANSFER?</p>
                                    <div className="con">  <span>NGN</span> <Field type='number' name='amount' placeholder='0' /></div>
                                    <ErrorMessage name="amount" render={msg => <div className="error">{msg}</div>} />
                                </div>
                                <div>
                                    <p>WHO DO YOU WANT TO TRANSFER TO?</p>
                                    <div className="con"><Field type='text' name='recipient_phone_number' placeholder='08024110355' /></div>
                                    <ErrorMessage name="recipient_phone-number" render={msg => <div className="error">{msg}</div>} />
                                </div>
                                <div>
                                    <p>WHY ARE YOU TRANSFERRING?</p>
                                    <div className="con"><Field type='textarea' name='narration' placeholder='To pay my levy' /></div>
                                    <ErrorMessage name="narration" render={msg => <div className="error">{msg}</div>} />
                                </div>
                                <div className="fund_btn">
                                    <Button disabled={formProps.isSubmitting} colored>{text}</Button>
                                </div>
                            </Form>
                        </>
                    )
                }}
            />
        </>
    )
}

export default TransferForm