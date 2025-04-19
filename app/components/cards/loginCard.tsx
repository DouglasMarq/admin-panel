'use client';

import { Card, Input, Form } from 'antd';
import Button from '@/app/components/button';
import useLogin from '@/app/components/cards/hooks/useLogin';

export default function LoginCard() {
  const { handleSubmit, redirectToRegister, isLoading } = useLogin();

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
              action={redirectToRegister}
              className="flex-1"
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
