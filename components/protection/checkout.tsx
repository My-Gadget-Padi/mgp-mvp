import React, { useState, useEffect } from 'react'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery, useAction } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useUser } from '@clerk/nextjs'
import PageLoader from '../PageLoader'
import { Stepper } from './stepper'
import { Checkbox } from '../ui/checkbox'
import { Badge } from '../ui/badge'
import { TbCurrencyNaira } from 'react-icons/tb'

interface PlanProps {
  planId: Id<'plans'>
}

const Checkout = ({ planId }: PlanProps) => {
  const [loading, setLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useUser()
  const userId = user?.id
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || '',
  })

  const plan = useQuery(api.plans.getPlanById, {
    planId,
  })

  const buyPlan = useAction(api.plans.buyPlan)

  /**useEffect(() => {
    if (plan?.name === 'Free Plan' && userProfile?.hasFreePlan === true && userProfile?.freePlanActivationDate) {
      router.push('/protection/plans')
    } else if (plan?.name === 'Free Plan' && userProfile?.hasFreePlan === true && !userProfile?.freePlanActivationDate) {
      router.push("/protection/onboard")
    }
  }, [plan, userProfile?.hasFreePlan, router])
  */

  const handleBuyPlan = async () => {
    try {
      setLoading(true)

      const response = await buyPlan({
        planId: plan?._id as Id<'plans'>,
      })

      if (response?.status && response.authorizationUrl) {
        toast({
          title: 'Initialized',
          description: 'You will be redirected to a payment page.',
        })
        router.push(response.authorizationUrl)
      } else {
        toast({
          title: 'Success',
          description: 'Free plan has been activated, you will be redirected to an onboarding screen.',
        })
        router.push("/protection/success")
      }
    } catch (error) {
      console.error('Error making claim:', error)
      toast({
        title: 'Error',
        description: 'Plan purchase could not be initialized.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-1 mt-6 sm:mt-0 flex-col gap-4 p-4 lg:gap-2 lg:p-6">
      <Stepper currentStep={2} />

      {loading ? (
        <PageLoader />
      ) : (
        <div className="space-y-6">
          <div className="bg-[#2B2B2B] text-white rounded-lg p-6 shadow-md flex flex-col">
            <div className="flex justify-between items-start">
              <Badge className="bg-[#FFBA43] text-[#6445E8]">
                {plan?.name}
              </Badge>

              <span className="text-2xl font-semibold inline-flex">
                <TbCurrencyNaira size={33} />
                {plan?.price.toLocaleString()}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <p className="font-semibold">
                {userProfile?.firstName || 'No name'} {userProfile?.lastName}
              </p>
              <p className="text-sm">
                {userProfile?.phoneNumber || 'No phone number'}
              </p>
              <p className="text-sm">{plan?.durationMonths} months</p>
            </div>

            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => setShowDetails((prev) => !prev)}
                className="text-sm text-white underline"
              >
                {showDetails ? 'Hide details' : 'See details'}
              </button>
            </div>
            <div className="text-left">
              {showDetails && (
                <div className="mt-4 text-sm mr-auto">
                  <h3 className="font-semibold">Benefits:</h3>
                  <ul className="list-disc list-inside">
                    {plan?.details.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <h3 className="font-semibold mt-2">Terms:</h3>
                  <p>{plan?.details.terms}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-semibold text-lg mb-4">Payment details</h2>
            <div className="flex justify-between text-sm mb-2">
              <span>Sub Total Product</span>
              <span className="inline-flex font-semibold">
                <TbCurrencyNaira size={20} />
                {plan?.price.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Discount</span>
              <span className="inline-flex font-semibold">
                <TbCurrencyNaira size={20} />
                {'0'}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="inline-flex font-semibold">
                <TbCurrencyNaira size={27} />
                {plan?.price.toLocaleString()}
              </span>
            </div>
          </div>

          <Separator />

          <div className="ml-auto space-y-2.5">
            <div className="space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setIsChecked(checked)
                    }
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none"
                >
                  I have read and agreed to all{' '}
                  <Link
                    href={`/protection/terms/${plan?._id}`}
                    target="_blank"
                    className="text-[#6445E8] underline"
                  >
                    terms and conditions
                  </Link>
                </label>
              </div>
            </div>

            <Button
              onClick={handleBuyPlan}
              disabled={!isChecked}
              className="w-full bg-[#6445E8] text-white py-6 rounded-lg font-semibold hover:bg-[#6445E8]/90"
            >
              {plan?.name === "Free Plan"
                ? "Continue with activation"
                : " Proceed to payment"}
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Checkout