import User from '@/models/User'
import connect from '@/utils/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const { name, email, password } = await request.json()

  try {
    await connect()

    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    return new NextResponse('User has been created', {
      status: 201,
    })
  } catch (err) {
    const error = err as Error
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
