import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useGetCompanys(){
    return useQuery({
        queryKey: ['companys'],
        queryFn: async () => {
            const companys =  await axios({
                method: 'GET',
                baseURL: 'http://localhost:3009/users/companys',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    
            return companys.data
        }
    })
}