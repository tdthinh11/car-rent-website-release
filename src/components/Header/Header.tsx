import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Popover } from '@headlessui/react';

import { Heard } from '@/assets/icons/Heard';
import Menu from '@/assets/icons/Menu';
import { Notification } from '@/assets/icons/Notification';
import { Setting } from '@/assets/icons/Setting';
import User from '@/assets/images/user.png';
import { changeSearchKey } from '@/store/carSlice';
import { useAppDispatch } from '@/store/hook';

import { Search } from '../Search/Search';
import './Header.css';

const Header = () => {
  const dispatch = useAppDispatch();
  const params = useLocation();
  const [searchText, setSearchText] = useState<string>('');
  const debounceRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    debounceRef.current ?? clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch(changeSearchKey(searchText));
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  // Debounce search
  const handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <div className="bg-white">
      <div className="py-8 px-6 md:py-10 md:pl-16 md:pr-8">
        <div className="mb-8 flex items-center justify-between md:mb-0">
          <div className="flex items-center">
            {params.pathname !== '/' ? (
              <div>
                <div className="md:hidden">
                  <Popover className="relative flex items-center">
                    <Popover.Button className="h-11 w-11 outline-none">
                      <Menu className="h-10 w-10" />
                    </Popover.Button>
                    <Popover.Panel className="border-light absolute top-12 left-0 z-10 max-w-max rounded-xl border bg-white py-5 px-8 text-left">
                      <div className="flex flex-col">
                        <a href="/" className="hover:text-blue-500">
                          Analytics
                        </a>
                        <a href="/" className="hover:text-blue-500">
                          Engagement
                        </a>
                        <a href="/" className="hover:text-blue-500">
                          Security
                        </a>
                        <a href="/" className="hover:text-red-500">
                          Logout
                        </a>
                      </div>
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
            <div className="hidden md:block">
              <Search
                placeHolder="Search something here"
                value={searchText}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-5">
            <div className="sm:border-light hidden h-11 w-11 p-3 hover:cursor-pointer sm:flex sm:items-center sm:justify-center sm:rounded-full sm:border">
              <Heard className="fill-current text-[#596780]" />
            </div>
            <div className="sm:border-light notification relative hidden h-11 w-11 p-3 hover:cursor-pointer sm:flex sm:items-center sm:justify-center sm:rounded-full sm:border">
              <Notification />
            </div>
            <div className="sm:border-light hidden h-11 w-11 p-3 hover:cursor-pointer sm:flex sm:items-center sm:justify-center sm:rounded-full sm:border">
              <Setting />
            </div>
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
                  <a href="/" className="hover:text-blue-500">
                    Analytics
                  </a>
                  <a href="/" className="hover:text-blue-500">
                    Engagement
                  </a>
                  <a href="/" className="hover:text-blue-500">
                    Security
                  </a>
                  <a href="/" className="hover:text-red-500">
                    Logout
                  </a>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
        </div>
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
          <Search placeHolder="Search something here" value={searchText} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Header;
