import Post from '@/models/Post'
import connect from '@/utils/db'
import { NextResponse } from 'next/server'

// 取得所有文章
export const GET = async (request: Request) => {
  // 取得使用者傳過來的資料
  const url = new URL(request.url)
  // 取得名為 username 的參數值
  const username = url.searchParams.get('username')

  try {
    // 連線到資料庫
    await connect()

    // 透過 username 來找出該使用者的所有文章
    const posts = await Post.find(username ? { username } : {})

    return new NextResponse(JSON.stringify(posts), { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error!', { status: 500 })
  }
}

// 新增文章
export const POST = async (request: Request) => {
  // 取得使用者傳過來的資料
  const body = await request.json()
  // 建立新的 Post 實例
  const newPost = new Post(body)

  try {
    await connect()
    // 將文章存入資料庫
    await newPost.save()

    return new NextResponse('Post has been created.', { status: 201 })
  } catch (err) {
    return new NextResponse('Database Error!', { status: 500 })
  }
}
