'use client'

import { forwardRef } from "react";
import { ImageWrapper } from "./imageWrapper";
import { XCircleIcon } from '@heroicons/react/24/outline'

export interface ActionableImageWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  src: string;
  alt: string;
  className?: string;
  onDelete: (id:string) => void;
}

const ActionableImageWrapper = forwardRef<HTMLDivElement, ActionableImageWrapperProps>(
  ({ id, className, src, alt, onDelete, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`aspect-portrait relative overflow-hidden rounded-lg ${className}`}
        {...props}
      >
        <button onClick={() => onDelete(id)} className={`absolute bottom-2 transform -translate-x-1/2 left-1/2 w-6 h-6 text-white z-10 fill-gray-500`}>
          <XCircleIcon />
        </button>
        <ImageWrapper src={src} alt={alt} />
      </div>
    );
  },
);

export { ActionableImageWrapper };
