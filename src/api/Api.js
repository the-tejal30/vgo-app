import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://vgopay.in",
    timeout: 10000,
});

Api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject("Something went wrong! Please try again later.");
    }
);

export default Api;
