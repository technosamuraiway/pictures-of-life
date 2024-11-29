import * as React from 'react'
import { SVGProps, memo } from 'react'

export const ArrowDown = memo((props: SVGProps<SVGSVGElement>) => (
    <svg
        fill={"currentColor"}
        height={5}
        width={8}
        xmlns={"http://www.w3.org/2000/svg"}
        {...props}
    >
        <path d={"M4 5 .536.5h6.928L4 5Z"} fill={"currentColor"}/>
    </svg>
))