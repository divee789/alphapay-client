import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Request from '../../services/api-services'
const api = new Request('http://localhost:1000')

const ForgotPassword: React.FC = (props: any) => {

    const [matNo, setMatNo] = useState('')
    const [error, setError] = useState(false)
    const [response, setResponse] = useState('')

    const handleChange = event => {
        setMatNo(event.target.value)
    }

    const sendEmail = async e => {
        e.preventDefault()
        if (matNo === '') {
            setError(false)
        } else {
            try {
                const res = await api.passwordReset(matNo)
                setError(false)
                setResponse(res.data.message)
            } catch (error) {
                setError(true)
                setResponse(error.response.data.message)
            }
        }
    }

    return (
        <>
            <form className='forgot_password' onSubmit={sendEmail}>
                <input type="text" id='matNo' placeholder='matriculation_number' value={matNo} onChange={handleChange} required />
                <button>Send Password Reset Email</button>
                {response}
            </form>
        </>
    )
}

export default ForgotPassword