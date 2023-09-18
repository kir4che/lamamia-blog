import Post from '@/models/Post'
import connect from '@/utils/db'
import { NextResponse } from 'next/server'

// 定義處理 HTTP 請求的函式型別
type RequestHandler = (request: Request, context: { params: { id: string } }) => Promise<NextResponse>

// 以文章 id 取得單篇文章
export const GET: RequestHandler = async (request, { params }) => {
  // 取得文章 id
  const { id } = params

  try {
    await connect()

    // 透過 id 找到該篇文章
    const post = await Post.findById(id)

    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

// 刪除文章
export const DELETE: RequestHandler = async (request, { params }) => {
  const { id } = params

  try {
    await connect()

    // 透過 id 找到該篇文章並刪除
    await Post.findByIdAndDelete(id)

    return new NextResponse('Post has been deleted.', { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error!', { status: 500 })
  }
}
