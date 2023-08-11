import WishList from "@/components/WishList";
import { useAuth } from "@/contexts/AuthContext";
import { TrainerUtil } from "@/lib/utils/TrainerUtil";
import { Pokemon } from "models";
import Head from "next/head";
import { useEffect, useState } from "react";


export default function Wishlist() {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const { data: session, isAuthenticated } = useAuth();
    const [deleteButton, setDeleteButton] = useState<boolean>(false)
    const [enabledIds, setEnabledIds] = useState<number[]>([]);

    const fetchWishList = async () => {
        let res: Pokemon[] = await TrainerUtil.getWishList(session?.user.id);
        setPokemons(prev => ([...res]));
    }
    const handleRemove = async () => {
        await TrainerUtil.removeFromWishList(session?.user.id, enabledIds.join("|"));
        setEnabledIds([]);
    }

    useEffect(() => {
        fetchWishList();
    }, [session, enabledIds])

    useEffect(() => {
        if (enabledIds.length > 0)
            setDeleteButton(true);
        else
            setDeleteButton(false);
    }, [enabledIds])

    return (
        <>
            <Head>
                <title>Wishlist</title>
            </Head>
            <div className="w-full text-sky-900">
                <h1 className="text-3xl text-center mt-16 font-semibold">MY WISHLIST</h1>
                <div className="w-full">
                    <WishList pokemons={pokemons} enabledIds={enabledIds} setEnabledIds={setEnabledIds} />
                </div>
                {deleteButton &&
                    <button onClick={handleRemove} className="fixed bottom-0 left-[calc(50%-80px)] mt-8 mb-8 rounded-md h-10 w-40 bg-red-500 text-white flex justify-center items-center">
                        Remove
                    </button>}
            </div>
        </>

    )
}
