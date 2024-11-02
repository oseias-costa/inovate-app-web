"use client"
import Image from "next/image";
import { useState } from "react";
import Logo from '@/public/auth/logo-clean.png'
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Button, Input as InputAnt, Typography } from 'antd';
import Title from "antd/es/typography/Title";
import useSession from "@/app/lib/hooks/useSession";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

export default function ChangePassword() {
  const [data, setData] = useState({ password: '', passwordConfirmation: '' })
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const [error, setError] = useState('')
  const params = useSearchParams()
  const { user } = useSession()
  const token = localStorage.getItem('update-password')

  if (user) {
    return redirect('/')
  }

  if (!token) {
    return redirect('/entrar/login')
  }
  const email = params.get('email')

  const updatePassword = async () => {
    const response = await axios({
      baseURL: "http://localhost:3009/users/update-password",
      method: "POST",
      data: {
        email: email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      },
      headers: {
        Authorization: "Bearer " + token,
      }
    })
    return response.data
  }

  const isMutation = useIsMutating({ mutationKey: ['update-password'], exact: true })
  const mutation = useMutation({
    mutationFn: updatePassword,
    mutationKey: ['update-password'],
    onSuccess: () => {

      localStorage.removeItem('update-password')
      return router.replace('/entrar/login')
    },
    onError: () => {
      setError('O código é inválido')
    }
  })

  return (
    <section style={styles.body}>
      <div style={styles.constainer}>
        <div style={styles.topContent}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src={Logo} alt="" width={200} quality={100} />
            {/* <Image src={LoginIlustration} alt='' width={250}/> */}
          </div>
          <div style={{ paddingTop: 30 }}>
            <Title level={3} style={{ textAlign: 'left', color: '#404040' }}>
              Criar um nova senha
            </Title>
            <Typography style={{ position: 'relative', bottom: 10, color: '#8c8c8c' }}>
              Crie uma nova senha segura e lembre de nunca compartilhar com ninguém.
            </Typography>
          </div>
          <Typography style={{ fontWeight: 400, color: '#8c8c8c' }}>Senha:</Typography>
          <InputAnt.Password
            visibilityToggle={{ visible: showPassword, onVisibleChange: setShowPassword }}
            placeholder="Senha"
            style={{ marginBottom: '5px' }}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Typography style={{ fontWeight: 400, color: '#8c8c8c' }}>Confirme a senha:</Typography>
          <InputAnt.Password
            visibilityToggle={{ visible: showPassword, onVisibleChange: setShowPassword }}
            placeholder="Confirme a senha"
            style={{ marginBottom: '5px' }}
            onChange={(e) => setData({ ...data, passwordConfirmation: e.target.value })}
          />
        </div>
        <Button
          type="primary"
          onClick={() => !isMutation && mutation.mutate()}
          style={{ marginBottom: 5, marginTop: 15, width: '100%' }}
        >
          {isMutation
            ? <PulseLoader color="#fff" size={6} loading={true} />
            : 'Verificar'}
        </Button>
      </div>
    </section>
  );
}

const styles = {
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  constainer: {
    minheight: '400px',
    width: '350px',
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    borderRadius: '10px'
  } as const,
  topContent: {
    marginBottom: 'auto'
  }
}
