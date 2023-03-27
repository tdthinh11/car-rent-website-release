import { ArrowDown } from '@/assets/icons/ArrowDown';

interface IOptionSelection {
  id: string;
  value: string;
}

interface ISelection {
  placeholder?: string;
  option: IOptionSelection[];
  label: string;
}

export const Selection = ({ placeholder, option, label }: ISelection) => {
  return (
    <div>
      <p className="leading-150 mb-3 text-sm font-semibold tracking-tight md:mb-4 md:text-base">
        {label}
      </p>
      <div className="relative">
        <ArrowDown className="text-grey absolute top-1/2 right-6 -translate-y-1/2 scale-150 fill-current" />
        <select className="bg-bg text-grey leading-150 md:px-8' w-full appearance-none rounded-[10px] py-[18px] px-6 text-sm tracking-tight outline-none hover:cursor-pointer md:py-4">
          <option selected>{placeholder}</option>
          {option.map((item) => {
            return (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
