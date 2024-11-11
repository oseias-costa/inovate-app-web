'use client';
import { redirect, useParams, useRouter } from 'next/navigation';
import isAuth, { UserProps } from './lib/components/isAuth';

const Home = () => {
  const router = useRouter();
  return router.replace('/portal/request');
};

export default isAuth(Home);
