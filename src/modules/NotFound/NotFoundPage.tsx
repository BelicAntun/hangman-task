import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl mb-6">404 Nothing found</h1>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="bg-black text-center font-semibold py-1 px-3 w-full rounded-md text-white shadow-sm hover:bg-red-900 border-gray-300 border uppercase"
      >
        Go to Home
      </button>
    </div>
  );
};
