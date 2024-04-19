import axios from "axios";
import { backendBaseUrl } from "./api";

export const axiosInstance = axios.create({
    baseURL: `${backendBaseUrl}`, // Base URL for all calls
});
