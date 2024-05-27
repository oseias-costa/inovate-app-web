'use client'
import { useEffect } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import isAuth, { UserProps } from "./_lib/_components/isAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
//   const params = useParams()  
//   console.log('PARAMS DO APP', params)
//   const token = localStorage?.getItem('token')
//   if(!token){
//       return redirect('/entrar/login')
//   }

//   const getUser = async () => {
//       const user =  await axios({
//           method: 'GET',
//           baseURL: `http://localhost:3009/users/${localStorage.getItem('token')}`,
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
//       })

//       return user.data
//   }

//   const { data, isError, error } = useQuery<UserProps>({
//       queryKey: ['user'],
//       queryFn: getUser
//   })

//   if(isError){
//       localStorage.removeItem('token')
//       return redirect(`/entrar/login&redirectUri=${redirectUri}`)
//   }
}

export default isAuth(Home)