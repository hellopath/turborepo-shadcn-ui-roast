'use client'

import { SyntheticEvent, forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Spinner } from "@ui/components/ui/spinner";
import {Transition} from '@headlessui/react';
import useAnimationFrame from "@ui/hooks/useAnimationFrame";

export interface ImageWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  className?: string;
  isAnimated?: boolean;
}

interface AnimationState {
  x: number,
  y: number,
  rotation: number,
}

const ImageWrapper = forwardRef<HTMLDivElement, ImageWrapperProps>(
  ({ className, src, alt, isAnimated = false, ...props }, ref) => {
    const time = useRef<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [imageState, setImageState] = useState<AnimationState>({ x: 0, y: 0, rotation: 0 });
    const xRandomOffset = Math.floor(Math.random() * 4) + 1;
    const yRandomOffset = Math.floor(Math.random() * 10) + 1;
    const rotationRandomOffset = Math.floor(Math.random() * 4) + 1;

    const onLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      setSize({ width: e.currentTarget.width, height: e.currentTarget.height });
    };
    useEffect(() => {
      if (!isLoaded) {
        setIsLoaded(true)
      }
    }, [size])
    if (isAnimated) {
      useAnimationFrame((deltaTime) => {
        time.current += deltaTime / 1000;
        setImageState({
          x: Math.sin(time.current) * xRandomOffset,
          y: Math.cos(time.current) * yRandomOffset,
          rotation: Math.cos(time.current) * rotationRandomOffset,
        });
      });
    }
    return (
      <div
        ref={ref}
        className={`${className}`}
        {...props}
      >
        <div
          className={`aspect-portrait relative overflow-hidden rounded-lg`}
          style={{
            transform: `translate(${imageState.x}px, ${imageState.y}px) rotate(${imageState.rotation}deg)`
          }}
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
      </div>
    );
  },
);

export { ImageWrapper };
