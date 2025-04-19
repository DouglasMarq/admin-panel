'use server';

// import { redirect } from 'next/navigation';

type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function register(credentials: RegisterCredentials) {
  try {
    const response = await fetch('http://localhost:8080/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Register failed' };
    }

    return { success: true };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
