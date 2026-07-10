import { useTranslations } from "next-intl";
import { type ComponentProps, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const MAX_LINES = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

interface Props extends ComponentProps<"p"> {
  maxLength?: number;
  maxLines?: keyof typeof MAX_LINES;
  onResize?: (data: boolean) => void;
  text: string;
}

export function ExpandCharacters({
  maxLength = 512,
  maxLines = 3,
  text,
  onResize,
  className,
  ...props
}: Props) {
  const tCommon = useTranslations("common");

  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = text.length > maxLength;

  const content = useMemo(() => {
    if (isExpanded || !isActive) return text;

    let truncated = text.slice(0, maxLength);

    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }

    return `${truncated}...`;
  }, [isExpanded, maxLength, text, isActive]);

  return (
    <div className={cn("inline", className)} {...props}>
      <span className={cn(!isExpanded && MAX_LINES[maxLines])}>
        {content}
        {isActive && " "}
      </span>
      {isActive && (
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
