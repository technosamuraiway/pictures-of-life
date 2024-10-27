import s from './RadioButton.module.scss'

interface IProps {
  groupName: string
  id: string
  isChecked: boolean
  name: string
  onChange: (value: string) => void
  value: string
}

export const RadioButton = ({ groupName, id, isChecked, name, onChange, value }: IProps) => {
  return (
    <div className={s.radioButton}>
      <input
        checked={isChecked}
        className={s.radioInput}
        id={id}
        name={groupName}
        onChange={() => onChange(value)}
        type={'radio'}
        value={value}
      />
      <label className={s.radioLabel} htmlFor={id}>
        {name}
      </label>
    </div>
  )
}
