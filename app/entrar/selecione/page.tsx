"use client"
import Image from "next/image"
import Logo from '@/public/auth/logo-clean.png'
import { Button, Radio, Typography } from "antd"
import { Dispatch, SetStateAction, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import useSession from "@/app/lib/hooks/useSession"
const { Title } = Typography

export default function Selection() {
  const router = useRouter()
  const [value, setValue] = useState(0);
  const typeLogin = value === 1 ? 'companie' : 'user'
  const { user } = useSession()

  if (user) {
    return redirect('/')
  }

  return (
    <section style={styles.body}>
      <div style={styles.constainer}>
        <div style={Object.assign(styles.topContent)}>
          <Image src={Logo} alt="" width={200} quality={100} style={{ marginBottom: 20 }} />
          <SelectItem
            value={value}
            type={1}
            setValue={setValue}
            title='Empresa'
            description='Clique aqui se você for uma empresa parceira da Inovate Ambiental'
          />
          <SelectItem
            value={value}
            type={2}
            setValue={setValue}
            title='Usuário'
            description='Clique aqui se você for um colaborador da Inovate Ambiental'
          />
        </div>
        <Button type="primary" style={{ marginBottom: 5, width: '100%' }} onClick={() => {
          if (value) {
            router.push(`/entrar/login?typeLogin=${typeLogin}`)
          }
        }}>
          Ir para login
        </Button>
        <Button type="link" onClick={() => router.push('/entrar/bem-vindo')}>Voltar</Button>
      </div>
    </section>
  );
}

type SelectItemProps = {
  value: number,
  type: number,
  setValue: Dispatch<SetStateAction<number>>,
  title: string,
  description: string
}

const SelectItem = ({ value, setValue, title, description, type }: SelectItemProps) => {
  return (
    <button
      onClick={() => setValue(type)}
      style={{
        padding: 20,
        display: "flex",
        width: "100%",
        borderRadius: 5,
        border: type === value ? "1px solid #CCCCCC" : '1px solid #E6E6E6',
        backgroundColor: '#fff',
        marginBottom: 10,
        transition: '.3s linear',
        cursor: 'pointer'
      }}
    >
      <Radio checked={type === value} />
      <div style={{ marginLeft: 12 }}>
        <Title
          level={5}
          style={{
            textAlign: "left",
            color: "#404040",
            fontWeight: 500,
          }}
        >{title}</Title>
        <Typography
          style={{ position: "relative", bottom: 5, color: "#8c8c8c", textAlign: 'left' }}
        > {description}</Typography>
      </div>
    </button>
  )
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
    minHeight: '400px',
    width: '350px',
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    borderRadius: '10px'
  } as const,
  topContent: {
    marginBottom: 'auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}
