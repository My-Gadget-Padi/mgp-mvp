'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Wrench, MessageSquareText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { useAction, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

// Helper function to generate a unique 21-character password
const generatePassword = (length = 21) => {
  if (typeof window !== 'undefined' && window.crypto) {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;<>,.?/'
    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)
    return Array.from(array, (x) => charset[x % charset.length]).join('')
  } else {
    return Math.random().toString(36).slice(-length)
  }
}

export function Admin() {
  const [showFirstButton, setShowFirstButton] = useState(true)
  const [email, setEmail] = useState('')

  const buyPlan = useAction(api.plans.buyPlan)
  const verifyPayment = useAction(api.paystack.verifyPayment)
  const plans = useQuery(api.plans.getAllPlans)
  console.log('plans')
  console.log(plans)

  useEffect(() => {
    const toggleButtons = () => {
      setShowFirstButton((prev) => !prev)
    }
    const intervalId = setInterval(toggleButtons, 3600000)
    return () => clearInterval(intervalId)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const redirectUrl = `${window.location.origin}/dashboard`
    try {
      const formData = new FormData(e.currentTarget)
      const planId = formData.get('planId') as Id<'plans'>
      const reference = formData.get('reference') as string
      const response = await buyPlan({ planId })
      // const response = await verifyPayment({ reference })
      console.log(response)
    } catch (error: any) {
      console.error('Sign-in error:', error)
    }
  }

  return (
    <main className="flex flex-1 mt-6 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card className="border-transparent shadow-md">
          <CardContent className="pb-2 pt-2">
            <Link href="/repair">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Gadget repair
                  </span>
                  <h2 className="text-lg mt-2 font-semibold">
                    Request a repair now
                  </h2>
                </div>
                <Button
                  size="icon"
                  className="h-12 w-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                >
                  <Wrench className="h-6 w-6 stroke-white" />
                </Button>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-transparent shadow-md">
          <CardContent className="pb-2 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">
                  Gadget protection{' '}
                  <Badge className="text-[10px] ml-1">Coming soon</Badge>
                </span>
                <h2 className="text-lg mt-2 font-semibold">
                  Protect your device
                </h2>
              </div>
              <Button
                size="icon"
                className="h-12 w-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
              >
                <ShieldCheck className="h-6 w-6 stroke-white" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-transparent shadow-md">
          <CardContent className="pb-2 pt-2">
            {showFirstButton ? (
              <Link href="https://wa.me/+2347076641696">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      We are seated
                    </span>
                    <h2 className="text-lg mt-2 font-semibold">
                      Send us a text
                    </h2>
                  </div>
                  <Button
                    size="icon"
                    className="h-12 w-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                  >
                    <MessageSquareText className="h-6 w-6 stroke-white" />
                  </Button>
                </div>
              </Link>
            ) : (
              <Link href="https://wa.me/+2347072665255">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      We are seated
                    </span>
                    <h2 className="text-lg mt-2 font-semibold">
                      Send us a text
                    </h2>
                  </div>
                  <Button
                    size="icon"
                    className="h-12 w-12 bg-[#6445E8] rounded-xl hover:bg-[#6445E8]"
                  >
                    <MessageSquareText className="h-6 w-6 stroke-white" />
                  </Button>
                </div>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:gap-8">
        <Card className="w-full flex flex-col sm:flex-row rounded-2xl border-transparent shadow-md">
          <div className="flex-1">
            <CardHeader>
              <Badge className="max-w-[122px] py-1 bg-[#FFBA433B]/30 mb-4 text-primary font-light text-sm">
                mygadgetpadi
              </Badge>
              <CardTitle>
                <h1 className="text-lg font-bold">Text</h1>
                <p className="text-sm font-normal text-muted-foreground mt-2">
                  From colors, cards, typography to complex elements, you will
                  find the full documentation.
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 mt-5">
              <Link
                href="#"
                className="text-sm text-blue-500 font-semibold hover:underline"
              >
                Read more →
              </Link>
            </CardContent>
          </div>

          {/* Purple Card */}
          <div
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="180" cy="200" r="30" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="60" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="90" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="120" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="150" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/><circle cx="180" cy="200" r="180" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" fill="none"/></svg>')`,
              backgroundPosition: 'right -20px top',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
            className="max-w-3xl sm:w-52 h-52 mb-4 mr-4 ml-4 sm:mr-4 sm:mt-4 bg-[#6445E8] rounded-lg flex items-center justify-center"
          />
        </Card>

        <Card className="w-full relative p-0 border-transparent h-auto md:h-64">
          <div className="relative h-full">
            <Image
              src="/images/card/protect.jpg"
              alt="Background Image"
              width={100}
              height={100}
              className="rounded-2xl w-full h-64 object-cover"
              quality={100}
              priority={true}
              unoptimized={true}
            />
            <div className="rounded-2xl absolute inset-0 flex flex-col justify-between bg-black bg-opacity-50">
              <CardHeader>
                <CardTitle className="text-white">
                  <h1 className="text-lg font-semibold">
                    Something you most likely don't know
                  </h1>
                  <p className="text-sm font-light mt-2">
                    Do you know that repairing your gadget with unprofessional
                    engineers reduces the lifespan of your gadget rather than
                    the improvement you were seeking?
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200"
                >
                  Repair with warranty →
                </Link>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="my-2">
          <div className="mb-5">
            <label
              htmlFor="planId"
              className="mb-3 block text-sm text-dark dark:text-white"
            >
              Plan id
            </label>
            <input
              type="text"
              name="planId"
              placeholder="PlanId"
              required
              className="border-stroke rounded-lg dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="reference"
              className="mb-3 block text-sm text-dark dark:text-white"
            >
              Reference
            </label>
            <input
              type="text"
              name="reference"
              placeholder="reference"
              required
              className="border-stroke rounded-lg dark:shadow-two w-full border bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-indigo-800 dark:border-transparent dark:bg-[#2C303B] dark:focus:border-blue dark:focus:shadow-none"
            />
          </div>

          <div className="mb-5">
            <button
              type="submit"
              className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-lg px-9 py-4 text-base font-medium text-white duration-300 bg-[#6445E8] hover:bg-[#6445E8]/80`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
