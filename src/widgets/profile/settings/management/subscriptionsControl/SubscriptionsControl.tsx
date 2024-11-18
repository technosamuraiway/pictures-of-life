import { useMemo } from 'react'
import { toast } from 'react-toastify'

import { useCancelAutoRenewalMutation, useGetCurrentSubscriptionQuery } from '@/services'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Card, Checkbox, Typography } from '@technosamurai/techno-ui-kit'

import s from './SubscriptionsControl.module.scss'

import { TableCell } from './tableCell/TableCell'

export const SubscriptionsControl = () => {
  const t = useRouterLocaleDefinition()
  const { data: currentSubscriptions, isLoading: currentSubscriptionsIsLoading } =
    useGetCurrentSubscriptionQuery()
  const [cancelAutoRenewal, { isLoading: cancelAutoRenewalIsLoading }] =
    useCancelAutoRenewalMutation()

  const stopAutoRenewalHandler = async () => {
    await cancelAutoRenewal()
    toast.success(t.settingsPage.management.stopAutoRenewal)
  }

  const lastSubscriptionDate =
    currentSubscriptions?.data &&
    currentSubscriptions.data.length > 0 &&
    currentSubscriptions.data[currentSubscriptions.data.length - 1]?.endDateOfSubscription

  const newPaymentDate = useMemo(() => {
    if (currentSubscriptions?.data && currentSubscriptions.data.length > 0) {
      const endDate = new Date(
        currentSubscriptions.data[currentSubscriptions.data.length - 1]?.endDateOfSubscription
      )

      endDate.setDate(endDate.getDate() + 1)

      return endDate.toISOString()
    }

    return null
  }, [currentSubscriptions])

  return (
    <>
      {(currentSubscriptionsIsLoading || cancelAutoRenewalIsLoading) && <RequestLineLoader />}
      <Typography className={s.text} variant={'h3'}>
        {t.settingsPage.management.currentSubscription}:
      </Typography>
      {currentSubscriptions?.hasAutoRenewal ? (
        <>
          <Card className={s.card}>
            <TableCell
              date={lastSubscriptionDate || 'No date available'}
              text={t.settingsPage.management.expireAt}
            />
            <TableCell
              date={newPaymentDate || 'No date available'}
              text={t.settingsPage.management.nextPayment}
            />
          </Card>
          <Checkbox
            checked={currentSubscriptions?.hasAutoRenewal || false}
            containerCN={s.checkbox}
            label={t.settingsPage.management.autoRenewal}
            onCheckedChange={stopAutoRenewalHandler}
            position={'left'}
          />
        </>
      ) : (
        <Card className={s.card}>
          <Typography variant={'h2'}>{t.settingsPage.management.noSubscriptions}</Typography>
        </Card>
      )}
    </>
  )
}
