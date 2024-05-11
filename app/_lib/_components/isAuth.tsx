import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { redirect } from "next/navigation"
import React, { useEffect } from "react"
import { useCookies } from "react-cookie"
import Cookies from 'js-cookie'

type UserProps = {
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
        const token = localStorage.getItem('token')
        
        if(!token){
            return redirect('/entrar/login')
        }
        return <Component {...props} />
    }
}