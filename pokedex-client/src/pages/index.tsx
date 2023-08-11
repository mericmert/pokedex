import Head from 'next/head'
import Hero from '@/components/Hero';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import PageLoader from '@/components/loaders/PageLoader';
export default function Home() {

  const {data : session, isUserLoading} = useAuth();

  if (isUserLoading) return <PageLoader/>;
  
  return (
    <div className='relative w-full'>
      <Head>
        <title>Pokedex</title>
      </Head>
      <div className='fixed -z-10 w-full h-screen top-0'>
        <Image
          src={"/pikachu-ash.png"}
          alt="ash"
          width={800}
          height={800}
          className='absolute w-[50vw] right-16 bottom-0 hidden xl:block'
        />
      </div>
      <div>
        <main className='relative hero w-full'>
          <div className='absolute left-[0] right-[0] m-auto md:left-[10%] md:right-auto top-8 w-[400px] md:w-[600px]'>
            <Hero />
          </div>
        </main>
      </div>
    </div>
  )
}
