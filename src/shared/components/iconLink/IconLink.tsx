import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  altText: string
  className?: string
  dimensions?: number
  imgSrc: string
  linkHref: string
  linkTitle?: string
}

export const IconLink = (props: IProps) => {
  const { altText, className, dimensions = 24, imgSrc, linkHref, linkTitle, ...rest } = props

  return (
    <Link className={className} href={linkHref} title={linkTitle} {...rest}>
      <Image alt={altText} height={dimensions} src={imgSrc} width={dimensions} />
    </Link>
  )
}
