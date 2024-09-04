import { Fragment, ReactNode } from 'react'

const tagsRegex = /(<\d+>[^<>]*<\/\d+>)/
const openCloseTagRegex = /<(\d+)>([^<>]*)<\/(\d+)>/

interface IProps {
  tags?: Record<string, (str: string) => ReactNode>
  text: string
}

export const Trans = (props: IProps) => {
  return <>{interpolateTags(props)}</>
}

const interpolateTags = ({ tags, text }: IProps) => {
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
