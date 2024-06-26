import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { redirect, useParams } from "next/navigation"
import React, { useEffect } from "react"

export type UserProps = {
    createAt: string, 
    email: string,
    id: string,
    name: string,
    password: string,
    reamlID: string,
    status: "ACTIVE" | "INACTIVE",
    type: "ADMIN" | "USER",
    updateAt: string
}

export default function isAuth(Component: any){
    return function IsAuth(props: any) {
        const url = window.location.href
        const token = localStorage?.getItem('token')
        useEffect(() => {
            if(!token){
                return redirect(`/entrar/login?redirectUri=${url}`)
            }
            },[token])

            const getUser = async () => {
                const user =  await axios({
                    method: 'GET',
                    baseURL: `http://localhost:3009/users/${localStorage.getItem('token')}`,
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
          
                return user.data
            }
          
            const { data, isError, error } = useQuery<UserProps>({
                queryKey: ['user'],
                queryFn: getUser
            })

            if(isError){
                localStorage.removeItem('token')
                return redirect(`/entrar/login?redirectUri=${url}`)
            }
        
        return <Component {...props} />
    }
}