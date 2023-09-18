import Button from "@/components/Button"
import Image from "next/image"

const Contact: React.FC = () => {
  return (
    <div>
      <h1 className='text-6xl text-center mb-20'>Let&aposs Keep in Touch</h1>
      <div className='flex items-center gap-24'>
        <div className='flex-1 h-[480px] relative'>
          <Image
            src="/contact.png"
            alt="contact"
            fill={true}
            className='object-contain animate-contact_move'
          />
        </div>
        <form className='flex-1 flex flex-col gap-5 mb-2'>
          <input type="text" placeholder="name" className='bg-zinc-200 dark:bg-zinc-950 font-medium p-4 outline-none' />
          <input type="text" placeholder="email" className='bg-zinc-200 dark:bg-zinc-950 font-medium p-4 outline-none' />
          <textarea
            className='bg-zinc-200 dark:bg-zinc-950 font-medium p-4 outline-none'
            placeholder="message"
            cols={30}
            rows={8}
          ></textarea>
          <Button url="#" text="Send" isFull={true} />
        </form>
      </div>
    </div>
  )
}

export default Contact
