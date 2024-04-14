"use client"
import { useQueryClient } from "@tanstack/react-query"
import isAuth from "../_lib/_components/isAuth"

const Dashboard = () => {
    const user = useQueryClient().getQueryData(['user'])
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{JSON.stringify(user)}</p>
        </div>)
}

export default isAuth(Dashboard)