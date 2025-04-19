'use client';

import { Button } from 'antd';
import { logout } from '@/app/actions/auth';

interface LogoutButtonProps {
  label?: string;
}

export default function LogoutButton({ label = 'Logout' }: LogoutButtonProps) {
  return (
    <form action={logout}>
      <Button type="primary" htmlType="submit">
        {label}
      </Button>
    </form>
  );
}
