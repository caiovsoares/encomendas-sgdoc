import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
  const { 'sgdoc.token': access_token } = parseCookies(ctx);
  console.log(access_token);
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (access_token) {
    api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
  }

  return api;
}
