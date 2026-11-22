"use client";

import { DotsThreeIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SkillBadge, type SkillItem } from "@/components/skill-badge";
import { Button } from "./ui/button";

const MAX_VISIBLE = 7;

interface Props {
  skills: SkillItem[];
}

export function SkillBadgeList({ skills }: Props) {
  const tCommon = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);

  const visible = isOpen ? skills : skills.slice(0, MAX_VISIBLE);
  const hasMore = skills.length > MAX_VISIBLE;

  return (
    <>
      {visible.map((skill) => (
        <SkillBadge
          key={skill.id}
          slug={skill.slug ?? skill.id}
          title={skill.title}
        />
      ))}
      {hasMore && (
        <Button
          aria-expanded={isOpen}
          aria-label={tCommon(isOpen ? "showLess" : "showMore")}
          className="size-5 cursor-pointer"
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setIsOpen((open) => !open);
          }}
          size="icon-xs"
          variant="ghost"
        >
          <DotsThreeIcon weight="bold" />
        </Button>
      )}
    </>
  );
}
