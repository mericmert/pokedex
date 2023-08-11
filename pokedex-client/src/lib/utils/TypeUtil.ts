import { axiosWithAuth } from "../axios-auth";

export class TypeUtil {

    static async createType(name : string, color : string){
        try{
            await axiosWithAuth.post("/api/v1/types/", {name, color});
        } catch (err){

        }
    }

}