import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

import { ArrowDown } from '@/assets/icons/ArrowDown';
import { ILocation } from '@/model/selection';

import CheckBox from '../CheckBox/CheckBox';
import './PickDrop.css';

export interface IPickDropValue {
  location: ILocation | null;
  date: string;
  time: string;
}

interface PickDropProps {
  tittle: string;
  listLocation: ILocation[];
  classNames?: string;
  value: IPickDropValue;
  handleChangeValue: (value: IPickDropValue) => void;
  isChecked?: boolean;
  id: string;
  handleChangeCheckBox: React.ChangeEventHandler<HTMLInputElement>;
}

const PickDrop = ({
  tittle,
  listLocation,
  handleChangeValue,
  isChecked = false,
  id,
  handleChangeCheckBox,
}: PickDropProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<IPickDropValue>({
    location: null,
    date: '',
    time: '',
  });

  useEffect(() => {
    handleChangeValue({
      ...value,
      location: value.location,
      date: value.date,
      time: value.time,
    });
  }, [handleChangeValue, value]);

  const handleChangeLocation = (valueLocation: ILocation) => {
    setValue({
      ...value,
      location: valueLocation,
    });
  };
  const handleChangeDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
  };

  return (
    <div className="rounded-[10px] bg-white py-4">
      <div className="mb-6 flex items-center px-4">
        <CheckBox id={id} label={tittle} onChange={handleChangeCheckBox} />
      </div>
      <div className="s375:flex s375:justify-between relative">
        {!isChecked && (
          <div className="absolute top-0 left-0 z-[1] h-full w-full cursor-not-allowed" />
        )}
        <div className="s375:grow s375:border-r s375:basis-0 border-light px-4">
          <h3>{t('common.location')}</h3>
          <Listbox
            value={value.location}
            onChange={(value: ILocation) => handleChangeLocation(value)}
          >
            <Listbox.Button className="w-full pt-2">
              <div className="flex h-6 items-center justify-between">
                <span className="text-grey my-1 block truncate text-xs leading-4 tracking-[0.01em]">
                  {value.location?.value}
                </span>
                <span className="text-grey pointer-events-none my-1 flex items-center">
                  <ArrowDown className="fill-current" />
                </span>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="s375:top-16 absolute left-0 top-10 z-10 w-full bg-slate-200 text-left">
                  {listLocation?.map((item: ILocation) => (
                    <Listbox.Option
                      key={item.id}
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
          <h3>{t('common.date')}</h3>
          <div className="relative pt-2">
            <div className="flex h-6 justify-between">
              <span className="text-grey my-1 block truncate text-xs leading-4 tracking-[0.01em]">
                {value.date}
              </span>
              <span className="text-grey pointer-events-none my-1 flex items-center">
                <ArrowDown className="fill-current" />
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
          <h3>{t('common.time')}</h3>
          <div className="relative pt-2">
            <div className="flex h-6 justify-between">
              <span className="text-grey my-1 block truncate text-xs leading-4 tracking-[0.01em]">
                {value.time}
              </span>
              <span className="text-grey pointer-events-none my-1 flex items-center">
                <ArrowDown className="fill-current" />
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
