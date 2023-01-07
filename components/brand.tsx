import Link from "next/link";

const Brand = () => {
    return (
        <div className='bg-[url("/background.jpg")] fixed top-0 h-20 w-full flex justify-between md:justify-center items-center px-4' >
            <Link href={"/"} >
                <h1 className='font-["Hanalei_Fill"] text-4xl md:text-5xl  text-primary' >CAMERUPT</h1>
            </Link>
        </div>
    )
}

export default Brand;