import { ArrowDown } from '@/assets/icons/ArrowDown';

import './InputText.css';

interface InputPickerProps {
  label: string;
  type: 'date' | 'time';
  placeholder: string;
}

export const InputPicker = ({ label, type, placeholder }: InputPickerProps) => {
  return (
    <div>
      <p className="leading-150 mb-3 text-sm font-semibold tracking-tight md:mb-4 md:text-base">
        {label}
      </p>
      <div className="bg-bg text-grey relative w-full rounded-[10px] py-[18px] px-6 outline-none md:py-4">
        <div className="flex justify-between">
          <span className="leading-150 text-sm tracking-tight">{'2022-03-26'}</span>
          <span className="text-grey pointer-events-none my-1 flex items-center">
            <ArrowDown className="scale-150 fill-current" />
          </span>
        </div>
        <input
          type={type}
          value={'value.date'}
          placeholder={placeholder}
          className={`absolute left-0 top-0 h-full w-full opacity-0 ${
            type === 'date' ? 'datepicker-input' : 'time-picker'
          }`}
        />
      </div>
    </div>
  );
};
