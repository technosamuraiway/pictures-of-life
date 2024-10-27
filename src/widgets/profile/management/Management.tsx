import { useEffect, useState } from 'react'

import { useCreateSubscriptionMutation } from '@/services/flow/payment.service'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { RadioButton } from './RadioButton'
import { PayPalIcon } from '@public/managment/PayPalIcon'
import { StripeIcon } from '@public/managment/StripeIcon'
import { Card, Tabs, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './Management.module.scss'
import { InformativeModal } from '@/entities'

interface IProps {
  value: string
}

export const Management = ({ value }: IProps) => {
  const router = useRouter()
  const t = useRouterLocaleDefinition()
  const [createSubscription, { data, isLoading }] = useCreateSubscriptionMutation()

  // State for managing selected radio button values
  const [selectedAccountType, setSelectedAccountType] = useState<string>('personal')
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<string>('DAY')
  const [successPaymentModal, setSuccessPaymentModal] = useState<boolean>(false)
  const [failurePaymentModal, setFailurePaymentModal] = useState<boolean>(false)

  const accountType = [
    { name: t.settingsPage.management.personalType, value: 'personal' },
    { name: t.settingsPage.management.businessType, value: 'business' },
  ]

  const subscriptionType = [
    { cost: '10$', name: t.settingsPage.management.priceDay, value: 'DAY' },
    { cost: '50$', name: t.settingsPage.management.price7Day, value: 'WEEKLY' },
    {
      cost: '100$',
      name: t.settingsPage.management.priceMonth,
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

  return (
    <>
      <Tabs.Content className={s.management} value={value}>
        <div>
          <Typography className={s.text} variant={'h3'}>
            {t.settingsPage.management.accountType}
          </Typography>
          <Card className={s.cardACType}>
            {accountType.map(type => (
              <RadioButton
                groupName={'accountType'}
                id={type.value}
                isChecked={selectedAccountType === type.value}
                key={type.value}
                name={type.name}
                onChange={setSelectedAccountType}
                value={type.value}
              />
            ))}
          </Card>
        </div>
        {selectedAccountType === 'business' && (
          <>
            <div>
              <Typography className={s.text} variant={'h3'}>
                {t.settingsPage.management.subscriptionCost}
              </Typography>
              <Card className={s.cardCosts}>
                {subscriptionType.map(type => (
                  <RadioButton
                    groupName={'subscriptionType'}
                    id={type.value}
                    isChecked={selectedSubscriptionType === type.value}
                    key={type.value}
                    name={`${type.cost} ${type.name}`}
                    onChange={setSelectedSubscriptionType}
                    value={type.value}
                  />
                ))}
              </Card>
            </div>
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
      <InformativeModal
        headerTitle={t.settingsPage.modal.success}
        isOpenModal={successPaymentModal}
        modalTextChildren={t.settingsPage.modal.successMessage}
        onClickPositiveButton={onCloseHandler}
        positiveButtonChildren={t.settingsPage.modal.successStep}
        setIsOpenModal={onCloseHandler}
      />
      <InformativeModal
        headerTitle={t.settingsPage.modal.error}
        isOpenModal={failurePaymentModal}
        modalTextChildren={t.settingsPage.modal.errorMessage}
        onClickPositiveButton={onCloseHandler}
        positiveButtonChildren={t.settingsPage.modal.errorStep}
        setIsOpenModal={onCloseHandler}
      />
    </>
  )
}
