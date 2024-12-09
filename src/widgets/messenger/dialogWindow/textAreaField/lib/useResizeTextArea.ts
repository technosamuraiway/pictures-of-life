import { useEffect, useRef } from 'react'

export const useResizeTextArea = (messageField: string) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const textarea = textAreaRef.current

    if (textarea) {
      textarea.style.height = '34px'
      const newHeight = Math.min(textarea.scrollHeight, 160)

      textarea.style.height = `${newHeight}px`
    }
  }

  useEffect(() => {
    adjustHeight()
    window.addEventListener('resize', adjustHeight)

    return () => window.removeEventListener('resize', adjustHeight)
  }, [messageField])

  return { adjustHeight, textAreaRef }
}
