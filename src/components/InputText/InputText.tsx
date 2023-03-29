import { Path } from 'react-hook-form';

import { IPayment } from '@/model/interface';

import './InputText.css';

interface InputTextProps {
  id: Path<IPayment>;
  label?: string;
  placeholder: string;
  type?: 'text' | 'date' | 'time';
  classNames?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  register?: unknown;
}

export const InputText = ({
  id,
  register,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  classNames = 'bg-bg',
}: InputTextProps) => {
  return (
    <div className="relative mt-5 md:mt-6">
      <p className="leading-150 mb-3 text-sm font-semibold tracking-tight md:mb-4 md:text-base">
        {label}
      </p>
      <input
        {...register(id)}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`text-grey leading-150 w-full rounded-[10px] py-[18px] px-6 text-sm tracking-tight outline-none md:px-8 md:py-4 ${classNames}`}
      />
      <p className="mt-1 text-xs text-red-400">{error}</p>
    </div>
  );
};
