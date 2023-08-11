import { AxiosResponse } from "axios";
import { axiosWithAuth } from "../axios-auth";
import { Pokemon } from "models";

export class TrainerUtil {
    static async catchPokemon(user_id: number | undefined, pokemon_id: number | undefined) {
        if (user_id && pokemon_id) {
            try {
                const res: AxiosResponse = await axiosWithAuth.post(`/api/v1/trainers/${user_id}/catch/${pokemon_id}`);
                console.log(res);
            } catch (err) {
                console.log("err");
            }
        }
    }


    static async wishPokemon(user_id: number | undefined, pokemon_id: number | undefined) {
        if (user_id && pokemon_id) {
            try {
                const res: AxiosResponse = await axiosWithAuth.post(`/api/v1/trainers/${user_id}/wishlist/${pokemon_id}`);
                console.log(res);
            } catch (err) {
                console.log("err");
            }
        }
    }

    static async getWishList(user_id: number | undefined) {
        let pokemons: Pokemon[] = []
        if (user_id) {
            try {
                const res: AxiosResponse = await axiosWithAuth.get(`/api/v1/trainers/wishlist/${user_id}`);
                pokemons = res.data;
            } catch (err) {
                console.log("err");
            }
        }
        return pokemons;
    }

    static async getCatchList(user_id: number | undefined) {
        let pokemons: Pokemon[] = []
        if (user_id) {
            try {
                const res: AxiosResponse = await axiosWithAuth.get(`/api/v1/trainers/catchlist/${user_id}`);
                pokemons = res.data;
            } catch (err) {
                console.log(err);
            }
        }
        return pokemons;
    }

    static async removeFromWishList(user_id: number | undefined, ids: string) {
        if (user_id && ids) {
            try {
                const res: AxiosResponse = await axiosWithAuth.post(`api/v1/trainers/${user_id}/wishlist/`, {pokemon_ids : ids});

            } catch (err) {
                console.log(err);
            }
        }
    }

    static async removeFromCatchList(user_id: number | undefined, ids: string) {
        if (user_id && ids) {
            try {
                const res: AxiosResponse = await axiosWithAuth.post(`api/v1/trainers/${user_id}/catch/`, {pokemon_ids : ids});

            } catch (err) {
                console.log(err);
            }
        }
    }
}


