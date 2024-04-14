import React, { useEffect } from "react"
import useSession from "../_hooks/useSession"

export default function isAuth(Component: any){
    return function IsAuth(props: any) {
        const { user } = useSession()
        console.log(user)
        // useEffect(() => {
        //     if(!user) {
        //        return redirect('/auth/login')
        //     }
        // },[])
        
        // if(!user){
        //     return null
        // }
        
        return <Component {...props} />
    }
}