import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/context/auth';
import { ThemeProvider } from '@/context/theme';
import { WrapperLayout } from '@/layout/WrapperLayout/WrapperLayout';
import { Category } from '@/pages/Category/Category';
import { Detail } from '@/pages/Detail/Detail';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound/NotFound';
import store from '@/store/store';

import { Rental } from './pages/Rental/Rental';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<WrapperLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="detail/:carId" element={<Detail />} />
                <Route path="category" element={<Category />} />
                <Route path="rental/:carId" element={<Rental />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
