import React, { useEffect } from 'react';


//Ths aloows type checking for window.getpaidSetup
declare global {
    interface Window {
        Korapay: any;
    }
}


const PayWithRave = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js"
        document.getElementsByTagName("head")[0].appendChild(script);
    }, [])

    const pay = () => {
        console.log(process.env.REACT_APP_KORAPAY_PUBLIC_KEY)
        window.Korapay.initialize({

            key: process.env.REACT_APP_KORAPAY_PUBLIC_KEY, // input merchant key

            amount: 5000, // input amount eg. in naira

            currency: 'NGN', // input currency eg. NGN

            customerName: "Divine Olokor", // input customer name

            customerEmail: "test@gmail.com", // input customer email

            callback_url: "", // callback url (optional)
            onClose: function () {
                console.log(':weary:, you are gone')
            },
            onSuccess: function (data) {
                console.log(data);
                console.log(':+1::skin-tone-4:');
            },
            onFailed: function (data) {
                console.log(data);
                console.log(':-1::skin-tone-4:');
            }

        });


    }

    return (
        <button type='button' onClick={pay}>Fund Wallet</button>
    )
}

export default PayWithRave