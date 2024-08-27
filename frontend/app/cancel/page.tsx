import Link from "next/link";

const CancelPage: React.FC = () => {

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-red-500">Payment Canceled</h1>
        <p className="text-lg text-gray-600 mt-4">
          Your payment was not completed. If you encountered an issue, you can try again or contact support.
        </p>
        <Link
          href={'/'}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
