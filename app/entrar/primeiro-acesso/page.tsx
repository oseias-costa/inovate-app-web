"use client"
import Image from "next/image"
import Logo from '@/public/auth/logo-clean.png'
import FirstAcessIlustration from '@/public/auth/first-acess.svg'
import { Alert, Button, Input, Typography } from "antd"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { validateEmail } from "@/app/_lib/_utils/validateEmail"
import useSession from "@/app/_lib/_hooks/useSession"
const { Title } = Typography

export default function FirstAcess(){
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const { user } = useSession()
    
    if(user){
      return redirect('/')
    }

    const handleNextPage = () => {
        const verify = validateEmail(email)
        if(!verify){
            setError('O e-mail é inválido')
            return
        }
        return router.push(`/entrar/verificar-codigo?email=${email}`)
    }

    return (
      <>
        <head>
          <title>Primeiro Acesso</title>
        </head>
        <body>
          <section style={styles.body}>
            <div style={styles.constainer}>
              <div style={Object.assign(styles.topContent)}>
                <Image src={Logo} alt="" width={200} quality={100} />
                <Image
                  src={FirstAcessIlustration}
                  alt=""
                  width={250}
                  style={{ marginBottom: 10, marginTop: 10 }}
                />
                <div>
                  <Title
                    level={3}
                    style={{ textAlign: "left", color: "#404040" }}
                  >
                    Primeiro Acesso
                  </Title>
                  <Typography
                    style={{
                      position: "relative",
                      bottom: 10,
                      color: "#8c8c8c",
                    }}
                  >
                    Olá seja bem vindo, preencha abaixo o e-mail de cadastro na
                    plataforma e clique em continuar.
                  </Typography>
                  <Typography style={{ color: "#8c8c8c" }}>E-mail</Typography>
                  <Input
                    placeholder="E-mail"
                    onChange={(e) => {
                        setError('')
                        setEmail(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        e.key === 'Enter' ? handleNextPage() : null
                        console.log(e.key)
                    }}
                    status={error ? "error" : ""}
                  />
                  <Typography
                    style={{
                      fontSize: 10,
                      color: "#ff4d4f",
                      padding: "2px 0 5px 10px",
                      transition: '.3s linear',
                      visibility: error ? "visible" : "hidden",
                    }}
                  >
                    {error}
                  </Typography>
                </div>
              </div>
              <Button
                type="primary"
                style={{ marginBottom: 5 }}
                onClick={handleNextPage}
              >
                Continuar
              </Button>
              <Button type="link" onClick={() => router.back()}>
                Voltar
              </Button>
            </div>
          </section>
        </body>
      </>
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