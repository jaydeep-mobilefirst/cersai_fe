import axios from "axios";
import { bffUrl } from "./api";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();

const token = sessionStorage.getItem("access_token")

export const axiosTraceIdInstance = axios.create({
  baseURL: `${bffUrl}`, // Base URL for all calls
  headers: {
    Traceid: uuid
  },
});

export const axiosTokenInstance = axios.create({
  baseURL: `${bffUrl}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    Traceid: uuid
  },
});