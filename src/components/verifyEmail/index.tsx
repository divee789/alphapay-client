import React, { useState, useEffect } from 'react';

import Request from '../../services/api-services'
const api = new Request('http://localhost:1000')


const VerifyEmail: React.FC = (props: any) => {

    const [confirming, setConfirming] = useState(true)

    useEffect(() => {
        const token = props.match.params.token
        const call = async () => {
            try {
                const res = await api.verifyEmail(token)
                setConfirming(false)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        call()
    }, [api])

    let text
    if (confirming) text = 'confirming'
    if (!confirming) text = 'confirmed'
    return (
        <div>
            {text}
        </div>
    )

}


export default VerifyEmail