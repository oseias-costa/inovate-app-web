import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Document } from "../types/document.type"

export default function useGetDocumentDetails(id: string){
    const handleGet = async () => {
        const url = `http://localhost:3009/document/get-by-id/${id}`
        const document = await axios({
            baseURL: url,
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        
        return document.data
    }

    return useQuery<Document>({
        queryFn: handleGet, 
        queryKey: [id]
    })

}