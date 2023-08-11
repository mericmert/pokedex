import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import PokeballLoader from '../loaders/PokeballLoader';
import { SignupData, useAuth } from '@/contexts/AuthContext';


export default function SignupForm() {
    const { signUp } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signupData, setSignupData] = useState<SignupData>({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await signUp(signupData);
        setIsLoading(false);

    }

    return (
        <form
            className='text-green-900 bg-white relative min-w-[24em] sm:min-w-[30em] flex flex-col gap-y-4 shadow-xl px-5 sm:px-10 pt-10 pb-12 rounded-sm'
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl font-semibold mb-4 text-center">
                Become a Master Trainer
            </h1>
            <div className="flex flex-col label-input-container gap-y-2">
                <div className="relative input-container">
                    <EmailOutlinedIcon className="absolute top-[9px] left-2 text-green-900" />
                    <input
                        onChange={(e) => handleChange(e)}
                        name="email"
                        type='email'
                        aria-autocomplete='none'
                        autoComplete='off'
                        required={true}
                        maxLength={40}
                        className='w-full h-11 p-3 px-9 border-[1px] rounded-md outline-green-500'
                        placeholder='Email' />
                </div>
            </div>
            <div className="flex flex-col label-input-container gap-y-2">
                <div className="relative input-container">
                    <AccountCircleOutlinedIcon className="absolute top-[9px] left-2 text-green-900" />
                    <input
                        onChange={(e) => handleChange(e)}
                        name="username"
                        aria-autocomplete='none'
                        autoComplete='off'
                        required={true}
                        maxLength={25}
                        className='w-full h-11 p-3 px-9 border-[1px] rounded-md outline-green-500'
                        placeholder='Username' />
                </div>
            </div>
            <div className="flex flex-col mt-2 label-input-container gap-y-2 ">
                <div className="input-container relative">
                    <HttpsOutlinedIcon className="absolute top-[9px] left-2 text-green-900" />
                    <input
                        onChange={(e) => handleChange(e)}
                        name="password"
                        aria-autocomplete='none'
                        autoComplete='none'
                        maxLength={35}
                        required={true}
                        type="password"
                        className='w-full h-11 p-3 px-9 border-[1px] rounded-md outline-green-500'
                        placeholder='Password' />
                </div>
            </div>

            <button className='flex justify-center items-center w-full h-11 mt-4 text-white bg-green-500 rounded-md'>
                {isLoading ? <PokeballLoader /> : "Sign up"}
            </button>
            <Link href={"/login"} className='mt-4'>
                <span>Do you already have an account? Log in</span>
            </Link>
            <Image
                alt='charmander'
                src={"/Pokemon-Bulbasaur-PNG.png"}
                width={96}
                height={96}
                priority={true}
                className='absolute -left-12 sm:-left-12 -top-12 sm:-top-8'
            />
        </form>
    )
}
