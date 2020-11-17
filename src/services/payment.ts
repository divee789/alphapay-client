export const payWithKorapay = (
  values: { amount: string; first_name: string; last_name: string; email: string },
  success: Function,
  failure: Function,
  onClose: Function,
): void => {
  window.Korapay.initialize({
    key: process.env.REACT_APP_KORAPAY_PUBLIC_KEY,
    amount: Number(values.amount),
    currency: 'NGN',
    customer: {
      name: `${values.first_name} ${values.last_name}`,
      email: `${values.email}`,
    },
    onClose: function () {
      onClose();
    },
    onSuccess: async function (data) {
      await success(data.reference);
    },
    onFailed: function () {
      failure();
    },
  });
};
