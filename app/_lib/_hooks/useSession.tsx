import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { encryptStorage } from "../_config/encryptStorage";

export default function useSession(){
    const user = encryptStorage.getItem('userInovate');

    if(user){
        return {
            user: user,
            isError: false,
            isLoading: false
        }
    }

    const { data, isLoading, isError, isSuccess } = useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        return await axios
          .get(`http://localhost:3009/users/${cookies.tokenInovateDocs['token']}`)
          .then((res) => res.data)},
    })

    useEffect(() => {
        if(isSuccess){  
            encryptStorage.setItem('userInovate', data)
        }
    },[data])

    return {
        user: data,
        isLoading,
        isError
    }
}