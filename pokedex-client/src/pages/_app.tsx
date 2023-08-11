import '@/styles/globals.css';
import '@/styles/loader.css';
import '@/styles/mui.css';
import '@/styles/card.css';

import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import CollectionProvider from '@/contexts/CollectionProvider';

const pagesWithNoNavbar: string[] = ["/login", "/signup"];

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <>
      <NextNProgress />
      <AuthProvider>
        <CollectionProvider>
          {!pagesWithNoNavbar.includes(router.pathname) && <Navbar />}
          <Component {...pageProps} />
        </CollectionProvider>
      </AuthProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}
