import { Path } from 'react-hook-form';

import { ArrowDown } from '@/assets/icons/ArrowDown';
import { IPayment } from '@/model/interface';

import './InputText.css';

interface InputPickerProps {
  label: string;
  type: 'date' | 'time';
  placeholder: string;
  id?: Path<IPayment>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: unknown;
  value?: string;
  error?: string;
}

export const InputPicker = ({
  label,
  type,
  placeholder,
  id,
  onChange,
  register,
  value,
  error,
}: InputPickerProps) => {
  return (
    <div>
      <p className="leading-150 mb-3 text-sm font-semibold tracking-tight md:mb-4 md:text-base">
        {label}
      </p>
      <div className="bg-bg text-grey relative w-full rounded-[10px] py-[18px] px-6 outline-none md:py-4">
        <div className="flex justify-between">
          <span className="leading-150 text-sm tracking-tight">
            {value?.length === 0 ? placeholder : value}
          </span>
          <span className="text-grey pointer-events-none my-1 flex items-center">
            <ArrowDown className="scale-150 fill-current" />
          </span>
        </div>
        <input
          {...register(id)}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`absolute left-0 top-0 h-full w-full opacity-0 ${
            type === 'date' ? 'datepicker-input' : 'time-picker'
          }`}
        />
      </div>
      <p className="mt-1 text-xs text-red-400">{error}</p>
    </div>
  );
};
