import { ReactNode } from 'react'

import { BraveIcon } from '@public/devices/BraveIcon'
import { ChromeIcon } from '@public/devices/ChromeIcon'
import { DesktopMacIcon } from '@public/devices/DesktopMacIcon'
import { ExplorerIcon } from '@public/devices/ExplorerIcon'
import { FireFoxIcon } from '@public/devices/FireFoxIcon'
import { MicrosoftEdgeIcon } from '@public/devices/MicrosoftEdgeIcon'
import { OperaIcon } from '@public/devices/OperaIcon'
import { PhoneIphoneIcon } from '@public/devices/PhoneIphoneIcon'
import { SafariIcon } from '@public/devices/SafariIcon'
import { UcBrowserIcon } from '@public/devices/UcBrowserIcon'
import { UnknownDeviceIcon } from '@public/devices/UnknownDeviceIcon'
import { UnknownBrowserIcon } from '@public/devices/UnkownBrowserIcon'
import { YandexIcon } from '@public/devices/YandexIcon'

const browserIcon: Record<string, ReactNode> = {
  Brave: <BraveIcon />,
  Chrome: <ChromeIcon />,
  Edge: <MicrosoftEdgeIcon />,
  Explorer: <ExplorerIcon />,
  Firefox: <FireFoxIcon />,
  Opera: <OperaIcon />,
  Safari: <SafariIcon />,
  UC: <UcBrowserIcon />,
  UnknownBrowser: <UnknownBrowserIcon />,
  Yandex: <YandexIcon />,
}

const deviceIcon: Record<string, ReactNode> = {
  Android: <PhoneIphoneIcon />,
  UnknownDevice: <UnknownDeviceIcon />,
  Windows: <DesktopMacIcon />,
}

export const findIcon = (iconName?: string, iconType?: 'browser' | 'device') => {
  if (iconType === 'browser') {
    const icon = browserIcon[iconName || ''] || browserIcon[iconName?.toUpperCase() || '']

    return icon || browserIcon['UnknownBrowser']
  }
  if (iconType === 'device') {
    const icon = deviceIcon[iconName || ''] || deviceIcon[iconName?.toUpperCase() || '']

    return icon || deviceIcon['UnknownDevice']
  }

  return <UnknownBrowserIcon />
}
