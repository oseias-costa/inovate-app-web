"use client"
import { useEffect } from "react";
import useSession from "./_lib/_hooks/useSession";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useSession()

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
    </main>
  );
}
