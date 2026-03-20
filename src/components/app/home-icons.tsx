import { cn } from "@/lib/utils"

import * as React from "react"

/**
 * ⚡ Bolt: OpenSourceIcon optimized with React.memo to prevent unnecessary re-renders.
 */
export const OpenSourceIcon = React.memo(
  React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<"svg">>(
    ({ className, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 768"
        fill="none"
        aria-hidden="true"
        data-slot="open-source-icon"
        className={cn(className)}
        {...props}
      >
        <path
          d="M400 10C615.398 10 790 184.585 790 399.958C790 557.315 696.772 692.954 562.483 754.562L468.604 510.384C505.457 487.481 530 446.609 530 399.958C530 328.161 471.802 269.971 400 269.971C328.198 269.971 270 328.161 270 399.958C270 446.619 294.587 487.487 331.438 510.419L237.559 754.599C103.226 692.917 10 557.313 10 399.958C10 184.585 184.602 10 400 10Z"
          className="md:fill-black fill-main md:stroke-none stroke-black md:dark:fill-black dark:fill-main"
          strokeWidth="30"
        />
      </svg>
    ),
  ),
)

OpenSourceIcon.displayName = "OpenSourceIcon"

/**
 * ⚡ Bolt: ShadcnIcon optimized with React.memo.
 */
export const ShadcnIcon = React.memo(
  React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<"svg">>(
    ({ className, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        aria-hidden="true"
        data-slot="shadcn-icon"
        className={cn(className)}
        {...props}
      >
        <rect width="256" height="256" fill="none"></rect>
        <line
          x1="208"
          y1="128"
          x2="128"
          y2="208"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        ></line>
        <line
          x1="192"
          y1="40"
          x2="40"
          y2="192"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        ></line>
      </svg>
    ),
  ),
)

ShadcnIcon.displayName = "ShadcnIcon"

/**
 * ⚡ Bolt: CustomizableIcon optimized with React.memo.
 */
export const CustomizableIcon = React.memo(
  React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<"svg">>(
    ({ className, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        fill="none"
        aria-hidden="true"
        data-slot="customizable-icon"
        className={cn(className)}
        {...props}
      >
        <path
          d="M493.281 161.223L493.259 161.244L493.237 161.266C479.348 175.17 479.348 198.163 493.237 212.067L588.139 307.067C602.034 320.978 625.021 320.978 638.917 307.067L773.317 172.527C775.305 171.081 777.213 170.855 778.356 171.073C778.936 171.184 779.329 171.398 779.603 171.635C779.852 171.85 780.207 172.255 780.494 173.074C786.805 193.659 790 215.947 790 240C790 375.796 673.608 484.265 534.943 468.421C513.811 465.156 493.099 460.323 474.193 452.437L468.006 449.857L463.269 454.599L153.591 764.599C137.117 781.091 114.674 790 94.0687 790C73.4638 790 51.0205 781.091 34.5461 764.599L34.464 764.517L34.3799 764.437C1.96834 733.466 1.72473 679.929 34.5409 647.073C34.5427 647.071 34.5444 647.069 34.5461 647.067L345.87 337.086L350.624 332.352L348.046 326.157C340.129 307.138 335.322 288.025 332.083 265.39C316.219 126.527 424.606 10 560.25 10C582.145 10 605.607 13.0663 627.556 19.181C628.909 20.2855 629.87 21.8429 630.23 23.3556C630.631 25.0419 630.177 25.8434 629.774 26.254C629.77 26.2581 629.766 26.262 629.762 26.2659L493.281 161.223Z"
          className="fill-main stroke-black md:dark:fill-main dark:fill-main"
          strokeWidth="30"
        />
      </svg>
    ),
  ),
)

CustomizableIcon.displayName = "CustomizableIcon"

/**
 * ⚡ Bolt: TailwindIcon optimized with React.memo.
 */
export const TailwindIcon = React.memo(
  React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<"svg">>(
    ({ className, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 481"
        fill="none"
        aria-hidden="true"
        data-slot="tailwind-icon"
        className={cn(className)}
        {...props}
      >
    <mask
      id="mask0_16_29"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="800"
      height="481"
    >
      <path
        d="M10 10H790V470.109H10V10Z"
        fill="white"
        stroke="white"
        strokeWidth="20"
      />
    </mask>
        <g mask="url(#mask0_16_29)">
          <path
            d="M423.375 147.135L423.377 147.137C443.066 167.128 463.341 187.643 490.645 203.37C517.718 218.964 552.121 230.055 600 230.055C651.642 230.055 692.597 217.167 723.752 192.237C745.528 174.813 763.021 151.101 776.006 120.731C764.266 130.791 751.918 138.658 738.94 144.222C713.428 155.158 686.175 156.885 657.574 149.733C624.429 141.452 600.952 117.617 577.656 93.9664L576.625 92.9192L576.623 92.918C556.934 72.9264 536.659 52.4117 509.355 36.6846C482.282 21.0905 447.879 10 400 10C348.358 10 307.403 22.8873 276.248 47.8171C254.472 65.2416 236.979 88.9535 223.994 119.324C235.734 109.264 248.082 101.396 261.06 95.8327C286.572 84.8967 313.824 83.1696 342.424 90.3209L423.375 147.135ZM423.375 147.135L422.344 146.088M423.375 147.135L422.344 146.088M422.344 146.088C399.048 122.437 375.571 98.6022 342.426 90.3214L422.344 146.088ZM576.006 360.785C563.021 391.156 545.528 414.868 523.752 432.292C492.597 457.222 451.642 470.109 400 470.109C352.121 470.109 317.718 459.019 290.645 443.424C263.341 427.697 243.066 407.183 223.377 387.191L223.375 387.19L222.386 386.185C199.072 362.517 175.589 338.677 142.428 330.377L142.426 330.376C113.825 323.224 86.5722 324.951 61.0601 335.887C48.0816 341.451 35.7343 349.318 23.9935 359.378C36.9788 329.008 54.4722 305.296 76.2478 287.872C107.403 262.942 148.358 250.055 200 250.055C247.879 250.055 282.282 261.145 309.355 276.739C336.659 292.466 356.934 312.981 376.623 332.973L376.625 332.974L377.656 334.021C400.952 357.672 424.429 381.507 457.574 389.788C486.175 396.94 513.428 395.213 538.94 384.276C551.918 378.713 564.266 370.845 576.006 360.785Z"
            className="md:fill-main fill-black"
            stroke="black"
            strokeWidth="20"
          />
        </g>
      </svg>
    ),
  ),
)

TailwindIcon.displayName = "TailwindIcon"
