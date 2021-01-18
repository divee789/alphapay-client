/* eslint-disable @typescript-eslint/camelcase */
export const payWithKorapay = (
  values: { amount: string; full_name: string; email: string },
  success: Function,
): void => {
  window.Korapay.initialize({
    key: process.env.REACT_APP_KORAPAY_PUBLIC_KEY,
    amount: Number(values.amount),
    reference: `ALP-KPY-${new Date().getTime()}`,
    currency: 'NGN',
    merchant_bears_cost: false,
    customer: {
      name: values.full_name,
      email: values.email,
    },
    onSuccess: async (data) => {
      await success(data.reference);
    },
  });
};

export const payWithFlutterwave = (
  values: { amount: string; full_name: string; email: string },
  callback: Function,
): void => {
  window.FlutterwaveCheckout({
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    amount: Number(values.amount),
    currency: 'NGN',
    country: 'NG',
    tx_ref: new Date().toISOString(),
    customer: {
      email: values.email,
      name: values.full_name,
    },
    callback: function (data) {
      callback(data.transaction_id.toString());
    },
    onclose: function () {
      // close modal
    },
    customizations: {
      title: 'alphapay',
      description: 'Fund your alphapay wallet',
      // logo: 'https://assets.piedpiper.com/logo.png',
    },
  });
};
