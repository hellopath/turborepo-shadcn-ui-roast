'use client'

import { body } from "@ui/typography";
import { ReactNode } from "react";
import { GradientsBg } from "@ui/components/ui/gradientsBg"

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className={`${body} text-secondary bg-[#BB341E] fixed inset-0 w-screen h-screen flex justify-center items-center`}>
      <div className={`w-full h-full max-w-[390px] max-h-[844px] shadow-xl rounded-xl overflow-hidden absolute bg-[#22100A]`}>
        <div className={`text-center relative z-10 w-full h-full`}>
          {children}
        </div>
        <GradientsBg className={`absolute inset-0 z-0 w-full h-full`} />
      </div>
    </main>
  );
}

export { Wrapper }