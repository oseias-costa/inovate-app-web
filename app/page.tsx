'use client'
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import isAuth from "./_lib/_components/isAuth";

const Home = () => {
  const user = () => localStorage.getItem('token')
  const router = useRouter()

  // if(!user){
  //   redirect('/entrar/bem-vindo')
  // }

  // useEffect(() => {
  //   if(user){

  //     console.log('SECTION', user)
  //   }    
  // },[])

  return (
    <main>
      {/* <p>{JSON.stringify(user)}</p> */}
      <p>Dashboard</p>
      <button onClick={() => {
          router.push('/entrar/bem-vindo')
      }}>Logout</button>
    </main>
  );
}

export default isAuth(Home)