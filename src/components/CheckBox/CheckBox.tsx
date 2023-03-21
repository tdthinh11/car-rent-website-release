import React from 'react';

import Checked from '@/assets/icons/Checked';

interface CheckBoxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: 'circle' | 'square';
}

const variantStyles = {
  circle: 'w-4 h-4 rounded-full relative flex items-center justify-center',
  square: 'w-5 h-5 rounded relative flex items-center justify-center items-center ',
};

export const CheckBox = ({ id, label, checked, onChange, type = 'circle' }: CheckBoxProps) => {
  return (
    <label htmlFor={id} className="flex w-max items-center gap-2 hover:cursor-pointer">
      <input
        type="checkbox"
        name={label}
        id={id}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      {type === 'circle' ? (
        <div className={`${variantStyles[type]} ${checked ? 'bg-light-blue' : 'bg-light-blue-1'}`}>
          <div
            className={`absolute h-2 w-2 rounded-full ${checked ? 'bg-primary' : 'bg-secondary'}`}
          ></div>
        </div>
      ) : (
        <div className={`${variantStyles[type]} ${checked ? '' : 'border-grey border'}`}>
          {checked && <Checked className="h-full w-full" />}
        </div>
      )}
      <div className="text-black-2 font-semibold leading-[150%] tracking-tight ">{label}</div>
    </label>
  );
};
