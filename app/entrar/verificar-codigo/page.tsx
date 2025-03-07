'use client';
import Image from 'next/image';
import Logo from '@/public/auth/logo-clean.png';
import ForgotPassword from '@/public/auth/recovery-code.svg';
import { Button, Input, Space, Typography, type GetProp } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useIsMutating, useMutation } from '@tanstack/react-query';
import PulseLoader from 'react-spinners/PulseLoader';
const { Title } = Typography;

export default function VerifyCode() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const params = useParams<{ tag: string; item: string }>();
  //
  // useEffect(() => {
  //   if (params) {
  //     setEmail(String(params.get('email')));
  //   }
  // }, [params]);

  const postRecovery = async () => {
    const response = await axios({
      baseURL: 'http://localhost:3009/users/check-code',
      method: 'POST',
      data: { code: code, email: email },
    });
    return response.data;
  };

  const isMutation = useIsMutating({ mutationKey: ['verify-code'], exact: true });
  const mutation = useMutation({
    mutationFn: postRecovery,
    mutationKey: ['verify-code'],
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('update-password', data.token);
      }
      return router.replace('/entrar/alterar-a-senha?email=' + email);
    },
    onError: () => {
      setError('O código é inválido');
    },
  });

  const onChange: GetProp<typeof Input.OTP, 'onChange'> = (number) => {
    if (error != '') setError('');
    setCode(number);
  };

  const sharedProps = {
    onChange,
  };
  return (
    <section style={styles.body}>
      <div style={styles.constainer}>
        <div style={Object.assign(styles.topContent)}>
          <Image src={Logo} alt="" width={200} quality={100} />
          <Image
            src={ForgotPassword}
            alt=""
            width={250}
            style={{ position: 'relative', bottom: 20 }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              position: 'relative',
              bottom: 20,
            }}>
            <Title level={3} style={{ textAlign: 'left', color: '#404040' }}>
              Verificar código
            </Title>
            <Typography style={{ position: 'relative', bottom: 10, color: '#8c8c8c' }}>
              Informe abaixo o código enviado no seu e-mail.
            </Typography>
            <Space direction="vertical" style={{ marginBottom: 10, textAlign: 'center' }}>
              {/* <Input.OTP */}
              {/*   status={error !== '' ? 'error' : ''} */}
              {/*   typeof="number" */}
              {/*   length={6} */}
              {/*   {...sharedProps} */}
              {/* /> */}
            </Space>
          </div>
        </div>
        <Button
          type="primary"
          style={{ marginBottom: 5 }}
          onClick={() => !isMutation && mutation.mutate()}>
          {isMutation ? <PulseLoader color="#fff" size={6} loading={true} /> : 'Verificar'}
        </Button>
        <Button type="link" onClick={() => router.back()}>
          Voltar
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
    minHeight: '400px',
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
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};
