'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { register } from '@/app/actions/register';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function redirectToLogin() {
    router.push('/login');
  }

  function checkForFields(values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    if (!values.name?.trim())
      return { success: false, messageValidation: 'Name is required' };

    if (!values.email?.trim())
      return { success: false, messageValidation: 'Email is required' };

    if (!values.password?.trim())
      return { success: false, messageValidation: 'Password is required' };

    if (!values.confirmPassword?.trim())
      return {
        success: false,
        messageValidation: 'Password Confirmation is required',
      };

    return { success: true };
  }

  async function handleSubmit(values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    setIsLoading(true);

    const { success, messageValidation } = checkForFields(values);

    if (!success) {
      message.error(messageValidation);
      setIsLoading(false);
      return;
    }

    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(values);

      if (result.success) router.push('/login');
    } catch (error) {
      console.error('Register submission error:', error);
      message.error('An unexpected error occurred');
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    redirectToLogin,
    handleSubmit,
  };
};

export default useRegister;
