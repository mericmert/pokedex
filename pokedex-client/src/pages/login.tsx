import Head from 'next/head';
import LoginForm from '@/components/auth/LoginForm';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import PageLoader from '@/components/loaders/PageLoader';

export default function Login() {
    const router = useRouter();
    const { isAuthenticated, isUserLoading } = useAuth();

    if (isUserLoading) {
        return <PageLoader />
    }
    if (isAuthenticated) {
        router.replace("/")
        return;
    }

    return (
        <>
            <Head>
                <title>Log in</title>
            </Head>
            <div className='relative login-page-container h-screen w-full flex justify-center items-center'>
                <div className="fixed z-0 -top-[300px] bottom-0 left-0 right-0 -skew-y-[12deg] w-full h-full bg-slate-50 origin-[0]">
                    <div className="z-10 absolute stripe h-10 bg-orange-600 opacity-70 bottom-0 left-[0] right-[calc(50%+460px)]" />
                    <div className="z-10 absolute stripe h-10 bg-orange-900 opacity-70 bottom-8 left-[calc(50%-650px)] right-[calc(50%+540px)]" />
                    <div className="z-10 absolute stripe h-10 bg-orange-900 opacity-70 -bottom-8 left-[calc(50%+360px)] right-0" />
                    <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-gray-200 left-[calc(50%-540px)]" />
                    <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-gray-100 left-[calc(50%+192px)] sm:left-[calc(50%+240px)]" />
                    <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-gray-100 left-[calc(50%-193px)] sm:left-[calc(50%-241px)]" />
                    <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-gray-200 left-[calc(50%+541px)]"></div>
                    <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-gray-200 left-[calc(50%)]"></div>
                </div>
                <LoginForm />
            </div>
        </>
    )
}
