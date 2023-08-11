import AdminPanel from "@/components/AdminPanel";
import CreatePokemonForm from "@/components/pokemon/CreatePokemonForm";
import AdminProvider from "@/contexts/AdminContext";
import Head from "next/head";

export default function Admin() {
    return (
        <>
            <Head>
                <title>Explore</title>
            </Head>
            <main className="w-[max(80%,450px)] m-auto ">
                <AdminProvider>
                    <AdminPanel />
                </AdminProvider>
            </main>
        </>
    )
}
