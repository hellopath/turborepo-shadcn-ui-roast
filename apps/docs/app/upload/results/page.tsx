'use client'

import { Logo } from "@repo/ui/components/ui/logo";
import { body, h3 } from "@ui/typography";
import { useUserStore } from "../../hooks/useState";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageWrapper } from "@repo/ui/components/ui/imageWrapper";

interface Image {
  id: string;
  s3_url: string;
}

export default function UploadResults() {
  const router = useRouter()
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const { user } = useUserStore(({ user }) => ({ user }));
  const [images, setImages] = useState<Image[]>([]);
  useEffect(() => {
    if (!user) router.push('/upload')
    const loadUserImages = async () => {
      try {
        const response = await fetch(`http://localhost:5001/photos/${user?.id}`);
        if (!response.ok) {
          throw new Error('Get images failed');
        }
        const data = await response.json();
        setImages(data);
        console.log(data)
      } catch (err) {
        console.error('Get images failed', err);
      }
    };
    loadUserImages()
  }, [user?.id])
  const baseGap = 320;
  const minGap = 20;
  const gap = Math.max(baseGap / images.length, minGap);
  return (
    <div>
      <div className={`absolute w-full h-full inset-0`}>
        <Logo className={`mx-auto mt-14`} />
        <div className={`px-10 space-y-2 mt-14`}>
          <h3 className={`${h3} text-primary`}>Analyzing your profile</h3>
          <p className={`${body} text-secondary pb-5`}>Great things take time. <br />Your analysis is almost ready!</p>
        </div>
        <div className={`relative w-full h-[10%]`}>
          <div className={`relative left-1/2 top-1/2 transform -translate-x-1/4 -translate-y-1/4`}>
            {images.map((image, index) => {
              const translateXAmount = Math.floor(Math.random() * (70 - 10 + 1) + 10 * index) + 10;
              const direction = index % 2 === 0 ? -1 : 1;
              const translateX = translateXAmount * direction;
              const rotationAmount = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
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
    </div>
  );
}