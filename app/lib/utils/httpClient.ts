import axios from 'axios';

interface HttpClient {
  path: string;
  method: string;
  data?: any;
  queryString?: { [key: string]: string | number | unknown };
}

export const httpClient = async (httpData: HttpClient) => {
  const token = `Bearer ${localStorage.getItem("token")}` 
const url = new URL(`http://localhost:3009${httpData.path}`);
  const params = new URLSearchParams();

  if (httpData.queryString) {
    Object.entries(httpData.queryString).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    url.search = params.toString();
  }

  const res = await axios({
    method: httpData.method,
    baseURL: url.toString(),
    headers: { Authorization: token },
    data: httpData.data,
  });

  return res.data;
};
