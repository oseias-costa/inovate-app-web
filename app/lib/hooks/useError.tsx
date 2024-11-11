import { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/navigation';

export default function useError() {
  const router = useRouter();

  const handleError = (error: AxiosError) => {
    if (error?.status === HttpStatusCode.Unauthorized) {
      router.push('/entrar/login');
    }
  };

  return { handleError: (error: any) => handleError(error) };
}
