import Loading from "@/components/Loading"
import HTMLReactParser from "html-react-parser"
import Head from "next/head"
import Image from 'next/image'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface BlogPostItem {
  _id: string
  title: string
  desc: string
  image: string
  content: string
  username: string
}

const BlogPost: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const [post, setPost] = useState<BlogPostItem>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`)
        if (response.status !== 200) throw new Error("Failed to fetch data!")
        const postData: BlogPostItem = await response.json()
        setPost(postData)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [id])

  // 產生文章的 metadata
  const metadata = {
    title: post?.title || 'Loading...',
    description: post?.desc || 'Please wait while the content is loading.'
  }

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      {post ? (
        <>
          <div className="w-full mx-auto relative" >
            <h2 className="text-4xl font-semibold leading-tight">
              {post.title}
            </h2>
            <span className="inline-block pt-3 pb-4 uppercase text-sm tracking-wide font-semibold text-emerald-600 dark:text-emerald-500">
              {post.username}
            </span>
            <Image
              src={post.image}
              alt='blog-image'
              width={400}
              height={200}
              className='h-[56vw] max-h-[600px] w-full object-cover'
            />
          </div>
          {/* 使用 HTMLReactParser 解析 HTML 字串，比如遇到 <br/> 會直接換行。 */}
          <p className="w-full pt-4 pb-6 leading-relaxed">{HTMLReactParser(post.content)}</p>
        </>
      ) : (
        <Loading />
      )}</>
  )
}

export default BlogPost