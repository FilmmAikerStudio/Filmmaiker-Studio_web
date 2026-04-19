'use client';

import { useEffect } from 'react';
import { useThemeStore } from '../../stores';

const ThemeSync = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme.type === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme.type]);

  return null;
};

export default ThemeSync;
