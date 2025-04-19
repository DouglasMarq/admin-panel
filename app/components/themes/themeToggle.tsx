'use client';

import React from 'react';
import { useTheme } from './themeProvider';
import { MoonFilled, SunFilled } from '@ant-design/icons';
import Button from '@/app/components/button';

export function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Button
      type="text"
      action={toggleTheme}
      aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {themeMode === 'dark' ? <SunFilled /> : <MoonFilled />}
    </Button>
  );
}
