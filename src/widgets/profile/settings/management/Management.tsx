import { useEffect, useState } from 'react'

import { InformativeModal } from '@/entities'
import { useCreateSubscriptionMutation } from '@/services/flow/payment.service'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { RadioCard } from '@/widgets/profile/components/radioCard/RadioCard'
import { PayPalIcon } from '@public/managment/PayPalIcon'
import { StripeIcon } from '@public/managment/StripeIcon'
import { Card, RadioGroup, Tabs, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './Management.module.scss'

interface IProps {
  value: string
}

export const Management = ({ value }: IProps) => {
  const router = useRouter()
  const t = useRouterLocaleDefinition()
  const [createSubscription, { data, isLoading }] = useCreateSubscriptionMutation()

  const [selectedAccountType, setSelectedAccountType] = useState<string>('personal')
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<string>('DAY')
  const [successPaymentModal, setSuccessPaymentModal] = useState<boolean>(false)
  const [failurePaymentModal, setFailurePaymentModal] = useState<boolean>(false)

  const accountType = [
    { label: t.settingsPage.management.personalType, value: 'personal' },
    { label: t.settingsPage.management.businessType, value: 'business' },
  ]

  const subscriptionCost = {
    DAY: '10$',
    MONTHLY: '100$',
    WEEKLY: '50$',
  }

  const subscriptionType = [
    { label: `${subscriptionCost.DAY} ${t.settingsPage.management.priceDay}`, value: 'DAY' },
    { label: `${subscriptionCost.WEEKLY} ${t.settingsPage.management.price7Day}`, value: 'WEEKLY' },
    {
      label: `${subscriptionCost.MONTHLY} ${t.settingsPage.management.priceMonth}`,
      value: 'MONTHLY',
    },
  ]

  const onPayHandler = (payType: 'PAYPAL' | 'STRIPE') => {
    if (payType === 'PAYPAL') {
      // Implement PayPal payment logic here
    } else if (payType === 'STRIPE') {
      createSubscription(selectedSubscriptionType)
    }
  }

  const onCloseHandler = () => {
    setSuccessPaymentModal(false)
    setFailurePaymentModal(false)
  }

  useEffect(() => {
    if (data) {
      window.location.href = data.url
    }
  }, [data])

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    const successMatch = router.asPath.match(/[/?&]success=([^&?]+)/)

    if (successMatch) {
      const successValue = successMatch[1].toLowerCase()

      if (successValue === 'true') {
        setSuccessPaymentModal(true)
      } else {
        setFailurePaymentModal(true)
      }

      const [path, queryString] = router.asPath.split('?')

      if (!queryString) {
        return
      }

      const params = queryString.split('&').filter(param => {
        return !param.startsWith('success=') && !param.startsWith('?success=')
      })

      const newPath = params.length > 0 ? `${path}?${params.join('&')}` : path

      router.replace(newPath, undefined, { shallow: true })
    }
  }, [router])

  const informativeModal = () => {
    if (successPaymentModal) {
      return (
        <InformativeModal
          headerTitle={t.settingsPage.modal.success}
          isOpenModal={successPaymentModal}
          modalTextChildren={t.settingsPage.modal.successMessage}
          onClickPositiveButton={onCloseHandler}
          positiveButtonChildren={t.settingsPage.modal.successStep}
          setIsOpenModal={onCloseHandler}
        />
      )
    } else if (failurePaymentModal) {
      return (
        <InformativeModal
          headerTitle={t.settingsPage.modal.error}
          isOpenModal={failurePaymentModal}
          modalTextChildren={t.settingsPage.modal.errorMessage}
          onClickPositiveButton={onCloseHandler}
          positiveButtonChildren={t.settingsPage.modal.errorStep}
          setIsOpenModal={onCloseHandler}
        />
      )
    }
  }

  return (
    <>
      <Tabs.Content className={s.management} value={value}>
        <RadioCard
          className={s.cardACType}
          name={t.settingsPage.management.accountType}
          onChange={setSelectedAccountType}
          options={accountType}
          value={selectedAccountType}
        />
        {selectedAccountType === 'business' && (
          <>
            <RadioCard
              className={s.cardCosts}
              name={t.settingsPage.management.subscriptionCost}
              onChange={setSelectedSubscriptionType}
              options={subscriptionType}
              value={selectedSubscriptionType}
            />
            <div className={s.payContainer}>
              <div className={s.pay}>
                <button disabled={isLoading} onClick={() => onPayHandler('PAYPAL')} type={'button'}>
                  <PayPalIcon />
                </button>
                <Typography className={s.text} variant={'regular-text-14'}>
                  {t.settingsPage.management.or}
                </Typography>
                <button disabled={isLoading} onClick={() => onPayHandler('STRIPE')} type={'button'}>
                  <StripeIcon />
                </button>
              </div>
            </div>
          </>
        )}
        {isLoading && <RequestLineLoader />}
      </Tabs.Content>
      {informativeModal()}
    </>
  )
}
