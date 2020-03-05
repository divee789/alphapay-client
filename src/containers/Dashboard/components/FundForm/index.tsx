import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { fund_client_wallet } from '../../../../store/actions'

import Button from '../../../../components/Button'

import './index.scss'

const FundForm = (props) => {
    const { fund_processing, error } = useSelector((state: any) => state.wallet)
    const dispatch = useDispatch()

    interface FormValues {
        amount: number,
        narration: string
    }

    const initialValues: FormValues = {
        amount: 0,
        narration: ''
    }

    let text = 'FUND WALLET'
    if (fund_processing) text = 'Please wait....'

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
            }
            await dispatch(fund_client_wallet(data))
            props.close()

        } catch (error) {
            console.log('funding error', error)
            setSubmitting(false)
        }
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