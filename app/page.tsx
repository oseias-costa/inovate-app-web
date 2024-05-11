'use client'
import { useEffect } from "react";
import useSession from "./_lib/_hooks/useSession";
import { redirect, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Home() {
  const [removeCookie] = useCookies(['tokenInovateDocs']);
  const { user } = useSession()
  const router = useRouter()

  if(!user){
    // redirect('/entrar/bem-vindo')
    redirect('/dashboard')
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
