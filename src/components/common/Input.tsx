import React from 'react';

interface InputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  error,
  icon,
  autoComplete
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`relative rounded-md shadow-sm ${error ? 'border-red-500' : ''}`}>
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`
            bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700'} 
            text-white rounded-lg block w-full p-2.5
            ${icon ? 'pl-10' : ''}
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            focus:ring-blue-500 focus:border-blue-500 transition-colors
          `}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;