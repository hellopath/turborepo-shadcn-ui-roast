'use client'

import { Logo } from "@repo/ui/components/ui/logo";
import { body, h3 } from "@ui/typography";
import { ImageWrapper } from "@repo/ui/components/ui/imageWrapper";
import { getRand } from "@ui/lib/utils";

interface ScanningScreenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: any[];
  className?: string;
}

const ScanningScreen = ({ images, className }: ScanningScreenProps) => {
  const baseGap = 320;
  const minGap = 20;
  const gap = Math.max(baseGap / images.length, minGap);
  return (
    <div className={`w-full h-full ${className}`}>
      <Logo className={`mx-auto mt-14`} />
      <div className={`px-10 space-y-2 mt-14`}>
        <h3 className={`${h3} text-primary`}>Analyzing your profile</h3>
        <p className={`${body} text-secondary pb-5`}>Great things take time. <br />Your analysis is almost ready!</p>
      </div>
      <div className={`relative w-full h-[10%]`}>
        <div className={`relative left-1/2 top-1/2 transform -translate-x-1/4 -translate-y-1/4`}>
          {images.map((image, index) => {
            // const translateXAmount = Math.floor(Math.random() * (70 - 10 + 1) + 10 * index) + 10;
            const translateXAmount = getRand(0, 50) + 10 * index;
            const direction = index % 2 === 0 ? -1 : 1;
            const translateX = translateXAmount * direction;
            const rotationAmount = getRand(0, 10);
            const rotation = rotationAmount * direction;
            return (
              <div
                key={`${image.id}-${image.s3_url}-${index}`}
                className={`!absolute w-1/2 top-0 left-0`}
                style={{ transform: `translateX(${translateX}px) translateY(${gap * index}px) rotate(${rotation}deg)` }}
              >
                <ImageWrapper
                  isAnimated={true}
                  src={image.s3_url}
                  alt={`${image.id}-${index}-image`}
                  id={image.id}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className={`absolute inset-0 w-full h-full z-10 pointer-events-none animate-scan`}>
        <div className={`w-full h-1/2 relative`}>
          <div className={`w-full h-[50%] absolute bottom-0 bg-gradient-to-b from-transparent to-[#FF6032]`} />
        </div>
        <div className={`w-[110%] h-1 bg-white absolute z-10 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2`}></div>
        <div className={`w-[110%] h-5 bg-white absolute z-10 blur-[20px] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2`}></div>
        <div className={`w-full h-1/2 relative`}>
          <div className={`w-full h-[50%] absolute top-0 bg-gradient-to-b to-transparent from-[#FF6032]`} />
        </div>
      </div>
    </div>
  )
}

export { ScanningScreen }