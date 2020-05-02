import { getRandomString } from '../utils/tools';

export const payWithKorapay = (values: any, success: Function, failure: Function, onClose: Function): void => {
  window.Korapay.initialize({
    key: process.env.REACT_APP_KORAPAY_TEST_PUBLIC_KEY,
    amount: Number(values.amount),
    currency: 'NGN',
    customer: {
      name: `${values.first_name} ${values.last_name}`,
      email: `${values.email}`,
    },
    notification_url: '',
    onClose: function () {
      onClose();
    },
    onSuccess: async function (data) {
      console.log(data);
      await success(data.reference);
    },
    onFailed: function () {
      failure();
    },
  });
};

export const payWithRave = (values: any, success, failure) => {
  const x = window.getpaidSetup({
    PBFPubKey: process.env.REACT_APP_RAVE_TEST_PUBLIC_KEY,
    customer_email: values.email,
    amount: values.amount,
    customer_phone: values.phone_number,
    txref: getRandomString(),
    currency: 'NGN',
    onclose: function () {
      failure();
    },
    callback: async function (response) {
      const txref = response.tx.txRef; // collect txRef returned and pass to a server page to complete status check.
      console.log('This is the response returned after a charge', response);
      if (response.tx.chargeResponseCode === '00' || response.tx.chargeResponseCode === '0') {
        // redirect to a success page
        success(txref);
      } else {
        // redirect to a failure page.
        failure();
      }

      x.close(); // use this to close the modal immediately after payment.
    },
  });
};
