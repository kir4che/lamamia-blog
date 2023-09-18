import { FormEvent, useState } from "react"
import { IoCloseSharp } from "react-icons/io5"

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    try {
      const response = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.status !== 200) {
        const errorResponse = await response.json()
        setError(new Error(errorResponse.error))
      }

      setLoading(false)
      setSuccess(true)
    } catch (err) {
      setError(err as Error)
    }
  }

  return (
    !success ? (
      <div className='flex flex-col justify-center pb-20'>
        <div className='flex flex-col justify-center'>
          <h2 className='text-3xl mb-4 text-center font-extrabold'>Reset your password</h2>
          <p className='max-w text-sm text-center'>Enter your email and we&apos;ll send you a link to reset your password.</p>
          <div className='mt-6 mx-auto w-full max-w-md bg-zinc-50 dark:bg-zinc-800 rounded-md'>
            <div className='py-8 px-4 shadow rounded-lg sm:px-10'>
              <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='space-y-1.5'>
                  <label htmlFor='email' className='block text-sm font-medium'>Email</label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='appearance-none rounded-md text-zinc-900 relative block w-full px-3 py-2 border placeholder-gray-500 focus:z-10 sm:text-sm outline-none'
                    placeholder='Enter your email addresponses'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full rounded-md py-2.5 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium'
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Reset password"}
                </button>
                {error && <p className='text-red-500 mt-2'>{error.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col justify-center">
        <div className="relative mx-auto w-full max-w-md py-10 shadow rounded-lg space-y-3">
          <button className="text-3xl top-4 right-4 absolute opacity-80 hover:opacity-60" onClick={() => setSuccess(false)}><IoCloseSharp /></button>
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto">
            <svg className="w-12 h-12 text-emerald-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Success</span>
          </div>
          <p className="text-lg font-medium text-center">Send a reset password link to {email}.</p>
        </div>
      </div>
    )
  )
}

export default ForgotPassword
