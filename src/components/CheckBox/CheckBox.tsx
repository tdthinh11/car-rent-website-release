import React from 'react';

import Checked from '@/assets/icons/Checked';

import './CheckBox.css';

interface CheckBoxProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  variant?: 'circle' | 'square';
  classLabel?: string;
  checked?: boolean;
  name?: string;
  type?: 'checkbox' | 'radio';
  value?: string;
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
  variant = 'circle',
  classLabel = labelClassDefault,
  name,
  type = 'checkbox',
  value,
  ...props
}: CheckBoxProps) => {
  return (
    <label
      htmlFor={id}
      className="checkbox_radio flex w-max items-center gap-2 hover:cursor-pointer"
    >
      {type === 'checkbox' ? (
        <input
          type={type}
          name={name}
          id={id}
          checked={checked}
          onChange={onChange}
          className="hidden"
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          className="hidden"
          {...props}
        />
      )}
      {variant === 'circle' ? (
        <div className={`checkbox-circle ${variantStyles[variant]}`}></div>
      ) : (
        <div className={`checkbox-square ${variantStyles[variant]}`}>
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
