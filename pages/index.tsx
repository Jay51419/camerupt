import Head from 'next/head'
import Link from 'next/link'
import Brand from '../components/brand'
import TexturedBg from '../components/textured-bg'

export default function Home() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TexturedBg />
        <Brand />
        <div className='h-screen w-full flex flex-col justify-center md:items-center'>
          <h2 className='pl-4 md:text-center text-4xl md:text-6xl font-semibold' >Keep track <span className='block md:inline' >of your</span>  <span className='block font-extrabold text-primary'>Dreams</span> </h2>
          <p className='pl-4 md:text-center mt-8 text-sm md:text-lg' >
            We remind you weekly about your dreams via mail.
            <span className='md:block' > You can easily add new dreams with the help </span>
            of <Link href={"/dashboard"} className='text-primary' >dashboard</Link>.
          </p>
          <Link href={"/dashboard"} className=' bg-primary px-4 py-4 mt-12' >
            <span className='font-["Hanalei_Fill"] text-3xl text-white'>Try Now</span>
          </Link>
        </div>
      </main>
    </>
  )
}


