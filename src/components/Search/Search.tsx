import React from 'react';

import { Filter } from '@/assets/icons/Filter';
import { SearchIcon } from '@/assets/icons/SearchIcon';

type SearchType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  placeHolder: string;
};

export const Search = ({ placeHolder, ...props }: SearchType) => {
  return (
    <div className="md:border-light flex flex-wrap items-center justify-between gap-4 md:rounded-[70px] md:border md:py-3 md:px-6 lg:w-[30rem]">
      <div className="border-light shrink-1 flex grow basis-0 items-center justify-start rounded-[10px] border py-3 pl-6 pr-4 md:border-0 md:p-0">
        <div className="mr-3 hover:cursor-pointer">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder={placeHolder}
          {...props}
          className="placeholder:text-second w-full grow truncate tracking-tight outline-0 placeholder:text-sm placeholder:font-medium placeholder:leading-[150%]"
        />
      </div>
      <div className="border-light flex items-center rounded-[10px] border py-3 px-[14px] hover:cursor-pointer md:border-0 md:p-0">
        <Filter />
      </div>
    </div>
  );
};