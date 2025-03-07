'use client';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from './UserProvider';
import { httpClient } from '../utils/httpClient';
import { User } from '../types/user.type';

export type UserProps = {
  createAt: string;
  email: string;
  id: string;
  name: string;
  password: string;
  reamlID: string;
  status: 'ACTIVE' | 'INACTIVE';
  type: 'ADMIN' | 'USER';
  updateAt: string;
};

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { user, setUser } = useUser();
    const [token, setToken] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
      if (typeof window !== 'undefined') {
        // setUrl(window.location.href);
        const token = window?.localStorage?.getItem('token');

        if (!token) {
          redirect('/login');
        }
      }
    }, [token]);

    const { data, isError, error, isSuccess, refetch, isFetched } = useQuery<User>({
      queryKey: ['user'],
      queryFn: async () => {
        if (typeof window !== 'undefined') {
          setToken(localStorage.getItem('token') || '');
        }
        const token = `Bearer ${window?.localStorage.getItem('token')}`;
        return httpClient({
          method: 'GET',
          path: `/users/get-user/${token}`,
        });
      },
      enabled: false,
    });

    useEffect(() => {
      const handleEffect = () => {
        if (user) return;

        if (isSuccess) {
          setUser(data);
        }

        if (!user) {
          refetch();
        }
        if (isFetched && !data) {
          return redirect('/entrar/login');
        }

        if (isError) {
          console.log('aqui deveria entrarrrrr');
          const getError = error as AxiosError;
          if (getError.response?.status === 401) {
            setUser(null);
            window?.localStorage.removeItem('token');
            return redirect(`/entrar/login?redirectUri=${url}`);
          }
        }
      };

      handleEffect();
    }, [data, error, user]);

    // if (isError) {
    //   localStorage.removeItem('token')
    //   return redirect(`/entrar/login?redirectUri=${url}`)
    // }

    return <Component {...props} />;
  };
}
