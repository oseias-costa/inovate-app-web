'use client';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type User = {
  createAt: string;
  email: string;
  id: string;
  name: string;
  password: string;
  reamlID: string;
  status: string;
  type: string;
  updateAt: string;
};

export default function useGetUser() {
  const router = useRouter();
  const [token, setToken] = useState('');

  const getUser = async () => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token') || '');
    }

    const user = await axios({
      method: 'GET',
      baseURL: `http://localhost:3009/users/get-user/${token}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return user.data;
  };

  const { data, isError, error } = useQuery<User>({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
  });

  const removeToken = () => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token') || '');
    }

    localStorage.removeItem('token');
    router.replace('/entrar/login');
  };

  useEffect(() => {
    const getError = error as AxiosError;
    if (getError.response?.status === 401) {
      if (error) {
        removeToken();
      }
    }
  }, [error]);

  return { user: data };
}
