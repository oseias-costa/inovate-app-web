import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useCookies } from "react-cookie"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { encryptStorage } from "../_config/encryptStorage"

type LoginData = {
    email: string,
    password: string
}
export const postRecovery = async (email:string) => {
    const response = await axios({
      baseURL: "http://localhost:3009/users/recovery-password",
      method: "POST",
      data: email
    })
    return response.data
}

export const useRecoveryPassword = (email: string) => {
    const [fetchToken, setFetchToken] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['tokenInovateDocs']);
    const queryClient = useQueryClient()
    

    const mutate = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
          console.log('recovery', data)
        },
        onError: (err) => {
          console.log('recovery-err', err)
        }
      })

    return { mutate }
}