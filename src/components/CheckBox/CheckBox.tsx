import React from 'react';

import Checked from '@/assets/icons/Checked';

import './CheckBox.css';

interface CheckBoxProps {
  id: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: 'circle' | 'square';
  classLabel?: string;
  checked?: boolean;
  name?: string;
}

const variantStyles = {
  circle: 'w-4 h-4 rounded-full relative flex items-center justify-center items-center',
  square: 'w-5 h-5 rounded relative flex items-center justify-center items-center ',
};
const labelClassDefault = 'text-black-2 font-semibold leading-[150%] tracking-tight';

const CheckBox = ({
  id,
  label,
  onChange,
  checked,
  type = 'circle',
  classLabel = labelClassDefault,
  name,
}: CheckBoxProps) => {
  return (
    <label htmlFor={id} className="flex w-max items-center gap-2 hover:cursor-pointer">
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      {type === 'circle' ? (
        <div className={`checkbox-circle ${variantStyles[type]}`}></div>
      ) : (
        <div className={`checkbox-square ${variantStyles[type]}`}>
          <div className="square-icon">
            <Checked className="h-full w-full" />
          </div>
        </div>
      )}
      <div className={`${classLabel}`}>{label}</div>
    </label>
  );
};

export default CheckBox;
