import Button from '@/components/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaArrowLeft } from 'react-icons/fa'
import items from './data.json'

interface Item {
  id: number
  title: string
  desc: string
  image: string
}

const Category: React.FC = () => {
  const router = useRouter()

  // 透過 url query 作為 category 的值取得對應的 data
  const { category } = router.query as { category: 'applications' | 'illustrations' | 'websites' }
  const data: Item[] = items[category]

  return (
    <div className='pt-6'>
      <div className='flex items-center mb-12 space-x-2'>
        <FaArrowLeft className='cursor-pointer text-zinc-600 dark:text-white hover:opacity-75' onClick={() => router.back()} />
        <h1 className='text-emerald-500 dark:text-emerald-300'>{category}</h1>
      </div>
      {data && data.map((item, index) => (
        <div className={`flex flex-col-reverse mb-20 gap-8 md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} md:gap-12 md:mb-32`} key={item.id}>
          <div className='flex flex-col justify-center gap-6 md:flex-1 md:gap-10'>
            <h1 className='text-5xl'>{item.title}</h1>
            <p className='leading-relaxed'>{item.desc}</p>
            <Button text='See More' url='#' isFull={false} />
          </div>
          <div className='h-[56vw] max-h-[480px] relative md:flex-1'>
            <Image
              className='object-cover'
              fill={true}
              src={item.image}
              alt=''
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Category