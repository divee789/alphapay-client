import { getRandomString } from '../utils/misc';

export const payWithKorapay = async (values: any, success, failure) => {
  window.Korapay.initialize({
    key: process.env.REACT_APP_KORAPAY_TEST_PUBLIC_KEY, // input merchant key

    amount: Number(values.amount), // input amount eg. in naira

    currency: 'NGN', // input currency eg. NGN

    customerName: `${values.first_name} ${values.last_name}`, // input customer name

    customerEmail: `${values.email}`, // input customer email

    callback_url: '', // callback url (optional)
    onClose: function () {
      console.log(':weary:, you are gone');
      success('test-reference');
    },
    onSuccess: async function (data) {
      console.log(data);
      success('test-reference');
    },
    onFailed: function (data) {
      console.log(data);
      failure('test-refernce');
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
