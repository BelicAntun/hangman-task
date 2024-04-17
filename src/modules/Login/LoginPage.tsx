import { Input } from 'components/Input';
import { twMerge } from 'tailwind-merge';
import { useLoginPage } from './hooks';

export const LoginPage = () => {
  const { control, onSubmit, formState } = useLoginPage();

  return (
    <div className="flex flex-col flex-1 w-full h-screen overflow-auto justify-around items-center px-4">
      <div className="relative h-40">
        <h1 className="text-5xl font-bold text-center uppercase">hangman</h1>
        <div className="w-[7px] h-12 bg-black absolute right-1 top-10">
          <div className="rounded-full border-2 h-12 w-12 border-black -bottom-12 -right-5 absolute">
            <span className="text-xl font-bold text-black ml-1">X</span>
            <span className="text-xl font-bold text-black ml-1">X</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-end mb-40 gap-6">
        <h1 className="text-2xl font-semibold text-center">Enter your username to start the game</h1>
        <form className="flex gap-4 w-full" onSubmit={onSubmit}>
          <Input
            name="username"
            control={control}
            placeholder="Username"
            error={!!formState.errors.username?.message}
            errorMessage={formState.errors.username?.message}
            widthFull
            inputContainerClass="w-full"
          />
          <div>
            <button
              type="button"
              onClick={onSubmit}
              className={twMerge(
                'bg-black text-center font-semibold py-1 px-3 w-full rounded-md text-white shadow-sm',
                'hover:bg-red-900 border-gray-300 border uppercase h-[38px]',
              )}
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
