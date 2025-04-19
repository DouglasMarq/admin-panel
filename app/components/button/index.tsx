'use client';

import { Button as ButtonAnt } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  action?: () => void;
  type?: BaseButtonProps['type'];
  className?: string;
  loading?: boolean;
  htmlType?: 'submit' | 'button' | 'reset' | undefined;
  children: React.ReactNode;
}

export default function Button({
  action,
  type = 'primary',
  className,
  loading = false,
  htmlType = 'button',
  children,
}: ButtonProps) {
  return (
    <ButtonAnt
      htmlType={htmlType}
      type={type}
      loading={loading}
      onClick={action}
      className={className}
    >
      {children}
    </ButtonAnt>
  );
}
