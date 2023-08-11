import Link from "next/link";

export default function Hero() {
    return (
        <div className='relative rounded-md w-full p-4'>
            <div className="text-6xl text-sky-900 text-center md:text-left">
                <h1 className='text-6xl text-pokeblue font-bold'>
                    Your Pokedex Guide:
                </h1>
                <h1 className="text-5xl">Discover the Wonders of the Pokemons</h1>
            </div>
            <h2 className='text-xl mt-8 text-pokeblue/[.8] text-center md:text-left'>
                Explore, Learn, and Catch Various Pokemon Species!
            </h2>
            <div className="button-container flex gap-x-4 mt-12 justify-center md:justify-start text-lg font-bold">
                <Link href="/explore">
                    <button className='h-12 w-40 bg-gradient-to-r from-pokeblue to-sky-600 text-white rounded-lg'>Explore</button>
                </Link>
                <Link href="/signup">
                    <button className='h-12 w-40 bg-gradient-to-r from-pokeyellow to-yellow-200 text-sky-900 border-2 border-sky-900 rounded-lg'>Become Trainer</button>
                </Link>
            </div>
        </div>
    )
}
