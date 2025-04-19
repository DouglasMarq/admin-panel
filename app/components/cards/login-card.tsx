'use client';

import { Card, Input, Button, Form, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '@/app/actions/auth';

export default function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function redirectToRegister() {
    router.push('/register');
  }

  async function handleSubmit(values: { email: string; password: string }) {
    setIsLoading(true);

    try {
      const result = await login(values);

      if (result.success) {
        message.success('Login successful!');

        router.push('/dashboard');
      }

      if (!result.success) message.error(result.error || 'Login failed');
    } catch (error) {
      console.error('Login submission error:', error);
      message.error('An unexpected error occurred');
    }

    setIsLoading(false);
  }

  return (
    <div className="p-4 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <Form onFinish={handleSubmit} layout="vertical">
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

          <div className="flex gap-4 mb-0">
            <Form.Item className="flex-1/12 mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full"
              >
                Login
              </Button>
            </Form.Item>
            <Button
              type="primary"
              onClick={redirectToRegister}
              className="flex-1"
            >
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
