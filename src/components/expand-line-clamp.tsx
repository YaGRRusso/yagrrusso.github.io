import { useTranslations } from "next-intl";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props extends ComponentProps<"span"> {
  lines?: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

const LINES = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

export function ExpandLineClamps({
  lines = 6,
  text,
  className,
  ...props
}: Props) {
  const tCommon = useTranslations("common");
  const textRef = useRef<HTMLParagraphElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const { scrollHeight, clientHeight } = textRef.current;
        setIsClamped(scrollHeight > clientHeight);
      }
    };

    checkTruncation();

    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  return (
    <div className="flex flex-col">
      <span
        className={cn(!isExpanded && LINES[lines], className)}
        {...props}
        ref={textRef}
      >
        {text}
      </span>

      {(isClamped || isExpanded) && (
        <Button
          className="w-fit px-0"
          onClick={() => setIsExpanded(!isExpanded)}
          size="xs"
          variant="link"
        >
          {isExpanded ? tCommon("showLess") : tCommon("showMore")}
        </Button>
      )}
    </div>
  );
}
