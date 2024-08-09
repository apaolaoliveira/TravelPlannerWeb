import axios from "axios";

console.log(`Url ${process.env.REACT_APP_API_URL}`);

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});