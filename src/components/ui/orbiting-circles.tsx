import React from "react";

import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  iconSize?: number;
  path?: boolean;
  radius?: number;
  reverse?: boolean;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>lines</title>
          <circle
            className="stroke-1 stroke-foreground/5"
            cx="50%"
            cy="50%"
            fill="none"
            r={radius}
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            className={cn(
              "absolute flex size-(--icon-size) transform-gpu animate-orbit items-center justify-center rounded-full",
              { "direction-[reverse]": reverse },
              className
            )}
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
