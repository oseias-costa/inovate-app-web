'use client';
import axios from 'axios';

interface HttpClient {
  path: string;
  method: string;
  data?: any;
  queryString?: { [key: string]: string | number | unknown };
}

export const httpClient = async (httpData: HttpClient) => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('LocalStorage is not available on the server'));
  }

  const token = `Bearer ${window?.localStorage.getItem('token')}`;
  const url = new URL(`http://localhost:30009${httpData.path}`);
  const params = new URLSearchParams();

  if (httpData.queryString) {
    Object.entries(httpData.queryString).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    url.search = params.toString();
  }

  const res = await axios({
    method: httpData.method,
    baseURL: url.toString(),
    headers: { Authorization: token },
    data: httpData.data,
  });

  return res.data;
};
