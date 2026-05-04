import axios from 'axios'

// ✅ FIX: VITE_DB_ORIGIN ki jagah VITE_DB_URL use kar liya!
const DB_URL = import.meta.env.VITE_DB_URL || "http://localhost:3000/api/v1"; 

export const axiosInstance = axios.create({
    baseURL: DB_URL,
    withCredentials: true,
    headers: {
       "Content-Type": "application/json"
    }
});