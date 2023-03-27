import './InputText.css';

interface InputTextProps {
  label?: string;
  placeholder: string;
  type?: 'text' | 'date' | 'time';
  classNames?: string;
}

export const InputText = ({
  label,
  placeholder,
  type = 'text',
  classNames = 'bg-bg',
}: InputTextProps) => {
  return (
    <div className="relative mt-5 md:mt-6">
      <p className="leading-150 mb-3 text-sm font-semibold tracking-tight md:mb-4 md:text-base">
        {label}
      </p>
      <input
        type={type}
        placeholder={placeholder}
        className={`text-grey leading-150 w-full rounded-[10px] py-[18px] px-6 text-sm tracking-tight outline-none md:px-8 md:py-4 ${classNames}`}
      />
    </div>
  );
};
