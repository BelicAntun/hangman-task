import { Input } from 'components/Input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<{ username: string }>({
    defaultValues: { username: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    navigate('/game');
  });
  return (
    <div className="flex flex-col flex-1 w-full h-screen overflow-auto items-center">
      <div className="relative h-40 mt-20">
        <h1 className="text-5xl font-bold text-center uppercase">hangman</h1>
        <div className="w-[7px] h-12 bg-black absolute right-1 top-10">
          <div className="rounded-full border-2 h-12 w-12 border-black -bottom-12 -right-5 absolute">
            <span className="text-xl font-bold text-black ml-1">X</span>
            <span className="text-xl font-bold text-black ml-1">X</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 items-center justify-end mb-40 gap-6">
        <h1 className="text-2xl font-semibold text-center">Enter your username to start the game</h1>
        <form className="flex gap-4">
          <Input name="username" control={control} placeholder="Username" />

          <button
            type="button"
            onClick={onSubmit}
            className="bg-black text-center font-semibold py-1 px-3 w-full rounded-md text-white shadow-sm hover:bg-red-900 border-gray-300 border uppercase"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
};
