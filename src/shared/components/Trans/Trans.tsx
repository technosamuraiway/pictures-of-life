import { FC, Fragment, ReactNode } from 'react'

const tagsRegex = /(<\d+>[^<>]*<\/\d+>)/
const openCloseTagRegex = /<(\d+)>([^<>]*)<\/(\d+)>/

type TransType = {
  tags?: Record<string, (str: string) => ReactNode>
  text: string
}

export const Trans: FC<TransType> = props => {
  return <>{interpolateTags(props)}</>
}

const interpolateTags = (data: TransType) => {
  const { tags, text } = data

  if (!tags) {
    return text
  }

  const textSlices = text.split(tagsRegex)

  return textSlices.map(textSlice => {
    const matchResult = openCloseTagRegex.exec(textSlice)

    if (!matchResult) {
      return textSlice
    }

    const [, openTag, content, closeTag] = matchResult

    if (!openTag || !closeTag || openTag !== closeTag) {
      return textSlice
    }

    return <Fragment key={content}>{tags[openTag]?.(content ?? '')}</Fragment>
  })
}
