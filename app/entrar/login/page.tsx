'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Logo from '@/public/auth/logo-clean.png';
import LoginIlustration from '@/public/auth/login.svg';
import { useLoginMutation } from '@/app/lib/hooks/useLoginMutation';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Button, Input as InputAnt, Typography, message } from 'antd';
import PulseLoader from 'react-spinners/PulseLoader';
import { useIsMutating } from '@tanstack/react-query';

type LoginPageProps = {
  searchParams: {
    redirectUri: string;
  };
};

export default function Login({ searchParams }: LoginPageProps) {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, fetchToken } = useLoginMutation(setError);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const router = useRouter();

  const isMutation = useIsMutating({ mutationKey: ['login'], exact: true });
  useEffect(() => {
    if (mutate.isSuccess) {
      if (!searchParams.redirectUri) {
        return redirect('/portal/request');
      }
      return redirect(searchParams.redirectUri);
    }
  }, [isMutation]);

  const [messageApi, contextHolder] = message?.useMessage();
  useEffect(() => {
    if (mutate.error?.message === 'Network Error') {
      messageApi.open({
        type: 'warning',
        content: 'Servido indisponível, por favor tente mais tarde',
      });
    }
    if (error !== '') {
      message.open({
        type: 'error',
        content: error,
      });
    }
  }, [mutate]);

  return (
    <section style={styles.body}>
      {contextHolder}
      <div style={styles.constainer}>
        <div style={styles.topContent}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src={Logo} alt="" width={200} quality={100} />
            <Image src={LoginIlustration} alt="" width={250} />
          </div>
          <Typography style={{ fontWeight: 400, color: '#8c8c8c' }}>E-mail:</Typography>
          <InputAnt
            status={error !== '' ? 'error' : ''}
            placeholder="E-mail"
            style={{ marginBottom: '5px' }}
            onChange={(e) => {
              setError('');
              setData({ ...data, email: e.target.value });
            }}
          />
          <Typography style={{ fontWeight: 400, color: '#8c8c8c' }}>Senha:</Typography>
          <InputAnt.Password
            status={error !== '' ? 'error' : ''}
            visibilityToggle={{ visible: showPassword, onVisibleChange: handleClickShowPassword }}
            placeholder="Senha"
            style={{ marginBottom: '5px' }}
            onChange={(e) => {
              setError('');
              setData({ ...data, password: e.target.value });
            }}
          />
          <Button
            type="link"
            style={{ textAlign: 'right', width: '100%' }}
            onClick={() => router.push('/entrar/recuperar-senha')}>
            Esqueci a senha
          </Button>
        </div>
        <Button
          type="primary"
          onClick={() => mutate.mutate(data)}
          style={{ marginBottom: 5, marginTop: 5, width: '100%' }}>
          {isMutation ? <PulseLoader color="#fff" size={6} loading={true} /> : 'Entrar'}
        </Button>
        <Button type="link" onClick={() => router.push('/entrar/first-acess')}>
          Primeiro acesso
        </Button>
      </div>
    </section>
  );
}

const styles = {
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff',
  },
  constainer: {
    minheight: '400px',
    width: '350px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    borderRadius: '10px',
  } as const,
  topContent: {
    marginBottom: 'auto',
  },
};
