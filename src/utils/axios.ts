import axios from "axios";
import { bffUrl } from "./api";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const uuid = uuidv4();

// Create an axios instance for calls without Authorization
export const axiosTraceIdInstance = axios.create({
  baseURL: `${bffUrl}`, // Base URL for all calls
  headers: {
    Traceid: uuid,
  },
});

// Create an axios instance for authenticated requests
export const axiosTokenInstance = axios.create({
  baseURL: `${bffUrl}`,
  headers: {
    "Content-Type": "application/json",
    Traceid: uuid,
  },
});

// Add a request interceptor to dynamically set the Authorization header
axiosTokenInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token"); // Fetch the latest token from sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Dynamically set the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle unauthorized responses
axiosTokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear();
      window.location.href = "/";
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Access forbidden: You do not have permission to access this resource.",
      });
      console.error(
        "Access forbidden: You do not have permission to access this resource."
      );
    } else if (error.response && error.response.status === 403) {
      Swal.fire({
        icon: "error",
        title: "Forbidden",
        text: "Access forbidden: You do not have permission to access this resource. Please login again!",
      });
    }
    return Promise.reject(error);
  }
);
