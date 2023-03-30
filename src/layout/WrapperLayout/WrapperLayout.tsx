import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export function WrapperLayout() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <div className="bg-bg">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
