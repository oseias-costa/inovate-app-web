import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { redirect } from "next/navigation"
type LoginData = {
    email: string,
    password: string
}

export const useLoginMutation = (setError: Dispatch<SetStateAction<string>>) => {
    const [fetchToken, setFetchToken] = useState(false)
    const queryClient = useQueryClient()
    const token = localStorage.getItem('token')

    if(token){
      return redirect('/portal/documentos')
  }
    
    // const getUser = async () => {
    //     if(cookies.tokenInovate) {
    //       console.log('fazendo get')
    //          const response = await axios.get(`http://localhost:3009/users/${cookies.tokenInovate}`)
    //          return response.data

    //     }
    // }

    // const { data: user, isLoading, isError, isSuccess } = useQuery({
    //   queryKey: ['user'], 
    //   queryFn: getUser
    // })
    
    const postData = async (data: LoginData) => {
        const response = await axios({
          baseURL: "http://localhost:3009/users/login",
          method: "POST",
          data: data
        })
      
        return response.data
    }

    const mutate = useMutation({
        mutationFn: postData,
        mutationKey: ['login'],
        onSuccess: (data) => {
          console.log(data['token'])
          localStorage.setItem('token', data['token'])
          setFetchToken(true)
        },
        onError: () => {
          // removeCookie('tokenInovate')
          setError('E-mail ou senha incorretos')
        }
      })

    return { mutate, fetchToken }
}