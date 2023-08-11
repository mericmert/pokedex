import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import Image from 'next/image';
import Link from 'next/link';
import PokeballLoader from '../loaders/PokeballLoader';
import { useState } from 'react';
import { LoginData, useAuth } from '@/contexts/AuthContext';


export default function LoginForm() {
    const { signIn } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<LoginData>({
        username: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await signIn(loginData);
        setIsLoading(false);
    }

    return (
        <form
            className='text-orange-900 bg-white relative min-w-[24em] sm:min-w-[30em] flex flex-col gap-y-4 shadow-xl px-5 sm:px-10 pt-10 pb-12 rounded-sm'
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl font-semibold mb-4 text-center">
                Step into the Pokemon Universe
            </h1>
            <div className="flex flex-col label-input-container gap-y-2">
                <span>Username</span>
                <div className="relative input-container">
                    <AccountCircleOutlinedIcon className="absolute top-[9px] left-2 text-orange-900" />
                    <input
                        onChange={(e) => handleChange(e)}
                        name="username"
                        aria-autocomplete='none'
                        autoComplete='off'
                        maxLength={25}
                        required={true}
                        className='w-full h-11 p-3 px-9 border-[1px] rounded-md outline-orange-500' />
                </div>
            </div>
            <div className="flex flex-col mt-2 label-input-container gap-y-2 ">
                <div className="flex justify-between">
                    <span>Password</span>

                </div>
                <div className="input-container relative">
                    <HttpsOutlinedIcon className="absolute top-[9px] left-2 text-orange-900" />
                    <input
                        onChange={(e) => handleChange(e)}
                        name="password"
                        aria-autocomplete='none'
                        autoComplete='none'
                        maxLength={35}
                        type="password"
                        required={true}
                        className='w-full h-11 p-3 px-9 border-[1px] rounded-md outline-orange-500' />
                </div>

            </div>
            <button className='flex justify-center items-center w-full h-11 mt-4 text-white bg-orange-500 rounded-md outline-orange-600'>
                {isLoading ? <PokeballLoader /> : "Log in"}
            </button>
            <Link href={"/signup"} className='mt-4'>
                <span>Don&apos;t you have an account? Sign up</span>
            </Link>
            <Image
                alt='charmander'
                src={"/Charmander-PNG.png"}
                width={96}
                height={96}
                priority={true}
                className='absolute -right-12 sm:-right-12 -top-12 sm:-top-8'
            />
            <Image
                alt='fireball'
                src={"/fireball.png"}
                width={96}
                height={96}
                priority={true}
                className='absolute -right-0 sm:-right-0 -top-8 sm:-top-5'
            />

        </form>

    )
}
