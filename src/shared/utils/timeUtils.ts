import { SubscriptionType } from '@/services/graphql/codegen/graphql'

import { LocaleType } from '../locales/ru'

export function TimeAgo(dateString: string, t: LocaleType): string {
  const now = new Date()
  const postDate = new Date(dateString)
  const diffInMilliseconds = now.getTime() - postDate.getTime()

  const minutes = Math.floor(diffInMilliseconds / (1000 * 60))

  if (minutes < 60) {
    return `${minutes} ${getMinutesForm(minutes, t)} ${t.timeAgo.ago}`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours} ${getHoursForm(hours, t)} ${t.timeAgo.ago}`
  }

  const days = Math.floor(hours / 24)

  if (days < 7) {
    return `${days} ${getDaysForm(days, t)} ${t.timeAgo.ago}`
  }

  const weeks = Math.floor(days / 7)

  if (weeks < 4) {
    return `${weeks} ${getWeeksForm(weeks, t)} ${t.timeAgo.ago}`
  }

  const months = Math.floor(days / 30)

  if (months < 12) {
    return `${months} ${getMonthsForm(months, t)} ${t.timeAgo.ago}`
  }

  const years = Math.floor(months / 12)

  return `${years} ${getYearsForm(years, t)} ${t.timeAgo.ago}`
}

function getMinutesForm(minutes: number, t: LocaleType): string {
  if (minutes === 1) {
    return t.timeAgo.minute
  } else if (minutes >= 2 && minutes <= 4) {
    return t.timeAgo.minutesFew
  } else {
    return t.timeAgo.minutesMany
  }
}

function getHoursForm(hours: number, t: LocaleType): string {
  if (hours === 1) {
    return t.timeAgo.hour
  } else if (hours >= 2 && hours <= 4) {
    return t.timeAgo.hoursFew
  } else {
    return t.timeAgo.hoursMany
  }
}

function getDaysForm(days: number, t: LocaleType): string {
  if (days === 1) {
    return t.timeAgo.day
  } else if (days >= 2 && days <= 4) {
    return t.timeAgo.daysFew
  } else {
    return t.timeAgo.daysMany
  }
}

function getWeeksForm(weeks: number, t: LocaleType): string {
  if (weeks === 1) {
    return t.timeAgo.week
  } else if (weeks >= 2 && weeks <= 4) {
    return t.timeAgo.weeksFew
  } else {
    return t.timeAgo.weeksMany
  }
}

function getMonthsForm(months: number, t: LocaleType): string {
  if (months === 1) {
    return t.timeAgo.month
  } else if (months >= 2 && months <= 4) {
    return t.timeAgo.monthsFew
  } else {
    return t.timeAgo.monthsMany
  }
}

function getYearsForm(years: number, t: LocaleType): string {
  if (years === 1) {
    return t.timeAgo.year
  } else if (years >= 2 && years <= 4) {
    return t.timeAgo.yearsFew
  } else {
    return t.timeAgo.yearsMany
  }
}

export const getDaysFromPeriod = (type: SubscriptionType) => {
  switch (type) {
    case SubscriptionType.Monthly:
      return '30 days'
    case SubscriptionType.Day:
      return '1 day'
    case SubscriptionType.Weekly:
      return '7 days'
    default:
      break
  }
}
