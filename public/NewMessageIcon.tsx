import {SVGProps, memo} from 'react'

export const NewMessageIcon = memo((props: SVGProps<SVGSVGElement>) => (
    <svg fill={"currentColor"} viewBox={"0 0 24 24"} xmlns={"http://www.w3.org/2000/svg"} {...props}>
        <path d={"M21.54 2.79H2.46C1.46 2.79 0 3.64 0 5.24v13.52c0 1.36 1.1 2.46 2.46 2.46h19.08c1.36 0 2.46-1.1 2.46-2.46V5.24C24 4.35 23.39 2.79 21.54 2.79zM18.89 5.52L12 11.13 5.11 5.52H18.89zM2.73 18.48V7.44l8.32 6.79c0.28 0.22 0.61 0.34 0.95 0.34s0.67-0.11 0.95-0.34l8.32-6.79v11.04H2.73z"} />
    </svg>
))
