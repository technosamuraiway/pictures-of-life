import * as React from 'react'
import { SVGProps, memo } from 'react'

export const ArrowUp = memo((props: SVGProps<SVGSVGElement>) => (
    <svg
        fill={"currentColor"}
        height={5}
        width={8}
        xmlns={"http://www.w3.org/2000/svg"}
        {...props}
    >
      <path d={"m4 0 3.464 4.5H.536L4 0Z"}   fill={"currentColor"}/>
    </svg>
))