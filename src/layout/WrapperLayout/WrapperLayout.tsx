import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export function WrapperLayout() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <div className="bg-bg">
        <div className="wrapper bg-bg relative">
          <div className="md-hidden md:bg-bg absolute top-0 h-36 w-full bg-white"></div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
