'use client'

import Loading from '@/components/Loading'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'

const Login: React.FC = () => {
  const session = useSession()
  const router = useRouter()

  const [error, setError] = useState<Error>()

  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [rememberMe, setRememberMe] = useState(false)

  if (session.status === "loading") return <Loading />
  if (session.status === "authenticated") router?.push(`/dashboard/${nameRef}`)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = nameRef.current?.value
    const password = passwordRef.current?.value

    try {
      await signIn('credentials', {
        name,
        password,
        callbackUrl: `/dashboard/${name}`, // Redirect URL after successful login
        remember: rememberMe, // Set the remember option
      })
    } catch (err) {
      setError(err as Error)
    }
  }

  return (
    <div className='flex flex-col justify-center pt-4 pb-20'>
      <div className='flex flex-col justify-center'>
        <h2 className='text-3xl mb-2 text-center font-extrabold'>
          Login to your account
        </h2>
        <p className='max-w text-sm text-center'>
          Or{' '}
          <Link className='font-medium text-emerald-500 hover:text-emerald-400' href=' /dashboard/register'>
            Create an Account
          </Link>
        </p>
        <div className='mt-6 mx-auto w-full max-w-md'>
          <div className='py-8 px-4 shadow sm:px-10 bg-zinc-50 dark:bg-zinc-800 rounded-md'>
            <form className='space-y-6' method='POST' onSubmit={handleSubmit}>
              <div className='space-y-1.5'>
                <label className='block text-sm font-medium'>
                  Username
                </label>
                <input id='name' name='name' type='name' autoComplete='name' required ref={nameRef}
                  className='appearance-none rounded-md text-zinc-900 relative block w-full px-3 py-2 border placeholder-gray-500 focus:z-10 sm:text-sm outline-none'
                  placeholder='Enter your username' />
              </div>
              <div className='space-y-1.5'>
                <label className='block text-sm font-medium'>
                  Password
                </label>
                <input id='password' name='password' type='password' autoComplete='current-password' required ref={passwordRef}
                  className='appearance-none rounded-md text-zinc-900 relative block w-full px-3 py-2 border placeholder-gray-500 focus:z-10 sm:text-sm outline-none'
                  placeholder='Enter your password' />
              </div>
              <div className='flex items-center pb-8 justify-between'>
                <div className='flex items-center'>
                  <input className='h-4 w-4' type='checkbox' checked={true} onChange={() => setRememberMe(!rememberMe)} />
                  <label htmlFor='remember_me' className='ml-2 block text-sm'>Remember me</label>
                </div>
                <Link href={'/dashboard/forgotPassword'} className='text-sm text-emerald-500 hover:text-emerald-400'>Forgot your password?</Link>
              </div>
              <button type='submit' className='w-full rounded-md py-2.5 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium'>Login</button>
              {error && <p className='mt-2 text-center text-red-500'>{error.message}</p>}
            </form>
            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-zinc-50 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300'>Or continue with</span>
                </div>
              </div>
              <div className='mt-6 grid grid-cols-3 gap-3'>
                <button
                  onClick={() => signIn('google')}
                  className='w-full flex items-center justify-center px-8 py-2 border rounded-md shadow-sm text-lg'
                >
                  <FaGoogle />
                </button>
                <button
                  onClick={() => signIn('facebook')}
                  className='w-full flex items-center justify-center px-8 py-2 border rounded-md shadow-sm text-lg'
                >
                  <FaFacebook />
                </button>
                <button
                  onClick={() => signIn('github')}
                  className='w-full flex items-center justify-center px-8 py-2 border rounded-md shadow-sm text-lg'
                >
                  <FaGithub />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login