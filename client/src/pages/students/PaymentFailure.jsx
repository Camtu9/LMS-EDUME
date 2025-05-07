import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const PaymentFailure = () => {
  const { navigate } = useAppContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6 px-4 bg-red-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-red-300 border-gray-200" />
      </div>
      <h1 className="text-2xl font-bold text-red-600">Payment Failed!</h1>
      <p className="text-gray-600 text-lg text-center">
        An error occurred while processing your payment. Please try again or contact support.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Go back to homepage
      </button>
    </div>
  );
};

export default PaymentFailure;
