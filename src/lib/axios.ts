import axios from "axios";
import { env } from "../env";

console.log(`Url ${env.REACT_APP_API_URL}`);

export const api = axios.create({
  baseURL: env.REACT_APP_API_URL
});