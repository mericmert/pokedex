import { Pokemon, User } from "models";
import { axiosWithAuth, pokemonApi } from "../axios-auth";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export class UserUtil {

    static async getUsers(): Promise<User[]> {
        let users: User[] = [];
        try {
            const res: AxiosResponse = await axiosWithAuth.get("/api/v1/users/");
            users = res.data;
        } catch (err) {
            console.log(err);
        }
        return users;
    }

    static async removeUsers(idList: string): Promise<void> {
        try {
            const res: AxiosResponse = await axiosWithAuth.post("/api/v1/users/delete", {
                idList: idList
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log(err);
                toast.error("Something went wrong!");
            }
        }
    }

    static async updateUser(user_id: number | null, data: any) {
        try {
            const res: AxiosResponse = await axiosWithAuth.put(`/api/v1/users/${user_id}`, data);
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error("Something went wrong!");
            }
        }
    }



}