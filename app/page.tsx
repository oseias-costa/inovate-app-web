'use client';
import { redirect } from 'next/navigation';
import isAuth, { UserProps } from './lib/components/isAuth';

const Home = () => {
  return redirect('/portal/request');
};

export default isAuth(Home);
