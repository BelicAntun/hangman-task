import clsx from 'clsx';
import { useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { InputProps } from './types';

export const Input = ({
  control,
  name,
  widthFull = false,
  className,
  containerClass,
  label,
  labelClass,
  error,
  errorClass,
  errorMessage,
  errorMessageClass,
  inputContainerClass,
  ...otherProps
}: InputProps) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({ control, name, defaultValue: '' });

  return (
    <div className={inputContainerClass}>
      {label && (
        <label htmlFor={otherProps.id} className={twMerge(clsx('block text-sm font-medium', labelClass))}>
          {label}
        </label>
      )}
      <div
        className={twMerge(
          clsx('relative rounded-md shadow-sm', { 'w-full': widthFull }, { 'w-[180px]': !widthFull }, containerClass),
        )}
      >
        <input
          type="text"
          className={twMerge(
            clsx(
              'block rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border text-sm',
              'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 w-full px-4 py-2',
              className,
              {
                [`border-red-300 text-red-900 focus:border-red-500 focus:outline-none focus:ring-red-500 ${errorClass}`]: error,
              },
              {
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500': !error,
              },
            ),
          )}
          {...otherProps}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          ref={ref}
        />
      </div>
      {errorMessage && <p className={twMerge(clsx('mt-1 text-sm text-red-600', errorMessageClass))}>{errorMessage}</p>}
    </div>
  );
};
