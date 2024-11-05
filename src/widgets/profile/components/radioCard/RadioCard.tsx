import { Card, RadioGroup, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './RadioCard.module.scss'

type Options = {
  label: string
  value: string
}

interface IProps {
  className?: string
  name: string
  onChange: (value: string) => void
  options: Options[]
  value: string
}

export const RadioCard = ({ className, name, onChange, options, value }: IProps) => {
  return (
    <div>
      <Typography className={s.text} variant={'h3'}>
        {name}
      </Typography>
      <Card className={clsx(s.card, className)}>
        <RadioGroup
          itemClassName={s.radioButton}
          onValueChange={onChange}
          options={options}
          value={value}
        />
      </Card>
    </div>
  )
}
