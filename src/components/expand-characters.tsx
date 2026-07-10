"use client";

import { useTranslations } from "next-intl";
import { type ComponentProps, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LINE_CLAMP = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
} as const;

interface Props extends Omit<ComponentProps<"div">, "children"> {
  maxLines?: keyof typeof LINE_CLAMP;
  onResize?: (expanded: boolean) => void;
  text: string;
}

export function ExpandCharacters({
  maxLines = 3,
  text,
  onResize,
  className,
  ...props
}: Props) {
  const tCommon = useTranslations("common");
  const ref = useRef<HTMLSpanElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || isExpanded) {
      return;
    }

    const update = () => {
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, [isExpanded]);

  const showToggle = isOverflowing || isExpanded;

  return (
    <div className={cn("inline", className)} {...props}>
      <span className={cn(!isExpanded && LINE_CLAMP[maxLines])} ref={ref}>
        {text}
        {showToggle && " "}
      </span>
      {showToggle && (
        <button
          className="cursor-pointer text-primary text-sm underline-offset-1 hover:underline"
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            if (onResize) {
              onResize(!isExpanded);
            } else {
              setIsExpanded((prev) => !prev);
            }
          }}
          type="button"
        >
          {isExpanded ? tCommon("showLess") : tCommon("showMore")}
        </button>
      )}
    </div>
  );
}
