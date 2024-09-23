import { BraveIcon } from '@public/devices/BraveIcon'
import { ChromeIcon } from '@public/devices/ChromeIcon'
import { ExplorerIcon } from '@public/devices/ExplorerIcon'
import { FireFoxIcon } from '@public/devices/FireFoxIcon'
import { MicrosoftEdgeIcon } from '@public/devices/MicrosoftEdgeIcon'
import { OperaIcon } from '@public/devices/OperaIcon'
import { SafariIcon } from '@public/devices/SafariIcon'
import { UcBrowserIcon } from '@public/devices/UcBrowserIcon'
import { YandexIcon } from '@public/devices/YandexIcon'

const browserIcon = [
  { img: <BraveIcon />, value: 'Brave' },
  { img: <ChromeIcon />, value: 'Chrome' },
  { img: <ExplorerIcon />, value: 'Explorer' },
  { img: <FireFoxIcon />, value: 'Firefox' },
  { img: <MicrosoftEdgeIcon />, value: 'Microsoft Edge' },
  { img: <OperaIcon />, value: 'Opera' },
  { img: <SafariIcon />, value: 'Safari' },
  { img: <UcBrowserIcon />, value: 'Uc browser' },
  { img: <YandexIcon />, value: 'Yandex' },
]

export const findIcon = (browserName: string | undefined) => {
  if (browserName) {
    return browserIcon.find(value => value.value.toUpperCase() === browserName.toUpperCase())?.img
  } else {
    return 'Unknown browser'
  }
}
