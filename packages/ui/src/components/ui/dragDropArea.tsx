'use client'

import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, DragEvent, forwardRef, useRef, useState } from "react";

export interface DragDropAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DragDropArea = forwardRef<HTMLDivElement, DragDropAreaProps>(
  ({ className, ...props }, ref) => {
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const rounded = `rounded-[100px]`

    const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setError('');

      const files = Array.from(event.dataTransfer.files);

      if (files.length > 4) {
        setError('You can only upload up to 4 images.');
        return;
      }

      const formData = new FormData();
      files.forEach(file => {
        formData.append('photos', file);
      });

      try {
        const response = await fetch('http://localhost:5001/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        const data = await response.json();
        console.log('Upload successful', data);
      } catch (err) {
        console.error('Upload failed', err);
        setError('Upload failed');
      }
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
      setError('');

      const files = Array.from(event.target.files || []);
      console.log(files)

      if (files.length > 4) {
        setError('You can only upload up to 4 images.');
        return;
      }

      const formData = new FormData();
      files.forEach(file => {
        formData.append('photos', file);
      });

      console.log(formData.getAll('photos'))

      try {
        const response = await fetch('http://localhost:5001/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        const data = await response.json();
        console.log('Upload successful', data);
      } catch (err) {
        console.error('Upload failed', err);
        setError('Upload failed');
      }
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
        <div className={`bg-transparent border border-dashed border-primary w-full h-full absolute z-10 ${rounded} flex justify-center items-center`}>
          <div className={`flex flex-col justify-center items-center`}>
            <CloudArrowUpIcon className={`size-24 stroke-[0.5px]`} />
            <p className={``}>
              Drag & Drop<br/>your profile pics
            </p>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
        <div className={`w-full h-full bg-radient-ellipse-c from-accent to-transparent to-90% ${rounded}`}></div>
      </div>
    );
  },
);

export { DragDropArea };
