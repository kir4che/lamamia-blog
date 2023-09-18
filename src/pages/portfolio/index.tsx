import Link from "next/link"

const Portfolio: React.FC = () => {
  return (
    <div>
      <h1 className="text-7xl font-bold">Our Works</h1>
      <h2 className='my-5 text-lg font-'>Choose a gallery</h2>
      <div className='flex flex-col gap-12 items-baseline justify-between lg:flex-row'>
        <div className='rounded-md w-full h-[48vw] max-h-[480px] lg:w-[360px] grayscale bg-gradient-to-r p-1.5 from-emerald-300 to-teal-200 hover:grayscale-0'>
          <Link href='/portfolio/illustrations' className="bg-[url('/illustration.png')] rounded-md relative flex bg-center bg-cover h-full">
            <span className='absolute text-4xl font-bold text-white right-4 bottom-4'>Illustrations</span>
          </Link>
        </div>
        <div className='rounded-md w-full h-[48vw] max-h-[480px] lg:w-[360px] grayscale bg-gradient-to-r p-1.5 from-emerald-300 to-teal-200 hover:grayscale-0'>
          <Link href='/portfolio/websites' className="bg-[url('/websites.jpg')] rounded-md relative flex bg-center bg-cover h-full">
            <span className='absolute text-4xl font-bold text-white right-4 bottom-4'>Websites</span>
          </Link>
        </div>
        <div className='rounded-md w-full h-[48vw] max-h-[480px] lg:w-[360px] grayscale bg-gradient-to-r p-1.5 from-emerald-300 to-teal-200 hover:grayscale-0'>
          <Link href='/portfolio/applications' className="bg-[url('/apps.jpg')] rounded-md relative flex bg-center bg-cover h-full">
            <span className='absolute text-4xl font-bold text-white right-4 bottom-4'>Applications</span>
          </Link>
        </div>
      </div>
    </div >
  )
}

export default Portfolio