import * as React from "react"
import { SVGProps, memo } from "react"
 export const CloseIcon = memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={"none"}
    height={24}
    width={24}
    xmlns={"http://www.w3.org/2000/svg"}
    {...props}
  >
    <g clipPath={"url(#a)"}>
      <path
        d={"m13.41 12 4.3-4.29a1.004 1.004 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1.004 1.004 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219l4.29-4.3 4.29 4.3a1.001 1.001 0 0 0 1.639-.325 1 1 0 0 0-.22-1.095L13.41 12Z"}
        fill={"currentColor"}
      />
    </g>
    <defs>
      <clipPath id={"a"}>
        <path d={"M0 0h24v24H0z"} fill={"#fff"} />
      </clipPath>
    </defs>
  </svg>
))

