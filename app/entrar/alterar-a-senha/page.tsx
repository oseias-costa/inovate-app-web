"use client"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from '@/public/auth/logo-clean.png'
import LoginIlustration from '@/public/auth/login.svg'
import { useLoginMutation } from "@/app/_lib/_hooks/useLoginMutation";
import { redirect, useRouter } from "next/navigation";
import { Button, Divider, Flex, Input as InputAnt, Space, Typography, type GetProp } from 'antd';
import Title from "antd/es/typography/Title";
import useSession from "@/app/_lib/_hooks/useSession";

export default function ChangePassword(){
    const [data, setData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()
    const { user } = useSession()
    
    if(user){
      return redirect('/')
    }

    return (
      <section style={styles.body}>
        <div style={styles.constainer}>
          <div style={styles.topContent}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Image src={Logo} alt="" width={200} quality={100} />
              {/* <Image src={LoginIlustration} alt='' width={250}/> */}
            </div>
            <div style={{paddingTop: 30}}>
                <Title level={3} style={{textAlign: 'left', color: '#404040'}}>
                    Criar um nova senha
                </Title>
                <Typography style={{position: 'relative', bottom: 10, color: '#8c8c8c'}}>
                    Crie uma nova senha segura e lembre de nunca compartilhar com ninguém.
                </Typography>
            </div>
            <Typography style={{fontWeight: 400, color: '#8c8c8c'}}>Senha:</Typography>
            <InputAnt.Password 
              visibilityToggle={{ visible: showPassword, onVisibleChange: setShowPassword}} 
              placeholder="Senha" 
              style={{marginBottom: '5px'}} 
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <Typography style={{fontWeight: 400, color: '#8c8c8c'}}>Confirme a senha:</Typography>
            <InputAnt.Password 
              visibilityToggle={{ visible: showPassword, onVisibleChange: setShowPassword}} 
              placeholder="Confirme a senha" 
              style={{marginBottom: '5px'}} 
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
            <Button
              type="primary" 
              onClick={() => mutate.mutate(data)}
              style={{marginBottom: 5, marginTop: 15, width: '100%'}}
              >Criar</Button>
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