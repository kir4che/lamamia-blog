import Button from "@/components/Button"
import Image from "next/image"

const About: React.FC = () => {
  return (
    <>
      <div className='w-full h-[300px] relative'>
        <Image
          src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg"
          fill={true}
          alt=""
          className='object-cover grayscale'
        />
        <div className='absolute bg-emerald-600 text-white p-1.5 left-5 bottom-5'>
          <h1>Digital Storytellers</h1>
          <h2>
            Handcrafting award winning digital experiences
          </h2>
        </div>
      </div>
      <div className='flex flex-col gap-2 md:flex-row md:gap-16 lg:gap-28'>
        <div className=' flex flex-col gap-8 mt-10 md:flex-1'>
          <h1>Who Are We?</h1>
          <p className='text-lg font-light text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            quae dolor, optio voluptatibus magnam iure esse tempora beatae. A
            suscipit eos. Animi quibusdam cum omnis officiis voluptatum quo ea
            eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ducimus quae dolor, optio voluptatibus magnam iure esse tempora
            beatae, a suscipit eos. Animi quibusdam cum omnis officiis
            <br />
            <br />
            voluptatum quo ea eveniet? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ducimus quae dolor, optio voluptatibus magnam iure
            esse tempora beatae, a suscipit eos. Animi quibusdam cum omnis
            officiis voluptatum quo ea eveniet?
          </p>
        </div>
        <div className='flex-1 flex flex-col gap-8 mt-10'>
          <h1>What We Do?</h1>
          <p className='text-lg font-light text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            quae dolor, optio voluptatibus magnam iure esse tempora beatae, a
            suscipit eos. Animi quibusdam cum omnis officiis voluptatum quo ea
            eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit. -
            Creative Illustrations
            <br />
            <br /> - Dynamic Websites
            <br /> - Fast and Handy
            <br /> - Mobile Apps
          </p>
          <Button url="/contact" text="Contact" isFull={false} />
        </div>
      </div>
    </>
  )
}

export default About