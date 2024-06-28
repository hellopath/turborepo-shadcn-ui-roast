'use client'

import { SyntheticEvent, forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "@ui/components/ui/spinner";
import {Transition} from '@headlessui/react';

export interface ImageWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  className?: string;
}

const ImageWrapper = forwardRef<HTMLDivElement, ImageWrapperProps>(
  ({ className, src, alt, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const onLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      setSize({ width: e.currentTarget.width, height: e.currentTarget.height });
    };
    useEffect(() => {
      if (!isLoaded) {
        setIsLoaded(true)
      }
    }, [size])
    return (
      <div
        ref={ref}
        className={`aspect-portrait relative bg-gray-900 overflow-hidden rounded-lg ${className}`}
        {...props}
      >
        <Transition
          show={!isLoaded}
          as={'div'}
          enter="transition-opacity duration-500 ease-circ-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500 ease-circ-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10`}
          appear={true}
        >
          <Spinner />
        </Transition>
        <div
          className={`
            relative inset-0 w-full h-full aspect-portrait
            transition-opacity duration-500 ease-circ-out
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <Image
            onLoad={onLoad}
            className={`w-full h-full object-cover`}
            alt={alt}
            src={src}
            width={size.width}
            height={size.height}
          />
        </div>
      </div>
    );
  },
);

export { ImageWrapper };
