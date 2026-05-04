import axios from 'axios'

// 🟢 FIX: VITE_DB_ORIGIN kardo, aur "/api" zaroor lagana (agar route waise hi set kiye the)
const DB_URL = import.meta.env.VITE_DB_ORIGIN || "http://localhost:5000/api"; 

export const axiosInstance = axios.create({
    baseURL: DB_URL,
    withCredentials: true,
    headers: {
       "Content-Type": "application/json"
    }
});