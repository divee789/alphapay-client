import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Api from '../../../../services/api-services'
import { get_client_wallet } from '../../../../store/actions';
import Button from '../../../../components/Button'

import img1 from '../../../../assets/images/quick-and-easy.jpg'


const request = new Api(process.env.REACT_APP_STAGING)


const TransferForm = (props) => {
    const [message, setMessage] = useState('')
    const { fund_processing, error } = useSelector((state: any) => state.wallet)
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
        amount: Yup.number().required('Please provide the amount you want to inject'),
        narration: Yup.string().required('Please provide a narration for this transaction'),
        recipient_phone_number: Yup.number().required('Please provide the recipient phone number')
    })

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            text = 'Please wait'
            console.log(values)
            let data = {
                ...values
            }
            console.log(data)
            const res = await request.transferFunds(data)
            console.log('transfer', res)
            setMessage(res.message)
            // await dispatch(get_client_wallet())
            // props.close()

        } catch (error) {
            console.log('funding error', error)
            setSubmitting(false)
        }
    }

    if (message) return (
        <>
            <div className='transfer_feedback'>
                <img src={img1} />
                <p>{message}</p>
            </div>
        </>
    )

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
                                <h2>FUND YOUR WALLET</h2>
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