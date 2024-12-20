import * as React from "react"
import { SVGProps, memo } from "react"

export const BlockedIcon = memo((props: SVGProps<SVGSVGElement>) => (
    <svg
        fill={"currentColor"}
        height={24}
        width={24}
        xmlns={"http://www.w3.org/2000/svg"}
        {...props}
    >
        <g clipPath={"url(#a)"}>
            <path
                d={"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20Z"}
                fill={"currentColor"}
            />
            <path d={"m7.043 19.362 10-15"} stroke={"currentColor"} strokeWidth={2.3} />
        </g>
        <defs>
            <clipPath id={"a"}>
                <path d={"M0 0h24v24H0z"} fill={"currentColor"} />
            </clipPath>
        </defs>
    </svg>
))

BlockedIcon.displayName = 'BlockedIcon'

