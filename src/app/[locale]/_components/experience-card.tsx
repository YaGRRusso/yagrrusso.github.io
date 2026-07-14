import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { ExpandCharacters } from "@/components/expand-characters";
import type { SkillItem } from "@/components/skill-badge";
import { SkillBadgeList } from "@/components/skill-badge-list";
import { Accordion } from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { Timeline } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
import type { OrganizationProps, PeriodProps } from "./card-props";

interface Props
  extends Omit<
    Extract<ComponentProps<typeof Accordion.Root>, { type: "multiple" }>,
    "type"
  > {
  organization: OrganizationProps;
  roles: {
    title: string;
    description: string;
    period?: PeriodProps;
    skills?: SkillItem[];
  }[];
}

export function ExperienceCard({
  className,
  organization,
  roles,
  ...props
}: Props) {
  const tCommon = useTranslations("common");

  return (
    <Accordion.Root
      className={cn(
        "flex flex-col gap-8 rounded border bg-card/40 px-8 py-12 text-card-foreground",
        className
      )}
      defaultValue={["0"]}
      type="multiple"
      {...props}
    >
      <div className="flex flex-col">
        <a
          className="flex flex-wrap items-center gap-4"
          href={organization.website || undefined}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Avatar.Root className="size-12">
            <Avatar.Image
              alt={organization.name}
              src={organization.logo || undefined}
            />
            <Avatar.Fallback />
          </Avatar.Root>
          <div className="flex items-center gap-4 font-semibold text-4xl max-md:text-3xl">
            {organization.name}
            {!roles.at(-1)?.period?.to && (
              <div className="relative flex size-2">
                <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <div className="inline-flex size-2 rounded-full bg-primary" />
              </div>
            )}
          </div>
        </a>
      </div>
      <Timeline.Root className="w-full" defaultValue={0}>
        {roles.map((role, index) => (
          <Timeline.Item key={index} step={index}>
            <Accordion.Item value={index.toString()}>
              <Timeline.Header>
                <Accordion.Trigger
                  className="-mt-1 flex w-full items-center justify-between gap-4 text-left"
                  indicator
                >
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <Timeline.Date className="text-muted-foreground text-sm">
                        {dayjs(role.period?.from).format("MM/YYYY")}
                        {" - "}
                        {role.period?.to
                          ? dayjs(role.period?.to).format("MM/YYYY")
                          : tCommon("present")}
                      </Timeline.Date>
                    </div>
                    <Timeline.Title className="hyphens-auto font-semibold text-2xl">
                      {role.title}
                    </Timeline.Title>
                  </div>
                </Accordion.Trigger>
              </Timeline.Header>
              <Timeline.Content className="flex flex-col">
                <Accordion.Content className="py-2 text-muted-foreground">
                  <ExpandCharacters text={role.description} />
                </Accordion.Content>
                {role.skills && role.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 py-2">
                    <SkillBadgeList skills={role.skills} />
                  </div>
                )}
              </Timeline.Content>
            </Accordion.Item>
          </Timeline.Item>
        ))}
      </Timeline.Root>
    </Accordion.Root>
  );
}
