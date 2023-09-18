import Image from "next/image"

const Footer: React.FC = () => {
  return (
    <div className='h-20 text-sm flex items-center justify-between'>
      <div>©2023 Lamamia. All rights responseerved.</div>
      <div className='flex items-center gap-2.5'>
        <Image src="/1.png" width={15} height={15} className='h-6 w-6 cursor-pointer dark:opacity-70' alt="Lama Dev Facebook" />
        <Image src="/2.png" width={15} height={15} className='h-6 w-6 cursor-pointer dark:opacity-70' alt="Lama Dev Instagram" />
        <Image src="/3.png" width={15} height={15} className='h-6 w-6 cursor-pointer dark:opacity-70' alt="Lama Dev Twitter" />
        <Image src="/4.png" width={15} height={15} className='h-6 w-6 cursor-pointer dark:opacity-70' alt="Lama Dev Youtube" />
      </div>
    </div>
  )
}

export default Footer