import React, { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

import { ArrowDown } from '@/assets/icons/ArrowDown';

import './PickDrop.css';

interface ILocation {
  id: number | null;
  value: string;
}

export interface IValue {
  location: ILocation;
  date: string;
  time: string;
}

interface PickDropProps {
  tittle: string;
  listLocation: ILocation[];
  classNames?: string;
  value?: IValue;
  handleChangeValue: (value: IValue) => void;
}

const PickDrop = ({ tittle, listLocation, handleChangeValue }: PickDropProps) => {
  const [value, setValue] = useState<IValue>({
    location: { id: null, value: '' },
    date: '',
    time: '',
  });

  const handleChangeLocation = (valueLocation: ILocation) => {
    setValue({
      ...value,
      location: valueLocation,
    });
    handleChangeValue({
      ...value,
      location: valueLocation,
    });
  };

  const handleChangeDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChangeValue({
      ...value,
      date: e.target.value,
    });
    setValue({
      ...value,
      date: e.target.value,
    });
  };
  const handleChangeTime: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue({
      ...value,
      time: e.target.value,
    });

    handleChangeValue({
      ...value,
      time: e.target.value,
    });
  };

  return (
    <div className={`rounded-[10px] bg-white py-4`}>
      <div className="mb-6 flex items-center px-4">
        <div className="bg-light-blue mr-2 flex h-4 w-4 items-center justify-center rounded-full">
          <div className="bg-primary h-2 w-2 rounded-full"></div>
        </div>
        <p className="text-black-2 font-semibold leading-[150%] tracking-tight">{tittle}</p>
      </div>
      <div className="s375:flex s375:justify-between relative">
        <div className="s375:grow s375:border-r s375:basis-0 border-light px-4">
          <h3>Location</h3>
          <Listbox value={value} onChange={(value: unknown) => handleChangeLocation(value)}>
            <Listbox.Button
              className={`s375:static relative flex w-full cursor-default items-center justify-between rounded-lg bg-white pt-2 text-left hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-[75px] focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
            >
              <span className="text-grey my-1 block truncate text-xs leading-4 tracking-[0.01em]">
                {value?.location.value}
              </span>
              <span className="text-grey pointer-events-none my-1 flex items-center">
                <ArrowDown />
              </span>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="s375:top-16 absolute left-0 top-10 z-10 w-full bg-slate-200">
                  {listLocation?.map((item: unknown, index) => (
                    <Listbox.Option
                      key={item.id + index}
                      className={({ active }) =>
                        `relative select-none py-1 px-4 truncate text-xs w-full hover:cursor-pointer leading-4 tracking-[0.01em] ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            {item.value}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-1 flex items-center pr-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox.Button>
          </Listbox>
        </div>
        <div className="s375:grow s375:border-r s375:basis-0 border-light px-4">
          <h3>Date</h3>
          <div className="relative pt-2">
            <div className="flex justify-between">
              <span className="text-grey my-1 block truncate text-xs leading-4 tracking-[0.01em]">
                {value.date}
              </span>
              <span className="text-grey pointer-events-none my-1 flex items-center">
                <ArrowDown />
              </span>
            </div>
            <input
              type="date"
              value={value.date}
              placeholder="dd-mm-yyyy"
              onChange={handleChangeDate}
              className="datepicker-input absolute left-0 top-0 h-full w-full opacity-0"
            />
          </div>
        </div>
        <div className="s375:grow s375:basis-0 px-4">
          <h3>Time</h3>
          <div className="relative pt-2">
            <div className="flex justify-between">
              <span className="text-grey my-1 block truncate text-xs leading-4 tracking-[0.01em]">
                {value.time}
              </span>
              <span className="text-grey pointer-events-none my-1 flex items-center">
                <ArrowDown />
              </span>
            </div>
            <input
              type="time"
              value={value.time}
              onChange={handleChangeTime}
              className="time-picker absolute left-0 top-0 h-full w-full opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickDrop;
