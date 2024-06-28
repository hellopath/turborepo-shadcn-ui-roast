'use client'

import { Button } from "@repo/ui/components/ui/button";
import { Logo } from "@repo/ui/components/ui/logo";
import { HomeThree } from "@ui/components/three/home";
import { body, h3 } from "@ui/typography";

export default function Page() {
  return (
    <div className={`absolute w-full h-full top-0`}>
      <div className={`absolute z-10 w-full h-full pointer-events-none`}>
        <Logo className={`mx-auto mt-14`} />
        <div className={`absolute bottom-0 px-10 space-y-2 pb-10`}>
          <h3 className={`${h3} text-primary`}>Your profile has potential!</h3>
          <p className={`${body} text-secondary pb-5`}>Receive an insightful analysis, check out our tips to help you put your best forward</p>
          <Button size={`lg`} className={`w-full pointer-events-auto`}>
            Unveil the Best You!
          </Button>
        </div>
      </div>
      <div className={`w-full h-full absolute inset-0 z-0`}>
        <HomeThree />
      </div>
      {/* </div> */}
      {/* <h3 className={`${h3} text-primary`}>Your profile has potential!</h3>
      <p className={`${body} text-secondary`}>Receive an insightful analysis, check out our tips to help you put your best forward</p>
      <Button size={`lg`} className={`w-full`}>
        Unveil the Best You!
      </Button>
      <DragDropArea />
      <div className={`flex`}>
        <ImageWrapper src="/profile1.jpg" alt="profile 1" className={`w-1/2`} />
        <ImageWrapper src="/profile2.jpg" alt="profile 2" className={`w-1/2`} />
        <ImageWrapper src="/profile3.jpg" alt="profile 3" className={`w-1/2`} />
      </div>
      <ActionableImageWrapper
        src="/profile3.jpg"
        alt="profile 3"
        className={`w-1/2`}
        onDelete={() => { console.log('delete') }}
      /> */}
    </div>
  );
}