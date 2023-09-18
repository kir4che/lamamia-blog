import sgMail from '@sendgrid/mail'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import { NextResponse } from 'next/server'

import ResetToken from '@/models/ResetToken'
import User from '@/models/User'
import connect from '@/utils/db'

export const POST = async (request: Request) => {
  const { token, email, password } = await request.json()

  try {
    if (token && password) {
      await connect()

      // Reset password logic
      const resetToken = await ResetToken.findOne({ token })
      if (!resetToken) return new NextResponse('ResetToken not found!', { status: 404 })

      const user = await User.findOne({ email: resetToken.email })
      if (!user) return new NextResponse('User not found!', { status: 404 })

      const hashedPassword = await bcrypt.hash(password, 5)
      user.password = hashedPassword

      await user.save()
      await resetToken.deleteOne()

      return new NextResponse('Your password has been successfully reset.', {
        status: 201,
      })
    } else {
      if (!process.env.SENDGRID_API_KEY) throw new Error('SENDGRID_API_KEY is not defined!')
      else sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      await connect()

      // Send reset email logic
      const user = await User.findOne({ email })
      if (!user) return new NextResponse('User not found!', { status: 404 })

      const tokenParam = randomBytes(32).toString('base64').replace(/[+/=]/g, '')
      const resetLink = `${process.env.NEXTAUTH_URL}/dashboard/resetPassword?token=${tokenParam}`

      const resetToken = new ResetToken({
        email,
        token: tokenParam
      })

      await resetToken.save()

      const msg = {
        to: email,
        from: 'mollydcxxiii@gmail.com',
        subject: 'Lamamia Blog: Password Reset Link',
        text: `Hello, ${user.name}\n\nWe've received a request to reset the password for this user account.\n\nReset Your Password:\n${resetLink}\n\nIf you didn't ask to reset your password, you can ignore this email.\n\nBest regards,\nLamamia Blog`,
      }

      await sgMail.send(msg)

      return new NextResponse('Password reset link sent.', {
        status: 200,
      })
    }
  } catch (err) {
    const error = err as Error
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
