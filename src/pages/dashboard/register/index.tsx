'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'

const Register: React.FC = () => {
  const router = useRouter()

  const [error, setError] = useState<Error>()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value

    // 檢查輸入的第二次密碼是否與第一次相同
    if (password !== confirmPassword) {
      setError(new Error('Passwords do not match!'))
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (response.status === 201) {
        // const message = await response.text()
        // console.log('Success:', message)
        router.push('/dashboard/login')
      } else {
        const errorResponse = await response.json()
        // console.error('Registration failed:', errorResponse.error)
        setError(new Error(errorResponse.error))
      }

    } catch (err) {
      setError(err as Error)
    }
  }

  return (
    <div className='flex flex-col justify-center pt-4 pb-20'>
      <div className='flex flex-col justify-center'>
        <h2 className='text-3xl text-center font-extrabold'>Create your Account</h2>
        <div className='mt-6 mx-auto w-full max-w-md'>
          <div className='py-8 px-4 shadow bg-zinc-50 dark:bg-zinc-800 sm:px-10'>
            <form className='space-y-6' method='POST' onSubmit={handleSubmit}>
              <div className='space-y-1.5'>
                <label className='block text-sm font-medium'>
                  Username
                </label>
                <input id='name' name='name' type='name' autoComplete='name' required ref={nameRef}
                  className='appearance-none rounded-md text-zinc-900 relative block w-full px-3 py-2 border placeholder-gray-500 focus:z-10 sm:text-sm outline-none'
                  placeholder='Enter your username'
                />
              </div>
              <div className='space-y-1.5'>
                <label className='block text-sm font-medium'>
                  Email
                </label>
                <input id='email' name='email' type='email' autoComplete='email' required ref={emailRef}
                  className='appearance-none rounded-md text-zinc-900 relative block w-full px-3 py-2 border placeholder-gray-500 focus:z-10 sm:text-sm outline-none'
                  placeholder='Enter your email addresponses'
                />
              </div>
              <div className='space-y-1.5'>
                <label className='block text-sm font-medium'>
                  Password
                </label>
                <input id='password' name='password' type='password' autoComplete='current-password' required ref={passwordRef}
                  className='appearance-none rounded-md text-zinc-900 relative block w-full px-3 py-2 border placeholder-gray-500 focus:z-10 sm:text-sm outline-none'
                  placeholder='Enter your password'
                />
              </div>
              <div className='space-y-1.5 pb-8'>
                <label className='block text-sm font-medium'>
                  Confirm Password
                </label>
                <input
                  id='confirmPassword' name='confirmPassword' type='password' autoComplete='new-password' required ref={confirmPasswordRef}
                  className='appearance-none rounded-md text-zinc-900 relative block w-full px-3 py-2 border placeholder-gray-500 focus:z-10 sm:text-sm outline-none'
                  placeholder='Confirm your password'
                />
              </div>
              <button type='submit' className='w-full rounded-md py-2.5 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium'>Create an Account</button>
              {error && <p className='mt-2 text-center text-red-500'>{error.message}</p>}
            </form>
            <div className='sm:flex sm:justify-center sm:space-x-2 mt-6 text-sm'>
              <p>Already have an account?</p>
              <Link href='/dashboard/login' className='text-emerald-500'>Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register