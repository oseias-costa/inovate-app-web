import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type User = {
  createAt: string;
  email: string;
  id: string;
  name: string;
  password: string;
  reamlID: string;
  status: string;
  type: string;
  updateAt: string;
};

export default function useGetUser() {
  const router = useRouter();

  const getUser = async () => {
    const user = await axios({
      method: "GET",
      baseURL: `http://localhost:3009/users/get-user/${localStorage.getItem(
        "token"
      )}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return user.data;
  };

  const { data, isError, error } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  console.log(error)
  useEffect(() => {

    if (error) {
      const getError = error as AxiosError;
      if (getError.response?.status === 401) {
        localStorage.removeItem("token");
        router.replace("/entrar/login");
      }
    }
  }, [error]);

  return { user: data };
}
