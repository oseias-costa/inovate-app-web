'use client';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/user.type';
import { httpClient } from '../utils/httpClient';
import { useRouter } from 'next/navigation';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refetch: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  refetch: () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // const refetch = () => null
  const { data, isError, error, isSuccess, refetch, isFetched } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = `Bearer ${localStorage.getItem('token')}`;
      return httpClient({
        method: 'GET',
        path: `/users/get-user/${localStorage.getItem('token')}`,
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
        return router.push('/entrar/login');
      }

      if (isError) {
        console.log('aqui deveria entrarrrrr');
        const getError = error as AxiosError;
        if (getError.response?.status === 401) {
          setUser(null);
          localStorage.removeItem('token');
          return router.replace('/entrar/login');
        }
      }
    };

    handleEffect();
  }, [data, error, user]);

  return <UserContext.Provider value={{ user, setUser, refetch }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
