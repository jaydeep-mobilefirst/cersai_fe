import axios from "axios";
import { bffUrl } from "./api";

export const axiosInstance = axios.create({
  baseURL: `${bffUrl}`, // Base URL for all calls
});
