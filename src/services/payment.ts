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
      console.log('modal response', data);
      await success('popopo');
    },
    onFailed: function () {
      failure();
    },
  });
};
