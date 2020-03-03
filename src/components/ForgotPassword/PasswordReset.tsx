import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Request from '../../services/api-services'

const api = new Request('http://localhost:1000')

const ResetPassword: React.FC = (props: any) => {
    const [matNo, setMatNo] = useState(' ')
    const [password, setPassword] = useState(' ')
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [apiError, setApiError] = useState('')
    const token = props.match.params.token

    useEffect(() => {
        const call = async () => {
            try {
                const res = await api.confirmPasswordReset(token)
                console.log(res)
                setMatNo(res.data.matriculation_number)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(true)
            }
        }

        call()

    }, [' '])

    const handleChange = event => {
        setPassword(event.target.value)
    }

    const updatePassword = async e => {
        e.preventDefault()
        try {
            const data = {
                matriculation_number: matNo.trim(),
                password: password.trim()
            }
            const res = await api.passwordResetEmail(data)
            setUpdate(true)
            setError(false)
        } catch (error) {
            console.log(error)
            setUpdate(false)
            setApiError(error.response.data.message)
        }
    }


    if (error) {
        return (
            <>
                <h3>Problem resetting password. Please send another reset link.</h3>
                <Link to='/'>Home</Link>
                <Link to='/password_reset_request'>Reset Password</Link>
            </>
        )
    } else if (loading) {
        return (
            <>
                <div>Loading User Data...</div>
            </>
        )
    } else {
        return (
            <>
                <p>Hello {matNo}</p>
                <form onSubmit={updatePassword}>
                    <input type="text" placeholder='New Password' onChange={handleChange} value={password} />
                    <button>Update Password</button>
                </form>
                {apiError && (
                    <div>
                        <p>{apiError}</p>
                    </div>
                )}
                {update && (
                    <div>
                        <p>Your Password has been successfully updated,please try logging in again</p>
                        <Link to='/auth/login'>Log In</Link>
                    </div>
                )}
            </>
        )
    }
}

export default ResetPassword