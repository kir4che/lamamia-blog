import Image from "next/image"
import Hero from "/public/hero.png"

export default function Home() {
  return (
    <div className='flex items-center gap-24'>
      <div className='flex-1 flex flex-col gap-12'>
        <h1 className='text-7xl text-transparent bg-gradient-to-b bg-clip-text from-emerald-600 to-zinc-300'>
          Better design for your digital products.
        </h1>
        <p className='text-2xl font-light'>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
      </div>
      <div className='flex-1 flex flex-col gap-12'>
        <Image src={Hero} width={1000} height={1000} alt="Hero" className='w-full object-contain animate-home_move' />
      </div>
    </div>
  )
}