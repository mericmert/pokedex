import { Pokemon } from "models";
import { axiosWithAuth, pokemonApi } from "../axios-auth";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export class PokemonUtil {

    static async getPokemons(page: number = 0, size: number = 8, name: string = "", sortBy: string = "", types: string = "", pagination: boolean = false): Promise<Pokemon[]> {
        let pokemon_data: Pokemon[] = [];
        try {
            if (pagination) {
                const res: AxiosResponse =
                    await pokemonApi.get(`/api/v1/pokemons/?page=${page}&size=${size}&name=${name ?? ""}&sortBy=${sortBy ?? ""}&types=${types ?? ""}`);
                pokemon_data = res.data;
            }
            else {
                const res: AxiosResponse = await pokemonApi.get(`/api/v1/pokemons/`);
                pokemon_data = res.data;
            }

        } catch (err) {
            console.log(err);
        }
        return pokemon_data;
    }

    static async savePokemon(fd: FormData) {
        let res: AxiosResponse = await axiosWithAuth.post("/api/v1/pokemons/", fd, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res;
    }

    static async updatePokemon(user_id: number, data: FormData) {
        let res: AxiosResponse = await axiosWithAuth.put(`/api/v1/pokemons/${user_id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res;

    }

    static async removePokemons(idList: string): Promise<void> {
        try {
            const res: AxiosResponse = await axiosWithAuth.post("/api/v1/pokemons/delete", {
                idList: idList
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error("Something went wrong!");
            }
        }
    }


}