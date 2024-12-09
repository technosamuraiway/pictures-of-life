import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useRouterLocaleDefinition } from '@/shared'
import { Button, TextArea } from '@technosamurai/techno-ui-kit'

import s from './TextAreaField.module.scss'

export const TextAreaField = () => {
  const t = useRouterLocaleDefinition()
  const [messageField, setMessageField] = useState('')

  const changeMessageHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value

    setMessageField(value)
  }

  const sendMessageHandler = () => {
    if (messageField.trim()) {
      toast.success(`${messageField} was sent`)

      setMessageField('')
    }
  }

  const clearMessageHandler = () => {
    setMessageField('')
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessageHandler()
    }
  }

  return (
    <div className={s.wrapper}>
      <TextArea
        className={s.textArea}
        onChange={changeMessageHandler}
        onKeyDown={onKeyPressHandler}
        placeholder={t.messenger.messageInput}
        value={messageField}
        wrapperCN={s.textAreaWrapper}
      />
      {messageField && (
        <Button className={s.sendButton} onClick={sendMessageHandler} variant={'outline'}>
          {t.messenger.profileButton}
        </Button>
      )}
      {messageField && (
        <Button className={s.clearMessageButton} onClick={clearMessageHandler} variant={'icon'}>
          x
        </Button>
      )}
    </div>
  )
}
