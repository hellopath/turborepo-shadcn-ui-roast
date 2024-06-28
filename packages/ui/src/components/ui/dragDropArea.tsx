import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { forwardRef } from "react";

export interface DragDropAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DragDropArea = forwardRef<HTMLDivElement, DragDropAreaProps>(
  ({ className, ...props }, ref) => {
    const rounded = `rounded-[100px]`
    return (
      <div
        ref={ref}
        className={`h-[50vh] relative ${className} ${rounded}`}
        {...props}
      >
        <div className={`bg-transparent border border-dashed border-primary w-full h-full absolute z-10 ${rounded} flex justify-center items-center`}>
          <div className={`flex flex-col justify-center items-center`}>
            <CloudArrowUpIcon className={`size-24 stroke-[0.5px]`} />
            <p className={``}>
              Drag & Drop<br/>your profile pics
            </p>
          </div>
        </div>
        <div className={`w-full h-full bg-radient-ellipse-c from-accent to-transparent to-90% ${rounded}`}></div>
      </div>
    );
  },
);

export { DragDropArea };
