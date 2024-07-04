'use client'

import { Button } from "@repo/ui/components/ui/button";
import { ImageWrapper } from "@repo/ui/components/ui/imageWrapper";
import { Logo } from "@repo/ui/components/ui/logo";
import { body, h3 } from "@ui/typography";
import { useState, useRef } from "react";
import Link from "next/link";

export default function Page() {
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  const onButtonEnter = () => {
    setIsHighlighted(true);
  };

  const onButtonLeave = () => {
    setIsHighlighted(false);
  };

  return (
    <div className={`absolute w-full h-full top-0`}>
      <div className={`absolute z-10 w-full h-full pointer-events-none`}>
        <Logo className={`mx-auto mt-14`} />
        <div className={`relative w-full h-[30%]`}>
          <div className={`relative left-1/2 top-1/2 transform -translate-x-1/4 -translate-y-1/4`}>
            <div className={`w-7/12 absolute -top-16 -left-14`}>
              <ImageWrapper
                isAnimated
                src="/homeImage2.jpg"
                alt="profile 2"
                className={`transition-all duration-500 ease-in-out ${isHighlighted ? `-rotate-6 scale-105 translate-x-4` : `-rotate-3`}`}
              />
            </div>
            <div className={`w-14 absolute top-16 left-48`}>
              <ImageWrapper
                isAnimated
                src="/emoji-1.png"
                alt="emoji 2"
                aspect="aspect-square"
                className={`transition-all duration-500 ease-in-out ${isHighlighted ? `-rotate-6 translate-x-4` : `-rotate-3`}`}
              />
            </div>
            <div className={`w-14 absolute top-72 -left-14`}>
              <ImageWrapper
                isAnimated
                src="/emoji-2.png"
                alt="emoji 2"
                aspect="aspect-square"
                className={`transition-all duration-500 ease-in-out ${isHighlighted ? `-rotate-6 translate-x-4` : `-rotate-3`}`}
              />
            </div>
            <div className={`w-5/12 absolute top-36 left-20`}>
              <ImageWrapper
                isAnimated
                src="/homeImage1.jpg"
                alt="profile 1"
                className={`transition-all duration-500 ease-in-out ${isHighlighted ? `rotate-6 scale-105 -translate-x-4` : `rotate-3`}`}
              />
            </div>
          </div>
        </div>
        <div className={`absolute bottom-0 px-10 space-y-2 pb-10`}>
          <h3 className={`${h3} text-primary`}>Your profile has potential!</h3>
          <p className={`${body} text-secondary pb-5`}>Receive an insightful analysis, check out our tips to help you put your best forward</p>
          <Link href="/upload">
            <Button
              onMouseEnter={onButtonEnter}
              onMouseLeave={onButtonLeave}
              size={`lg`}
              className={`w-full pointer-events-auto`}
            >
              Unveil the Best You!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}