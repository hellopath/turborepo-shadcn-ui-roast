'use client'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, DragEvent, forwardRef, useRef, useState } from "react";

export interface AddMoreProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  userId: string;
  onUploadedData?: (data: any) => void;
}

const AddMore = forwardRef<HTMLDivElement, AddMoreProps>(
  ({ className, userId, onUploadedData, ...props }, ref) => {
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const rounded = `rounded-[100px]`

    const onUpload = async (files: File[]) => {
      setError('');

      if (files.length > 1) {
        setError('You can only upload up to 1 image.');
        return;
      }

      const formData = new FormData();
      files.forEach(file => {
        formData.append('photo', file);
      });

      try {
        const response = await fetch(`http://localhost:5001/upload/${userId}`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        const data = await response.json();
        onUploadedData?.(data);
        console.log('Upload successful', data);
      } catch (err) {
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
        className={`relative h-full flex justify-center items-center ${className} ${rounded}`}
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
        <div className={`bg-transparent w-full h-full relative z-10 ${rounded} flex justify-center items-center`}>
          <div className={`flex flex-col justify-center items-center`}>
            <PlusCircleIcon className={`size-24 stroke-[0.3px]`} />
            <p>Add more</p>
          </div>
        </div>
      </div>
    );
  },
);

export { AddMore };
