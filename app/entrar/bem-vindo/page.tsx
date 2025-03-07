'use client';
import Image from 'next/image';
import Logo from '@/public/auth/logo-clean.png';
import Welcome from '@/public/auth/welcome-inovate.svg';
import { Button, Typography } from 'antd';
import { redirect, useRouter } from 'next/navigation';
const { Title } = Typography;

export default function SignIn() {
  const router = useRouter();

  return (
    <section style={styles.body}>
      <div style={styles.constainer}>
        <div style={Object.assign(styles.topContent)}>
          <Image src={Logo} alt="" width={200} quality={100} />
          <Image src={Welcome} alt="" width={200} />
          <div>
            <Title level={3} style={{ textAlign: 'left', color: '#404040' }}>
              Bem vindo!
            </Title>
            <Typography style={{ position: 'relative', bottom: 10, color: '#8c8c8c' }}>
              Clique abaixo na opção desejada para continuar a autenticação
            </Typography>
          </div>
        </div>
        <Button
          type="primary"
          style={{ marginBottom: 5 }}
          onClick={() => router.push('/entrar/selecione')}>
          Entrar
        </Button>
        <Button onClick={() => router.push('/entrar/primeiro-acesso')}>Primeiro acesso</Button>
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
