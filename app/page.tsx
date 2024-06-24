'use client'
import { redirect, useParams, useRouter } from "next/navigation";
import isAuth, { UserProps } from "./_lib/_components/isAuth";

const Home = () => {
    const router = useRouter()
    return router.replace('/portal/dashboard')
}

export default isAuth(Home)