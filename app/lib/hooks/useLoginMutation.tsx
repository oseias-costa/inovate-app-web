import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Dispatch, SetStateAction, useState } from "react"
import { useUser } from "../components/UserProvider"

type LoginData = {
  email: string,
  password: string
}

export const useLoginMutation = (setError: Dispatch<SetStateAction<string>>) => {
  const [fetchToken, setFetchToken] = useState(false)
  const { setUser } = useUser()

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
      localStorage.setItem('token', data['token'])
      setFetchToken(true)
      setUser(data.user);
    },
    onError: () => {
      setError('E-mail ou senha incorretos')
    }
  })

  return { mutate, fetchToken }
}
