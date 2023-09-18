import Loading from '@/components/Loading'
import Image from 'next/image'
import Link from "next/link"
import { useEffect, useState } from "react"

interface BlogPostItem {
  _id: string
  title: string
  desc: string
  image: string
  content: string
  username: string
}

async function getData() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    // 不要使用也不儲存任何快取，每個請求都是從原始伺服器去取得資源。
    cache: "no-store",
  })
  if (response.status !== 200) throw new Error("Failed to fetch data!")
  return response.json()
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostItem[]>([])

  useEffect(() => {
    // 避免在非同步函式中使用 Promise.then()，而是使用 async/await。
    async function fetchData() {
      try {
        const fetchedData = await getData()
        setPosts(fetchedData)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  return (
    posts ? (
      <div className='space-y-10 md:space-y-20'>
        {posts.map((post) => (
          <Link href={`/blog/${post._id}`} className='flex gap-4 flex-col md:flex-row md:gap-12' key={post._id}>
            <div className="h-60 w-auto md:w-3/5">
              <Image
                src={post.image}
                alt='blog-image'
                width={400}
                height={200}
                className='inset-0 h-full w-full object-cover object-center'
              />
            </div>
            <div className="w-full flex flex-col justify-around space-y-2 md:space-y-0">
              <h1 className="font-semibold text-2xl truncate">{post.title}</h1>
              <p className='opacity-80'>{post.desc}</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-500 uppercase tracking-wide font-semibold mt-2">
                {post.username}
              </p>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <Loading />
    )
  )
}

export default Blog