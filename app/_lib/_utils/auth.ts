import { cookies } from "next/headers"

 
 export async function login(token: string){
    const tokenIn = JSON.stringify({token})
    const expires = new Date(Date.now() + 10 * 1000)
    cookies().set('tokenNext', tokenIn, {expires, httpOnly: true})
 }