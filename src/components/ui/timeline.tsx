"use client";

import { useInView } from "motion/react";
import { Slot } from "radix-ui";
import {
  createContext,
  type HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type TimelineContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  scrollReveal?: boolean;
};

const TimelineContext = createContext<TimelineContextValue | undefined>(
  undefined
);

const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within a Timeline");
  }
  return context;
};

interface TimelineProgressProps extends HTMLAttributes<HTMLDivElement> {}

function TimelineProgress({ className, ...props }: TimelineProgressProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "sticky bottom-[calc(15%-1rem)] size-4 rounded-full bg-primary/10",
        className
      )}
      data-slot="timeline-progress"
      {...props}
    />
  );
}

interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  currentValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
  scrollReveal?: boolean;
  scrollProgress?: boolean;
}

function TimelineRoot({
  defaultValue = 0,
  currentValue,
  value,
  onValueChange,
  orientation = "vertical",
  scrollReveal = false,
  scrollProgress = false,
  className,
  children,
  ...props
}: TimelineProps) {
  const [activeStep, setInternalStep] = useState(defaultValue);

  const setActiveStep = useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step);
      }
      onValueChange?.(step);
    },
    [value, onValueChange]
  );

  const currentStep = currentValue ?? value ?? activeStep;

  return (
    <TimelineContext.Provider
      value={{ activeStep: currentStep, setActiveStep, scrollReveal }}
    >
      <div
        className={cn(
          "group/timeline relative flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          className
        )}
        data-orientation={orientation}
        data-slot="timeline"
        {...props}
      >
        {children}
        {scrollProgress && <TimelineProgress />}
      </div>
    </TimelineContext.Provider>
  );
}

function TimelineContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="timeline-content"
      {...props}
    />
  );
}

interface TimelineDateProps extends HTMLAttributes<HTMLTimeElement> {
  asChild?: boolean;
}

function TimelineDate({
  asChild = false,
  className,
  ...props
}: TimelineDateProps) {
  const Comp = asChild ? Slot.Root : "time";

  return (
    <Comp
      className={cn(
        "mb-1 block font-medium text-muted-foreground text-xs group-data-[orientation=vertical]/timeline:max-sm:h-4",
        className
      )}
      data-slot="timeline-date"
      {...props}
    />
  );
}

function TimelineHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} data-slot="timeline-header" {...props} />
  );
}

interface TimelineIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

function TimelineIndicator({
  asChild = false,
  className,
  children,
  ...props
}: TimelineIndicatorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute size-4 rounded-full border-2 border-primary/20 group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=vertical]/timeline:top-0 group-data-[orientation=horizontal]/timeline:left-0 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:-translate-x-1/2 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-completed/timeline-item:border-primary",
        className
      )}
      data-slot="timeline-indicator"
      {...props}
    >
      {children}
    </div>
  );
}

interface TimelineItemProps extends HTMLAttributes<HTMLDivElement> {
  step: number;
  alternate?: boolean;
}

function TimelineItem({
  step,
  alternate,
  className,
  ...props
}: TimelineItemProps) {
  const { activeStep, setActiveStep, scrollReveal } = useTimeline();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });

  useEffect(() => {
    if (scrollReveal && inView) {
      setActiveStep(step);
    } else {
      setActiveStep(step - 1);
    }
  }, [scrollReveal, inView, step, setActiveStep]);

  return (
    <div
      className={cn(
        "group/timeline-item relative flex flex-1 flex-col gap-0.5 transition-all has-[+[data-completed]]:**:data-[slot=timeline-separator]:bg-primary group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:not-last:pb-12",
        alternate &&
          "w-[calc(50%-1.5rem)] odd:ms-auto even:text-right even:group-data-[orientation=vertical]/timeline:ms-0 even:group-data-[orientation=vertical]/timeline:me-8 even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-indicator]:-right-6 even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-separator]:-right-6 even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-indicator]:left-auto even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-separator]:left-auto even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-indicator]:translate-x-1/2 even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-separator]:translate-x-1/2",
        className
      )}
      data-completed={step <= activeStep || undefined}
      data-slot="timeline-item"
      ref={ref}
      {...props}
    />
  );
}

function TimelineSeparator({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute self-start bg-primary/10 group-last/timeline-item:hidden group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=horizontal]/timeline:h-0.5 group-data-[orientation=vertical]/timeline:h-[calc(100%-1rem-0.25rem)] group-data-[orientation=horizontal]/timeline:w-[calc(100%-1rem-0.25rem)] group-data-[orientation=vertical]/timeline:w-0.5 group-data-[orientation=horizontal]/timeline:translate-x-4.5 group-data-[orientation=vertical]/timeline:-translate-x-1/2 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:translate-y-4.5",
        className
      )}
      data-slot="timeline-separator"
      {...props}
    />
  );
}

function TimelineTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-medium text-sm", className)}
      data-slot="timeline-title"
      {...props}
    />
  );
}

export const Timeline = {
  Root: TimelineRoot,
  Content: TimelineContent,
  Date: TimelineDate,
  Header: TimelineHeader,
  Indicator: TimelineIndicator,
  Item: TimelineItem,
  Separator: TimelineSeparator,
  Title: TimelineTitle,
};
