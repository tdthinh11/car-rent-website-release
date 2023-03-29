import React, { useEffect } from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';
import i18n from '@/transitions/index';
import { Language } from '@/utils/constant';

export const useLanguage = () => {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const toggleLanguage = React.useCallback(() => {
    const nextLang = language === Language.EN ? Language.VN : Language.EN;
    setLanguage(nextLang);
    // i18n.changeLanguage(nextLang);
  }, [language, setLanguage]);

  return { language, toggleLanguage };
};
