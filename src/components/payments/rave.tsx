import React, { useEffect } from 'react';


//Ths aloows type checking for window.getpaidSetup
declare global {
    interface Window {
        getpaidSetup: any;
    }
}


const PayWithRave = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js"
        document.getElementsByTagName("head")[0].appendChild(script);
    }, [])

    const pay = () => {
        var x = window.getpaidSetup({
            PBFPubKey: process.env.REACT_APP_RAVE_PUBLIC_KEY,
            customer_email: "user@example.com",
            amount: 2000,
            customer_phone: "234099940409",
            currency: "NGN",
            txref: 'rave-1234',
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }],
            onclose: function () { },
            callback: function (response) {
                var txref = response.data.txRef; // collect txRef returned and pass to a server page to complete status check.
                console.log("This is the response returned after a charge", response);
                if (
                    response.data.chargeResponseCode == "00" ||
                    response.data.chargeResponseCode == "0"
                ) {
                    // redirect to a success page
                } else {
                    // redirect to a failure page.
                }

                x.close(); // use this to close the modal immediately after payment.
            }
        });
    }

    return (
        <button type='button' onClick={pay}>Fund Wallet</button>
    )
}

export default PayWithRave