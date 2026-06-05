import { useTranslations } from "next-intl";
import { type ComponentProps, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"p"> {
  length?: number;
  onResize?: (data: boolean) => void;
  text: string;
}

export function ExpandCharacters({
  length = 512,
  text,
  onResize,
  className,
  ...props
}: Props) {
  const tCommon = useTranslations("common");

  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = text.length > length;

  const content = useMemo(() => {
    if (isExpanded || !isActive) return text;

    let truncated = text.slice(0, length);

    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }

    return `${truncated}...`;
  }, [isExpanded, length, text, isActive]);

  return (
    <div className={cn("inline", className)} {...props}>
      <span>
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
