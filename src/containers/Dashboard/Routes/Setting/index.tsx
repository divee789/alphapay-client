import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../../../store/actions'

import Request from '../../../../services/api-services'
import './index.scss'

const api = new Request('http://localhost:1000')
const Setting: React.FC = () => {
    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const { user } = useSelector((state: any) => state.auth)

    let profile_url
    let verify
    const verifyEmail = async () => {
        const res = await api.verifyEmail(user.email)
    }
    const fileChangedHandler = (event) => {
        const file = event.target.files[0]
        setImage(file)
    }
    const uploadHandler = async () => {
        const formData = new FormData()
        formData.append('profile_image', image)
        let resData = await api.uploadProfileImage(formData)
        console.log('resData', resData)
        dispatch(update(resData))
    }
    if (user.profile_image) {
        profile_url = user.profile_image
    } else {
        profile_url = "https://res.cloudinary.com/donalpha/image/upload/v1578874197/f0wi08kf7lj3lywtev5q.jpg"
    }
    if (!user.email_verified) {
        verify = <button onClick={verifyEmail}>Verify email</button>
    }

    return (
        <>
            <section className='dashboard_settings'>
                <div className="navbar">
                    <p className="title">My Account</p>
                </div>
                <div className="container">
                    <div className="scroll">
                        <div>
                            <img src={profile_url} alt="image" className='profile_image' />
                        </div>
                        <div>
                            <input type="file" onChange={fileChangedHandler} />
                            <button onClick={uploadHandler}>Upload image</button>
                            {verify}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Setting