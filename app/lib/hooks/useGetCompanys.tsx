'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetCompanys() {
  return useQuery({
    queryKey: ['companys'],
    queryFn: async () => {
      if (typeof window === 'undefined') {
        return Promise.reject(new Error('LocalStorage is not available on the server'));
      }

      const token = window.localStorage.getItem('token');

      const companys = await axios({
        method: 'GET',
        baseURL: 'http://localhost:3009/users/companys',
        headers: { Authorization: `Bearer ${token}` },
      });

      return companys.data;
    },
  });
}
