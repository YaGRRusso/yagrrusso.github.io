import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { DottedList } from "@/components/dotted-list";
import { ExpandCharacters } from "@/components/expand-characters";
import { Period } from "@/components/period";
import type { SkillItem } from "@/components/skill-badge";
import { SkillBadgeList } from "@/components/skill-badge-list";
import { Avatar } from "@/components/ui/avatar";
import { Timeline } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
import type { OrganizationProps, PeriodProps } from "./card-props";

type Role = {
  description: string;
  period?: PeriodProps;
  skills?: SkillItem[];
  title: string;
};

interface Props extends ComponentProps<"div"> {
  organization: OrganizationProps;
  roles: Role[];
}

function RoleContent({ role }: { role: Role }) {
  const tCommon = useTranslations("common");
  const duration = dayjs(role.period?.to).diff(
    dayjs(role.period?.from),
    "month"
  );

  return (
    <div className="flex flex-col gap-2">
      <DottedList>
        <Period from={role.period?.from} to={role.period?.to} />
        <span>{tCommon("time.months", { count: duration })}</span>
      </DottedList>
      <h3 className="hyphens-auto font-semibold text-2xl">{role.title}</h3>
      <ExpandCharacters
        className="text-muted-foreground"
        text={role.description}
      />
      {!!role.skills?.length && (
        <div className="flex flex-wrap gap-2 py-2">
          <SkillBadgeList skills={role.skills} />
        </div>
      )}
    </div>
  );
}

export function ExperienceCard({
  className,
  organization,
  roles,
  ...props
}: Props) {
  const isCurrent = roles.some((role) => !role.period?.to);

  return (
    <div
      className={cn(
        "flex flex-col gap-8 rounded border bg-card/40 px-8 py-12 text-card-foreground",
        className
      )}
      {...props}
    >
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
          {isCurrent && (
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="inline-flex size-2 rounded-full bg-primary" />
            </span>
          )}
        </div>
      </a>

      {roles.length > 1 ? (
        <Timeline.Root className="w-full" defaultValue={0}>
          {roles.map((role, index) => (
            <Timeline.Item key={index} step={index}>
              <RoleContent role={role} />
            </Timeline.Item>
          ))}
        </Timeline.Root>
      ) : (
        <RoleContent role={roles[0]} />
      )}
    </div>
  );
}
