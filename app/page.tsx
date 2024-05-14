'use client'
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Home() {
  const [removeCookie] = useCookies(['tokenInovateDocs']);
  const user = localStorage.getItem('token')
  const router = useRouter()

  if(!user){
    redirect('/entrar/bem-vindo')
  }

  useEffect(() => {
    if(user){

      console.log('SECTION', user)
    }    
  },[])


  return (
    <main>
      {/* <p>{JSON.stringify(user)}</p> */}
      <p>Dashboard</p>
      <button onClick={() => {
          removeCookie.tokenInovateDocs
          router.push('/entrar/bem-vindo')
      }}>Logout</button>
    </main>
  );
}
