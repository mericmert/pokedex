
declare module "models" {

    export type PokemonFormData = {
        name : string,
        info : string,
        height : number,
        weight : number,
        hp : number,
        attack : number,
        defence : number,
        speed : number,
        [key: string] : any
    }
    

    type User = {
        id : number,
        username : string,
        email : string,
        password : string,
        role : string,
        enabled : boolean,
        createdAt : string,
        updatedAt : string
    }

    type PokemonType = {
        id : number,
        color : string,
        name : string
    }

    type PokemonImage = {
        name : string,
        type : string
    }

    type Pokemon = {
        id: number,
        name: string,
        hp: number
        defence: number
        speed: number
        height: number,
        weight: number,
        attack: number,
        types?: PokemonType[]
        info? : string       
        image : PokemonImage
    }

}