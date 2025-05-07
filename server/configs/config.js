const config = {
  vnp_TmnCode: "48P7ZJ4A",
  vnp_HashSecret: "UT8G1ECBC7XPMW900F7TKGY1644SYMMO",
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl: `${process.env.VITE_BACKEND_URL}/vnpay-return`
};

export default config;
