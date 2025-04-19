'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type LoginCredentials = {
  email: string;
  password: string;
};

type Response = {
  accessToken: string;
  refreshToken: string;
};

export async function login(credentials: LoginCredentials) {
  try {
    const response = await fetch('http://localhost:8080/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 403)
        return {
          success: false,
          error: 'Email is not registered or the password is incorrect.',
        };
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Login failed' };
    }

    const data: Response = await response.json();

    const cookieStore = await cookies();
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'strict',
    });

    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'strict',
    });

    return { success: true, accessToken: data.accessToken };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  redirect('/login');
}

export async function getAuthStatus() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('accessToken');

  return {
    isAuthenticated: !!authToken,
    userId: cookieStore.get('userId')?.value,
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('accessToken')?.value;

  if (!authToken) {
    return null;
  }

  try {
    // Call your API to get the current user's information
    const response = await fetch('https://your-api-endpoint/me', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}
