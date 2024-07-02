'use client'

import { Transition } from '@headlessui/react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, DragEvent, forwardRef, useRef, useState } from "react";
import { Spinner } from './spinner';

export interface DragDropAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onUploadedData?: (data: any) => void;
}

const DragDropArea = forwardRef<HTMLDivElement, DragDropAreaProps>(
  ({ className, onUploadedData, ...props }, ref) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const rounded = `rounded-[100px]`

    const onUpload = async (files: File[]) => {
      setError('');

      if (files.length > 4) {
        setError('You can only upload up to 4 images.');
        return;
      }

      const formData = new FormData();
      files.forEach(file => {
        formData.append('photos', file);
      });

      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5001/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        const data = await response.json();
        onUploadedData?.(data);
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
        console.log('Upload successful', data);
      } catch (err) {
        setIsLoading(false);
        console.error('Upload failed', err);
        setError('Upload failed');
      }
    };

    const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onUpload(Array.from(event.dataTransfer.files));
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
      setError('');
      onUpload(Array.from(event.target.files || []));
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    return (
      <div
        ref={ref}
        className={`h-[50vh] relative ${className} ${rounded}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />
        <div className={`bg-transparent w-full h-full absolute z-10 ${rounded} flex justify-center items-center top-0`}>
          <Transition
            show={isLoading}
            as={'div'}
            enter="transition-opacity duration-500 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10`}
            appear={true}
          >
            <Spinner />
          </Transition>
          <Transition
            show={!isLoading}
            as={'div'}
            enter="transition-opacity duration-500 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={`flex flex-col justify-center items-center`}
            appear={true}
          >
            <>
              <CloudArrowUpIcon className={`size-32 stroke-[0.3px]`} />
              <p className={``}>
                Drag & Drop<br />your profile pics
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </>
          </Transition>
        </div>
        <svg viewBox="0 0 315 405" fill="none" className={`absolute top-0 w-full h-full`}>
          <rect x="0.5" y="0.5" width="314" height="404" rx="99.5" fill="url(#paint0_radial_2006_239)" fillOpacity="0.4" />
          <rect x="0.5" y="0.5" width="314" height="404" rx="99.5" stroke="#FFEDE8" strokeLinecap="round" strokeDasharray="11 11" />
          <defs>
            <radialGradient id="paint0_radial_2006_239" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(158.016 175.706) rotate(90.129) scale(229.294 178.34)">
              <stop stopColor="#FF6032" />
              <stop offset="1" stopColor="#FF6032" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  },
);

export { DragDropArea };
