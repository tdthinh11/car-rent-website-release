import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Popover } from '@headlessui/react';

import { Heard } from '@/assets/icons/Heard';
import { Notification } from '@/assets/icons/Notification';
import { Setting } from '@/assets/icons/Setting';
import User from '@/assets/images/user.png';
import { changeSearchKey } from '@/store/carSlice';
import { useAppDispatch } from '@/store/hook';

import { Search } from '../Search/Search';
import './Header.css';

const Header = () => {
  const dispatch = useAppDispatch();
  const debounceRef = useRef<NodeJS.Timeout>();

  // Debounce search
  const handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
    debounceRef.current ?? clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch(changeSearchKey(event.target.value));
    }, 300);
  };
  return (
    <div className="bg-white">
      <div className="py-8 px-6 md:py-10 md:px-16">
        <div className="mb-8 flex items-center justify-between md:mb-0">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-primary mr-7 text-2xl font-bold leading-[120%] hover:cursor-pointer md:text-3xl md:leading-[150%] md:tracking-tight lg:mr-16"
            >
              MORENT
            </Link>
            <div className="hidden md:block">
              <Search placeHolder="Search something here" onChange={handleChange} />
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
            {/* <img src={User} alt="user" className='h-7 w-7 hover:cursor-pointer relative' loading='lazy'/> */}
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
          <Search placeHolder="Search something here" onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Header;
