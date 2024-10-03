import s from './InitLoader.module.scss'

export const InitLoader = () => {
  return (
    <div className={s.container}>
      <div className={s.loader}>
        <span></span>
      </div>
    </div>
  )
}
