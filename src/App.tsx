import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/context/auth';
import { ThemeProvider } from '@/context/theme';
import { WrapperLayout } from '@/layout/WrapperLayout/WrapperLayout';
import Home from '@/pages/Home/Home';
import store from '@/store/store';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<WrapperLayout />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
