import axios from "axios";
import { env } from "../env";

console.log(`Url ${env.VITE_APP_API_URL}`);

export const api = axios.create({
  baseURL: env.VITE_APP_API_URL
});