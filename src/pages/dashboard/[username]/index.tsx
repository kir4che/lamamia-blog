"use client"

import Loading from '@/components/Loading'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import useSWR from 'swr'

interface BlogPostItem {
  _id: string
  title: string
  desc: string
  image: string
  content: string
  username: string
}

const DashboardByUser: React.FC = () => {
  const router = useRouter()

  const { username } = router.query

  const session = useSession()

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    img: '',
    content: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((response) => response.json())

  const { data, mutate, isLoading } = useSWR<BlogPostItem[]>(
    `/api/posts?username=${username}`,
    fetcher
  )

  if (session.status === 'loading') return <Loading />
  if (session.status === 'unauthenticated') router?.push('/dashboard/login')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          desc: formData.desc,
          image: formData.img,
          content: formData.content,
          username,
        }),
      })
      mutate()
      setFormData({
        title: '',
        desc: '',
        img: '',
        content: '',
      })
    } catch (err) {
      console.error(err)
    }
  }

  // 執行文章刪除
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
      mutate()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    session.status === 'authenticated' ? (
      <div className='flex gap-12'>
        <div className='flex-1'>
          {isLoading
            ? <Loading />
            : data?.map(post => (
              <div className='flex gap-2 flex-col border md:flex-row' key={post._id}>
                <Link href={`/blog/${post._id}`} className='flex gap-4 flex-col md:flex-row'>
                  <div className='h-40 w-auto md:w-2/3'>
                    <Image
                      src={post.image}
                      alt='blog-image'
                      width={400}
                      height={200}
                      className='inset-0 h-full w-full object-cover object-center'
                    />
                  </div>
                  <div className='w-full flex flex-col justify-around'>
                    <h2>{post.title}</h2>
                    <p className='text-sm opacity-80 line-clamp-3 leading-6'>{post.desc}</p>
                  </div>
                </Link>
                <button className="text-2xl bg-zinc-100/80 dark:bg-zinc-800/80 px-2" onClick={() => handleDelete(post._id)}><IoCloseSharp /></button>
              </div>
            ))}
        </div>
        <form className='flex-1 flex flex-col gap-5 mb-2' onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type='text' name='title' placeholder='Title' value={formData.title} onChange={handleChange} className='bg-zinc-200 dark:bg-zinc-950 font-medium p-4 outline-none' />
          <input type='text' name='desc' placeholder='Desc' value={formData.desc} onChange={handleChange} className='bg-zinc-200 dark:bg-zinc-950 font-medium p-4 outline-none' />
          <input type='text' name='img' placeholder='Image' value={formData.img} onChange={handleChange} className='bg-zinc-200 dark:bg-zinc-950 font-medium p-4 outline-none' />
          <textarea
            placeholder='Content'
            name='content'
            className='bg-zinc-200 dark:bg-zinc-950 font-medium p-4 outline-none'
            cols={30}
            rows={10}
            value={formData.content} onChange={handleChange}
          ></textarea>
          <button type='submit' className='w-full rounded-md py-2.5 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium'>Send</button>
        </form>
      </div>
    ) : null
  )
}

export default DashboardByUser