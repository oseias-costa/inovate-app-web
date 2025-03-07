'use client';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Document } from '../types/document.type';
import { useState } from 'react';

export default function useGetDocumentDetails(id: string): UseQueryResult<Document> {
  const [token, setToken] = useState('');

  const handleGet = async () => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token') || '');
    }

    const url = `http://localhost:3009/document/get-by-id/${id}`;
    const document = await axios({
      baseURL: url,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    return document.data;
  };

  return useQuery<Document>({
    queryFn: handleGet,
    queryKey: [id],
  });
}
