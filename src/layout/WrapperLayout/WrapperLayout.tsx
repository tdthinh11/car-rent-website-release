import { Outlet } from 'react-router-dom';

import { CategorySidebar } from '@/components/CategorySidebar/CategorySidebar';
import { Drawer } from '@/components/DrawerSlice/Drawer';
import { Footer } from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { useAppSelector } from '@/store/hook';

export function WrapperLayout() {
  const { isShowDrawer } = useAppSelector((state) => state.drawerSlice);
  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <div className="bg-bg relative">
        <Drawer isShow={isShowDrawer}>
          <CategorySidebar variant="sm" />
        </Drawer>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
