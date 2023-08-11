import { axiosWithAuth, setLogoutCallback } from '@/lib/axios-auth'
import { getItem, removeItem, setItem } from '@/lib/storage'
import { AxiosError, AxiosResponse } from 'axios'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export type Session = {
    exp: number,
    iat: number,
    sub: string,
    user: {
        id: number,
        username: string,
        email: string,
        accessToken?: string,
        role: string
    }
}

type AuthContextData = {
    isAuthenticated?: boolean,
    accessToken?: string,
    isUserLoading?: boolean,
    data?: Session,
    signIn: (data: LoginData) => Promise<void>,
    signUp: (data: SignupData) => Promise<void>,
    logout: () => Promise<void>
}

export type LoginData = {
    username: string,
    password: string
}

export type SignupData = {
    username: string,
    email: string,
    password: string
}

const AuthContext = createContext<AuthContextData>({
    signIn: function (data: LoginData): Promise<void> {
        throw new Error('Function not implemented.')
    },
    signUp: function (data: SignupData): Promise<void> {
        throw new Error('Function not implemented.')
    },
    logout: function (): Promise<void> {
        throw new Error('Function not implemented.')
    }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const [data, setData] = useState<Session | undefined>();
    const [isUserLoading, setUserLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUserByStorage = () => {
            const token: string | undefined = getItem("user_session", true);
            if (token) {
                setAuth(token);
            }
        }
        loadUserByStorage();
        setLogoutCallback(logout);
        setUserLoading(false);
    }, [])

    const signUp = async (data: SignupData): Promise<void> => {
        try {
            let res: AxiosResponse = await axiosWithAuth.post("/api/v1/auth/register", data);
            toast.success("You have succesfully signed up!");
            router.replace("/login");
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.status === 401) {
                    toast.error("User already exists!", { position: "top-center" });
                } else {
                    toast.error("Something went wrong!", { position: "top-center" });
                }
            }
        }
    }

    const signIn = async (data: LoginData): Promise<void> => {
        try {
            let res: AxiosResponse = await axiosWithAuth.post("/api/v1/auth/login", data);
            const token: string = res.data["access-token"];
            setItem("user_session", token, true);
            setAuth(token);

            router.replace("/");
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    toast.error("Bad credentials!", { position: 'top-center' });
                } else {
                    toast.error("Something went wrong!", { position: "top-center" });
                }
            }
        }
    }

    const setAuth = (token: string): void => {
        let session: Session = jwtDecode(token);
        session.user.accessToken = token;
        setData(session);

    }

    const logout = async (): Promise<void> => {
        try {
            let res: AxiosResponse = await axiosWithAuth.get("/api/v1/auth/logout");
        } catch (err) {

        } finally {
            setData(undefined);
            router.replace("/login");
            removeItem("user_session");
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!data, isUserLoading, data, signIn, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

