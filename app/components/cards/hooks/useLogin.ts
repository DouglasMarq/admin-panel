'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/actions/auth';
import { message } from 'antd';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function redirectToRegister() {
    router.push('/register');
  }

  async function handleSubmit(values: { email: string; password: string }) {
    setIsLoading(true);

    try {
      const result = await login(values);

      if (result.success) router.push('/dashboard');

      if (!result.success) message.error(result.error || 'Login failed');
    } catch (error) {
      console.error('Login submission error:', error);
      message.error('An unexpected error occurred');
    }

    setIsLoading(false);
  }

  return { handleSubmit, isLoading, redirectToRegister };
};

export default useLogin;
