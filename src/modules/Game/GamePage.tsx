import { useNavigate } from 'react-router-dom';

export const GamePage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/game/result');
  };

  return (
    <div className="flex flex-col flex-1 w-full h-screen overflow-auto items-center">
      <h1>Game Page</h1>
      <button
        type="button"
        onClick={onSubmit}
        className="bg-black text-center font-semibold py-1 px-3 w-full rounded-md text-white shadow-sm hover:bg-red-900 border-gray-300 border uppercase"
      >
        Submit
      </button>
    </div>
  );
};
