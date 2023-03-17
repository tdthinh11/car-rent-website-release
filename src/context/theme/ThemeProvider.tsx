import React from 'react';

interface ThemeContextType {
  theme: string;
  toggle: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ThemeContext = React.createContext<ThemeContextType>(null!);

const THEME_KEY = 'themeKey';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<string>(localStorage.getItem(THEME_KEY) || 'light');

  const toggle = () => {
    if (localStorage.getItem(THEME_KEY) === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const value = { theme, toggle };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
