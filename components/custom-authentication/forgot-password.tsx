'use client'
import React, { useState } from 'react'
import { useAuth, useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// Forgot password page built by Bola, added custom authentication flow
const CustomForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    router.push('/dashboard')
  }

  async function create(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true)
        setError('')
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true)
          setError('')
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId })
          setError('')
        } else {
          console.log(result)
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  return (
    <>
      <section className="relative lg:h-screen lg:overflow-hidden md:h-auto sm:h-auto sm:overflow-none">
        <div className="mx-auto lg:flex">
          <div className="relative h-full hidden lg:flex lg:w-6/12 sm:w-full" style={styles.bgImg}>
            <div className="px-5 py-3">
              <button type='button' className="px-10 py-3 text-base font-normal text-black bg-white rounded-lg">
                <Link href="/request-fix">Repair</Link>
              </button>
            </div>

            <div className="text-base text-white">
              <div className="absolute carousel-btn left-6 bottom-8">
                <Image
                  src="/images/bullet.png"
                  alt="logo"
                  width={130}
                  height={25}
                  className="w-full dark:hidden"
                />
              </div>
              <div className="absolute right-5 bottom-8">
                <p>help@mygadgetpadi.com</p>
              </div>
            </div>
          </div>

          <div className="lg:w-6/12 sm:w-full bg-white dark:bg-dark sm:p-[60px] relative">
            <button className="absolute px-5 py-2 border-2 border-black rounded-lg right-6 top-3">
              <Link href="/sign-in">Login</Link>
            </button>

            <div className="mx-auto lg:w-10/12 sm:w-full">
              <h3 className="mb-2 text-2xl font-bold text-center text-black dark:text-white sm:text-3xl">
                Mygadgetpadi
              </h3>
              <p className="mb-5 text-sm font-normal text-center text-indigo-700">
                We can help you recover your account
              </p>

              <form className="my-2" onSubmit={!successfulCreation ? create : reset}>
                {!successfulCreation ? (
                  <>
                    <div className="mb-5">
                      <label htmlFor="email" className="block mb-3 text-sm text-dark dark:text-white">
                        Please provide your email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                      />
                    </div>
                    <div className="mb-6">
                      <button className="flex items-center justify-center w-full py-4 text-base font-medium text-white duration-300 bg-[#6445E8] rounded-lg shadow-submit dark:shadow-submit-dark px-9 hover:bg-gray-600">
                        Send password reset code
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-5">
                      <label htmlFor="password" className="block mb-3 text-sm text-dark dark:text-white">
                        Enter your new password
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="code" className="block mb-3 text-sm text-dark dark:text-white">
                        Enter the password reset code that was sent to your email
                      </label>
                      <input
                        type="text"
                        name="code"
                        placeholder="Reset Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="border-stroke rounded-lg dark:text-body-color-dark dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base font-light text-body-color outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
                      />
                    </div>
                    <div className="mb-6">
                      <button className="flex items-center justify-center w-full py-4 text-base font-medium text-white duration-300 bg-[#6445E8] rounded-lg shadow-submit dark:shadow-submit-dark px-9 hover:bg-gray-600">
                        Reset Password
                      </button>
                    </div>
                  </>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  bgImg: {
    backgroundImage: `url('/images/formImg.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  },
}

export default CustomForgotPassword;