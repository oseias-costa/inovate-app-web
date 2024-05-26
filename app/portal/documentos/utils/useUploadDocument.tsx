import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export default function useUploadDocument(body: FormData, id: string){
    const updateDocument = async() => {
        await axios({
            method: 'post',
            baseURL: `http://localhost:3009/document/upload/${id}`,
            data: body,
            
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        })
    }

    return useMutation({
        mutationFn: updateDocument,
        mutationKey: [id]
    })
}