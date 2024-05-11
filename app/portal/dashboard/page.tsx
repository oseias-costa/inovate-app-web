"use client"
import { useQueryClient } from "@tanstack/react-query"
import isAuth from "../../_lib/_components/isAuth"
import Header from "../../_lib/_components/Header"

const Dashboard = () => {
    const user = useQueryClient().getQueryData(['user'])
    return (
        <div>
            
            <h1>Dashboard</h1>
            
        </div>)
}

export default isAuth(Dashboard)