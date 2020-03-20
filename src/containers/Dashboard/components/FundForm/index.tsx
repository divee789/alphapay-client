import React, { useState, useEffect } from 'react';
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


declare global {
    interface Window {
        Korapay: any;
    }
}

const FundForm = (props) => {
    const [message, setMessage] = useState(null)
    const [processing, setProcessing] = useState(null)
    const { wallet } = useSelector((state: any) => state.wallet)
    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js"
        document.getElementsByTagName("head")[0].appendChild(script);
    }, [])
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
        pin: Yup.number()
    })

    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            let data = {
                ...values,
                processor: 'Korapay',
                processor_reference: 'Korapay-test-reference',
                transaction_status: 'success',
                narration: 'testing'
            };
            setProcessing(true)
            console.log(process.env.REACT_APP_KORAPAY_TEST_PUBLIC_KEY)

            window.Korapay.initialize({

                key: process.env.REACT_APP_KORAPAY_TEST_PUBLIC_KEY, // input merchant key

                amount: Number(values.amount), // input amount eg. in naira

                currency: 'NGN', // input currency eg. NGN

                customerName: `${user.first_name} ${user.last_name}`, // input customer name

                customerEmail: `${user.email}`, // input customer email

                callback_url: "", // callback url (optional)
                onClose: function () {
                    console.log(':weary:, you are gone')
                },
                onSuccess: async function (data) {
                    console.log(data);
                    const res = await request.fundWallet(data)
                    console.log('funding', res)
                    setProcessing(false)
                    setMessage(res.message)
                    await dispatch(success(res.wallet))
                },
                onFailed: function (data) {
                    console.log(data);
                    setProcessing(false)
                    // setMessage(error.response.data.message)
                }

            })

        } catch (error) {
            console.log('funding error', error);
            setProcessing(false)
            setMessage(error.response.data.message)
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
                                    <p>PLEASE PROVIDE YOUR TRANSACTION PIN</p>
                                    <div className="con"><Field type='text' name='pin' placeholder='1111' /></div>
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