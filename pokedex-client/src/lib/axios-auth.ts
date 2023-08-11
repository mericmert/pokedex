import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_URL } from "./url";
import { getItem, setItem } from "./storage";

const refreshAccessToken = async () => {
    try {
        const res: AxiosResponse = await axiosWithAuth("/api/v1/auth/refresh-token");
        return res.data["access-token"];

    } catch (err) {
        throw err;
    }
}
let logoutCallback: () => Promise<void> = () => {
    throw "Function is not implemented!";
}
export const setLogoutCallback = (callback: () => Promise<void>) => {
    logoutCallback = callback;
}

export const pokemonApi = axios.create({
    baseURL : SERVER_URL
})

export const axiosWithAuth = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
});

axiosWithAuth.interceptors.request.use(async (config) => {
    const session: string | undefined = getItem("user_session", true);
    if (session) {
        config.headers["Authorization"] = `Bearer ${session}`
    }
    return config;
}, (error: AxiosError) => (Promise.reject(error)));


axiosWithAuth.interceptors.response.use((response) => response,
    async (error) => {
        const config = error.config;
        if (error.response?.status === 401 && !config._retry && error.response.headers['x-token-expired']) {
            config._retry = true;
            try {
                const access_token = await refreshAccessToken();
                setItem("user_session", access_token, true);
                return axiosWithAuth(config);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                logoutCallback();
                return Promise.reject(refreshError);
            }
        }
        else if (error.response?.status === 401) {
            logoutCallback();
        }
        return Promise.reject(error);
    }
);




