'use client'

import { Logo } from "@repo/ui/components/ui/logo";
import { body, h3 } from "@ui/typography";
import { ImageWrapper } from "@repo/ui/components/ui/imageWrapper";
import { getRand } from "@ui/lib/utils";
import useEmblaCarousel from 'embla-carousel-react'
import { ScoreItem } from "./scoreItem";
import { Button } from "./button";

interface ResultsScreenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: any[];
  className?: string;
}

const ResultsScreen = ({ images, className }: ResultsScreenProps) => {
  const [emblaRef] = useEmblaCarousel()
  const slideClassName = 'w-full flex-shrink-0'
  return (
    <div className={`w-full h-full ${className}`}>
      <div className={`relative w-full h-full px-10 pt-10`}>
        <div className={`relative w-full`}>
          <div className={`overflow-hidden w-full`} ref={emblaRef}>
            <div className={`flex w-full`}>
              {images.map((image, index) => {
                const analytics = [
                  {
                    title: 'Attractiveness',
                    score: image.attractivenessScore
                  },
                  {
                    title: 'Confidence',
                    score: image.confidenceScore
                  },
                  {
                    title: 'Authenticity',
                    score: image.authenticityScore
                  },
                  {
                    title: 'Potential',
                    isHighlighted: true,
                    score: image.potentialScore
                  }
                ]
                return (
                  <div
                    key={`${image.id}-${image.s3_url}-${index}`}
                    className={`${slideClassName} space-y-4`}
                  >
                    <div className="flex justify-center items-center">
                      <ImageWrapper
                        src={image.s3_url}
                        alt={`${image.id}-${index}-image`}
                        id={image.id}
                        className={`w-full`}
                      />
                    </div>
                    <div className={`space-y-2`}>
                      {
                        analytics.map((item, index) => {
                          return (
                            <ScoreItem
                              key={`${item.title}-${index}`}
                              title={item.title}
                              score={item.score}
                              isHighlighted={item.isHighlighted}
                            />
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute bottom-0 px-10 space-y-8 pb-10 w-full`}>
        <h3 className={`${h3} text-primary`}>Get your full report!</h3>
        <Button
          size={`lg`}
          className={`w-full pointer-events-auto`}
        >
          <Logo isFlatColor={true} className={``} />
        </Button>
      </div>
    </div>
  )
}

export { ResultsScreen }