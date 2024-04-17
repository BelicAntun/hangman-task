import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Hangman = ({ mistakes }: { mistakes: number }) => {
  return (
    <div className="relative h-64 w-full flex flex-col items-center">
      <div className="w-40 h-4 bg-black relative">
        <div className="w-4 h-8 bg-black absolute top-0 right-0" />
        <div
          className={twMerge(
            clsx(
              'w-16 h-16 rounded-full border-black border-8 absolute top-8 -right-6 transition-opacity opacity-0 duration-300',
              {
                'opacity-100': mistakes >= 1,
              },
            ),
          )}
        />
        <div
          className={twMerge(
            clsx('w-2 h-20 bg-black absolute top-24 right-1 transition-opacity opacity-0 duration-300', {
              'opacity-100': mistakes >= 2,
            }),
          )}
        />
        <div
          className={twMerge(
            clsx('w-2 h-12 bg-black absolute top-24 right-5 rotate-45 transition-opacity opacity-0 duration-300', {
              'opacity-100': mistakes >= 3,
            }),
          )}
        />
        <div
          className={twMerge(
            clsx('w-2 h-12 bg-black absolute top-24 -right-3 rotate-[135deg] transition-opacity opacity-0 duration-300', {
              'opacity-100': mistakes >= 4,
            }),
          )}
        />
        <div
          className={twMerge(
            clsx('w-2 h-12 bg-black absolute top-[166px] right-5 rotate-45 transition-opacity opacity-0 duration-300', {
              'opacity-100': mistakes >= 5,
            }),
          )}
        />
        <div
          className={twMerge(
            clsx('w-2 h-12 bg-black absolute top-[166px] -right-3 rotate-[135deg] transition-opacity opacity-0 duration-300', {
              'opacity-100': mistakes >= 6,
            }),
          )}
        />
      </div>
      <div className="w-4 h-56 bg-black -translate-x-16" />
      <div className="w-20 h-4 bg-black -translate-x-16" />
    </div>
  );
};
