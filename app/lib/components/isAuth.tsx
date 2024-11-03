import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { redirect, useParams } from "next/navigation"
import React, { useEffect } from "react"
import { useUser } from "./UserProvider"
import { httpClient } from "../utils/httpClient"

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

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { user, setUser } = useUser()
    const url = window.location.href
    const token = localStorage?.getItem('token')

    useEffect(() => {
      if (!token) {
        return redirect(`/entrar/login?redirectUri=${url}`)
      }
    }, [token])

    const { data, isError, error, isSuccess, refetch, isFetched } = useQuery<User>({
      queryKey: ['user'],
      queryFn: async () => {
        const token = `Bearer ${localStorage.getItem("token")}`
        return httpClient({
          method: 'GET',
          path: `/users/get-user/${token}`,
        });
      },
      enabled: false,
    });

    useEffect(() => {
      const handleEffect = () => {
        if (user) return

        if (isSuccess) {
          setUser(data);
        }

        if (!user) {
          refetch();
        }
        if (isFetched && !data) {
          return router.push('/entrar/login');
        }

        if (isError) {
          console.log('aqui deveria entrarrrrr');
          const getError = error as AxiosError;
          if (getError.response?.status === 401) {
            setUser(null);
            localStorage.removeItem('token');
            return redirect(`/entrar/login?redirectUri=${url}`);
          }
        }
      }

      handleEffect();
    }, [data, error, user]);

    // if (isError) {
    //   localStorage.removeItem('token')
    //   return redirect(`/entrar/login?redirectUri=${url}`)
    // }

    return <Component {...props} />
  }
}
