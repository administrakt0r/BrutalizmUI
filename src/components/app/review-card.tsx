import * as React from "react"
import Image, { StaticImageData } from "next/image"

interface ReviewCardProps {
  fullName: string
  jobTitle: string
  pfp: StaticImageData
  review: string
}

const ReviewCard = React.memo(
  ({ fullName, jobTitle, pfp, review }: ReviewCardProps) => {
    return (
      <div className="min-h-20 sm:w-[500px] w-full mx-auto mb-4 lg:min-h-48 lg:mb-8 lg:w-full rounded-base border-2 border-border bg-background p-5 shadow-shadow">
        <div className="flex items-center sm:gap-5 gap-3">
          <Image
            className="size-10 sm:size-12 rounded-base border-2 border-border object-cover"
            src={pfp}
            alt={fullName}
            placeholder="blur"
          />

          <div>
            <h4 className="sm:text-lg text-base font-heading">{fullName}</h4>
            <p className="text-xs sm:text-sm ">{jobTitle}</p>
          </div>
        </div>
        <div className="sm:mt-5 mt-3 sm:text-base text-sm break-words">
          {review}
        </div>
      </div>
    )
  },
)

ReviewCard.displayName = "ReviewCard"

export default ReviewCard
