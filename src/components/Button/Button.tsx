import React, { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant: 'primary' | 'secondary';
  className?: string;
  href?: string;
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    'py-[10px] px-[16px] bg-primary rounded-[4px] text-white font-semibold text-xs tracking-tight leading-[15px]  transition-all duration-300',
  secondary:
    'py-[10px] px-[16px] bg-secondary rounded-[4px] text-white font-semibold text-xs tracking-tight leading-[15px]  transition-all duration-300',
};

const Button = ({ variant, href, className, children, ...props }: IButtonProps) => {
  const classNames = `${variantStyles[variant]} ${className}`;
  return href ? (
    <Link to={href} className={classNames} {...props}>
      {children}
    </Link>
  ) : (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
