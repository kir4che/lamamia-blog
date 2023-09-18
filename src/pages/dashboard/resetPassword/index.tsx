import { useRouter } from "next/router"
import { useRef, useState } from "react"

const ResetPassword: React.FC = () => {
  const router = useRouter()

  const [error, setError] = useState<Error>()

  const newPasswordRef = useRef<HTMLInputElement>(null)
  const confirmNewPasswordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newPassword = newPasswordRef.current?.value
    const confirmNewPassword = confirmNewPasswordRef.current?.value

    if (newPassword !== confirmNewPassword) {
      console.log(newPasswordRef, confirmNewPasswordRef)
      setError(new Error('Passwords do not match!'))
      return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const encodedToken = encodeURIComponent(token as string)

    try {
      const response = await fetch(`/api/auth/password-reset?token=${encodedToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: encodedToken, password: newPassword }),
      })

      console.log(response)

      if (response.status === 201) router.push('/dashboard/login')
      else {
        const errorResponse = await response.json()
        setError(new Error(errorResponse.error))
      }
    } catch (err) {
      setError(err as Error)
    }
  }

  return (
    <div className='flex flex-col justify-center pt-4 pb-20'>
      <div className='flex flex-col justify-center'>
        <h2 className='text-3xl text-center font-extrabold'>Reset your Password</h2>
        <div className='mt-6 mx-auto w-full max-w-md'>
          <div className='py-8 px-4 shadow bg-zinc-50 dark:bg-zinc-800 rounded-md sm:px-10'>
            <form className='space-y-6' method='POST' onSubmit={handleSubmit}>
              <div className='space-y-1.5'>
                <label className='block text-sm font-medium'>
                  New Password
                </label>
                <input id='newPassword' name='newPassword' type='password' autoComplete='new-password' required ref={newPasswordRef}
                  className='appearance-none rounded-md text-zinc-900 relative block w-full px-3 py-2 border placeholder-gray-500 focus:z-10 sm:text-sm outline-none'
                  placeholder='Enter your new password'
                />
              </div>
              <div className='space-y-1.5 pb-8'>
                <label className='block text-sm font-medium'>
                  Confirm New Password
                </label>
                <input
                  id='confirmNewPassword' name='confirmPassword' type='password' required ref={confirmNewPasswordRef}
                  className='appearance-none rounded-md text-zinc-900 relative block w-full px-3 py-2 border placeholder-gray-500 focus:z-10 sm:text-sm outline-none'
                  placeholder='Confirm your new password'
                />
              </div>
              <button type='submit' className='w-full rounded-md py-2.5 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium'>Reset</button>
              {error && <p className='mt-2 text-center text-red-500'>{error.message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword