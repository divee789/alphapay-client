import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import * as actionTypes from '../../../../store/actions/actionTypes';
import { Wallet } from '../../../../store/types'
import Api from '../../../../services/api-services'
import Button from '../../../../components/Button'

import './index.scss'
import img1 from '../../../../assets/images/quick-and-easy.jpg'


const request = new Api(process.env.REACT_APP_STAGING)



//Wallet reducer 
function success(wallet: Wallet) {
    return { type: actionTypes.walletConstants.FETCH_WALLET_SUCCESS, wallet }
}

const FundForm = (props) => {
    const [message, setMessage] = useState(null)
    const [processing, setProcessing] = useState(null)
    const { wallet } = useSelector((state: any) => state.wallet)
    const dispatch = useDispatch()
    interface FormValues {
        amount: number,
        narration: string
    }

    const initialValues: FormValues = {
        amount: undefined,
        narration: '',
    }

    let text = 'FUND WALLET'
    if (processing) text = 'Please wait....'

    const walletValidationSchema = Yup.object().shape({
        amount: Yup.number().required('Please provide the amount you want to inject'),
        // narration: Yup.string().required('Please provide a narration for this transaction')
    })

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            console.log(values)
            let data = {
                ...values,
                processor: 'Korapay',
                processor_reference: 'Korapay-test-reference',
                transaction_status: 'success',
                narration: 'testing'
            };
            setProcessing(true)
            const res = await request.fundWallet(data)
            console.log('funding', res)
            setProcessing(false)
            setMessage(res.message)
            await dispatch(success(res.wallet))

        } catch (error) {
            console.log('funding error', error);
            setMessage(error.response.data.message)
            setProcessing(false)
            setSubmitting(false);
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
                                    <p>HOW MUCH DO YOU WANT TO FUND?</p>
                                    <div className="con">  <span>NGN</span> <Field type='number' name='amount' placeholder='0' /></div>
                                    <ErrorMessage name="amount" render={msg => <div className="error">{msg}</div>} />
                                </div>
                                {wallet && wallet.transaction_pin && <div>
                                    <p>PLEASE PROVIDE YOUR TRANSACTION PIN?</p>
                                    <div className="con"><Field type='number' name='pin' placeholder='1111' /></div>
                                    <ErrorMessage name="pin" render={msg => <div className="error">{msg}</div>} />
                                </div>}
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

export default FundForm