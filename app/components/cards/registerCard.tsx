'use client';

import { Card, Input, Form } from 'antd';
import useRegister from '@/app/components/cards/hooks/useRegister';
import Button from '@/app/components/button';

export default function RegisterCard() {
  const { handleSubmit, redirectToLogin, isLoading } = useRegister();

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
            <Button type="link" action={redirectToLogin} className="flex-1">
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
