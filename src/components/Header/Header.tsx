/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Popover } from '@headlessui/react';

import { Heart } from '@/assets/icons/Heart';
import Menu from '@/assets/icons/Menu';
import { Notification } from '@/assets/icons/Notification';
import { Setting } from '@/assets/icons/Setting';
import User from '@/assets/images/user.png';
import useDebounce from '@/hooks/useDebounce';
import { useLanguage } from '@/hooks/useLanguage';
import { carActionThunk, changeSearchKey } from '@/store/carSlice';
import { useAppDispatch } from '@/store/hook';
import { Language } from '@/utils/constant';

import { Search } from '../Search/Search';
import './Header.css';

const Header = () => {
  const dispatch = useAppDispatch();
  const params = useLocation();
  const [searchText, setSearchText] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchText);
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    dispatch(carActionThunk.getCategoryData());
    dispatch(changeSearchKey(searchText));
  }, [dispatch, debouncedValue]);

  return (
    <div className="bg-white">
      <div className="wrapper py-8 px-6 md:py-10 md:pl-16 md:pr-8">
        <div
          className={`flex items-center justify-between md:mb-0 ${
            !params.pathname.includes('/rental/') ? 'mb-8' : 'mb-0'
          }`}
        >
          <div className="flex items-center">
            {params.pathname !== '/' && !params.pathname.includes('/rental/') ? (
              <div>
                <div className="md:hidden">
                  <Popover className="relative flex items-center">
                    <Popover.Button className="h-11 w-11 outline-none">
                      <Menu className="h-10 w-10" />
                    </Popover.Button>
                    <Popover.Panel className="border-light absolute top-10 left-0 z-10 flex max-w-max gap-4 rounded-xl border bg-white p-4 text-left">
                      <div className="sm:border-light h-11 w-11 p-3 hover:cursor-pointer sm:flex sm:items-center sm:justify-center sm:rounded-full sm:border">
                        <Heart className="fill-current text-[#596780]" />
                      </div>
                      <div className="sm:border-light notification relative h-11 w-11 p-3 hover:cursor-pointer sm:flex sm:items-center sm:justify-center sm:rounded-full sm:border">
                        <Notification />
                      </div>
                      <Popover className="relative flex items-center">
                        <Popover.Button className="h-11 w-11 outline-none">
                          <div className="sm:border-light h-11 w-11 p-3 hover:cursor-pointer sm:flex sm:items-center sm:justify-center sm:rounded-full sm:border">
                            <Setting />
                          </div>
                        </Popover.Button>
                        <Popover.Panel className="border-light absolute top-12 right-0 z-10 max-w-max rounded-xl border bg-white py-5 px-8 text-right">
                          <button onClick={toggleLanguage}>
                            <span>{language === Language.VN ? 'EN' : 'VN'}</span>
                          </button>
                        </Popover.Panel>
                      </Popover>
                    </Popover.Panel>
                  </Popover>
                </div>
                <Link
                  to="/"
                  className="text-primary mr-7 hidden text-2xl font-bold leading-[120%] hover:cursor-pointer md:block md:text-3xl md:leading-[150%] md:tracking-tight lg:mr-16"
                >
                  MORENT
                </Link>
              </div>
            ) : (
              <Link
                to="/"
                className="text-primary mr-7 text-2xl font-bold leading-[120%] hover:cursor-pointer md:text-3xl md:leading-[150%] md:tracking-tight lg:mr-16"
              >
                MORENT
              </Link>
            )}
            {!params.pathname.includes('/rental/') && (
              <div className="hidden md:block">
                <Search
                  placeHolder={t('header.placeHolder')}
                  value={searchText}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 lg:gap-5">
            <div className="sm:border-light hidden h-11 w-11 p-3 hover:cursor-pointer sm:flex sm:items-center sm:justify-center sm:rounded-full sm:border">
              <Heart className="fill-current text-[#596780]" />
            </div>
            <div className="sm:border-light notification relative hidden h-11 w-11 p-3 hover:cursor-pointer sm:flex sm:items-center sm:justify-center sm:rounded-full sm:border">
              <Notification />
            </div>
            <Popover className="relative flex items-center">
              <Popover.Button className="h-11 w-11 outline-none">
                <div className="sm:border-light hidden h-11 w-11 p-3 hover:cursor-pointer sm:flex sm:items-center sm:justify-center sm:rounded-full sm:border">
                  <Setting />
                </div>
              </Popover.Button>
              <Popover.Panel className="border-light absolute top-12 right-0 z-10 max-w-max rounded-xl border bg-white py-5 px-8 text-right">
                <button onClick={toggleLanguage}>
                  <span>{language === Language.VN ? 'EN' : 'VN'}</span>
                </button>
              </Popover.Panel>
            </Popover>
            <Popover className="relative flex items-center">
              <Popover.Button className="h-11 w-11 outline-none">
                <img
                  src={User}
                  alt="user"
                  className="h-11 w-11 hover:cursor-pointer"
                  loading="lazy"
                />
              </Popover.Button>
              <Popover.Panel className="border-light absolute top-12 right-0 z-10 max-w-max rounded-xl border bg-white py-5 px-8 text-right">
                <div className="flex flex-col">
                  <a href="/" className="w-max hover:text-blue-500">
                    {t('header.analytics')}
                  </a>
                  <a href="/" className="w-max hover:text-blue-500">
                    {t('header.security')}
                  </a>
                  <a href="/" className="w-max hover:text-red-500">
                    {t('header.logout')}
                  </a>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
        </div>
        {!params.pathname.includes('/rental/') && (
          <div className="md:hidden ">
            {params.pathname !== '/' ? (
              <div className="mb-6">
                <Link
                  to="/"
                  className="text-primary leading-150 mr-7 text-2xl font-bold hover:cursor-pointer md:text-3xl md:leading-[150%] md:tracking-tight lg:mr-16"
                >
                  MORENT
                </Link>
              </div>
            ) : (
              ''
            )}
            <Search
              placeHolder={t('header.placeHolder')}
              value={searchText}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
