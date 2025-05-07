import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const PaymentSuccess = () => {
  const { navigate } = useAppContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6 px-4">
      <div className="relative">
        <img className="absolute p-5" src={assets.checkmark} alt="Checkmark" />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200" />
      </div>
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful!
      </h1>
      <p className="text-gray-600 text-lg">You will be redirected to the homepage in a few seconds...</p>
    </div>
  );
};

export default PaymentSuccess;
