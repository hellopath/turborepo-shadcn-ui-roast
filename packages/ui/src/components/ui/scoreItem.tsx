'use client'

import { body } from '@ui/typography';
import { HTMLAttributes, forwardRef } from "react";

export interface AnalyticsItemProps {
  title: string;
  score: number;
  isHighlighted?: boolean;
}

export interface ScoreItemProps extends AnalyticsItemProps, Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  className?: string;
}

const ScoreItem = forwardRef<HTMLDivElement, ScoreItemProps>(
  ({ className, title, score, isHighlighted, ...props }, ref) => {
    const scoreWidth = `${score}%`;
    return (
      <div
        ref={ref}
        className={`space-y-1 ${className}`}
        {...props}
      >
        <h3 className={`${body} text-left ${isHighlighted ? `text-white` : ``}`}>{title}</h3>
        <div className={`relative w-full h-2`}>
          <div
            className={`absolute z-10 w-full h-full rounded-full bg-gradient-to-l from-secondary to-gradient-button-from`}
            style={{ width: scoreWidth }}
          />
          <div className={`absolute w-full h-full bg-white opacity-10 rounded-full`} />
        </div>
      </div>
    );
  },
);

export { ScoreItem };
