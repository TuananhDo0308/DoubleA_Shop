import React from 'react';
import { IconType } from 'react-icons';

interface LabeledInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  icon: IconType;
  register: any;
  error?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  id,
  type,
  placeholder,
  icon: Icon,
  register,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          id={id}
          className={`w-full rounded-md border ${
            error ? 'border-red-500' : 'border-gray-200'
          } px-6 py-4 pl-12 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
          placeholder={placeholder}
          {...register(id)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default LabeledInput;
