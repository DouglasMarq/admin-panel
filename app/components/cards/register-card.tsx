'use client';

import { Card, Input, Button, Form, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { register } from '@/app/actions/register';

export default function RegisterCard() {
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

  return (
    <div className="p-4 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ message: 'Please enter your password' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[{ message: 'Please enter your password' }]}
          >
            <Input.Password />
          </Form.Item>

          <div className="flex gap-4 mb-0">
            <Button type="link" onClick={redirectToLogin} className="flex-1">
              Go Back
            </Button>
            <Form.Item className="flex-1/12 mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full"
              >
                Register
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
}
