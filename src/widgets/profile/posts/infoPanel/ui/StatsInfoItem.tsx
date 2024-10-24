import { Typography } from '@technosamurai/techno-ui-kit'

interface iProps {
  num: number
  title: string
}

export const StatsInfoItem = ({ num, title }: iProps) => {
  return (
    <div>
      <Typography variant={'bold-text-14'}>{num}</Typography>
      <Typography variant={'bold-text-14'}>{title}</Typography>
    </div>
  )
}
