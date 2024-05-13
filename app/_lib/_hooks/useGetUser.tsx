import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type User = {
    createAt: string,
    email: string,
    id: string,
    name: string,
    password: string,
    reamlID: string,
    status: string,
    type: string,
    updateAt: string
}

export default function useGetUser(){
    const getUser = async () => {
        const user =  await axios({
            method: 'GET',
            baseURL: `http://localhost:3009/users/${localStorage.getItem('token')}`,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
  
        return user.data
    }
  
    const { data } = useQuery<User>({
        queryKey: ['user'],
        queryFn: getUser
    })

    return {user: data}
}