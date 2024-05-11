import { cookies } from "next/headers";

export default function useSetCookie(token: string){
  const setCookie = () => cookies().set('token-update', token)
  return setCookie
  }
  