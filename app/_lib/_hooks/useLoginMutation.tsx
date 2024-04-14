import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useCookies } from "react-cookie"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { encryptStorage } from "../_config/encryptStorage"

type LoginData = {
    email: string,
    password: string
}

export const useLoginMutation = (setError: Dispatch<SetStateAction<string>>) => {
    const [fetchToken, setFetchToken] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['tokenInovateDocs']);
    const queryClient = useQueryClient()
    
    const getUser = async () => {
        if(cookies.tokenInovateDocs) {
          console.log('fazendo get')
             const response = await axios.get(`http://localhost:3009/users/${cookies.tokenInovateDocs['token']}`)
             return response.data

        }
    }

    const { data: user, isLoading, isError, isSuccess } = useQuery({
      queryKey: ['user'], 
      queryFn: getUser
    })
    
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
        mutationKey: ['user'],
        onSuccess: (data) => {
          console.log(data)
          setCookie('tokenInovateDocs', data)
          setFetchToken(true)
          console.log('chegou aqui?')
          encryptStorage.setItem('userInovate', user)
          const value = encryptStorage.getItem('userInovate');
          console.log(value)
        },
        onError: () => {
          removeCookie('tokenInovateDocs')
          setError('E-mail ou senha incorretos')
        }
      })

    return { mutate, fetchToken, user }
}