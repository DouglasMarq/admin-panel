'use client';

import React from 'react';
import { Button } from 'antd';
import { useTheme } from './ThemeProvider';
import { MoonFilled, SunFilled } from '@ant-design/icons';

export function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Button
      type="text"
      onClick={toggleTheme}
      icon={themeMode === 'dark' ? <SunFilled /> : <MoonFilled />}
      aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
    />
  );
}
