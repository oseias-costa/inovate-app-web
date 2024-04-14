"use client"
import Image from "next/image"
import Logo from '@/public/auth/logo-clean.png'
import ForgotPassword from '@/public/auth/forget-password.svg'
import { Button, Input, Typography } from "antd"
import { redirect, useRouter } from "next/navigation"
import { Router } from "next/router"
import Link from "next/link"
import { useState } from "react"
import useSession from "@/app/_lib/_hooks/useSession"
const { Title } = Typography

export default function RecoveyPassword(){
  const [email, setEmail] = useState('')
    const router = useRouter()
    const { user } = useSession()
    
    if(user){
      return redirect('/')
    }
    return(
        <section style={styles.body}>
            <div style={styles.constainer}>
                <div style={Object.assign(styles.topContent)}>
                    <Image src={Logo} alt="" width={200} quality={100} />
                    <Image src={ForgotPassword} alt='' width={240} style={{marginBottom: 10, marginTop: 10}} />
                    <div>
                        <Title level={3} style={{textAlign: 'left', color: '#404040'}}>
                          Recuperar a senha
                        </Title>
                        <Typography style={{position: 'relative', bottom: 10, color: '#8c8c8c'}}>
                          Você receberá um e-mail com um código de verificação no seu e-mail.
                        </Typography>
                        <Typography style={{fontWeight: 600, color: '#8c8c8c'}}>E-mail</Typography>
                        <Input placeholder="E-mail" style={{marginBottom: 10}} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <Button type="primary" style={{marginBottom: 5}}>Recuperar</Button>
                <Button type="link" onClick={() => router.back()}>Voltar</Button>
            </div>
        </section>
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