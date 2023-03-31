import React from 'react';

interface DrawerProps {
  children: React.ReactNode;
  isShow: boolean;
}

export const Drawer = ({ isShow, children, ...props }: DrawerProps) => {
  return (
    <div className="">
      {isShow ? (
        <div
          className={`absolute inset-x-0 z-[2] mx-auto h-max w-[90%] rounded-b-lg bg-slate-200 md:w-[80%]`}
          {...props}
        >
          {children}
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};
