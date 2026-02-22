import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Accordion } from "./ui/accordion";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Timeline } from "./ui/timeline";

interface Props
  extends Omit<
    Extract<ComponentProps<typeof Accordion.Root>, { type: "multiple" }>,
    "type"
  > {
  company: {
    title: string;
    image: string;
    url: string;
  };
  roles: {
    title: string;
    description: string;
    date: {
      from: Date;
      to?: Date;
    };
    skills?: {
      id: string;
      title: string;
      slug: string;
    }[];
  }[];
}

export function ExperienceCard({ className, company, roles, ...props }: Props) {
  const tCommon = useTranslations("common");

  return (
    <Accordion.Root
      className={cn(
        "flex flex-col gap-8 rounded border bg-alternative px-8 py-12",
        className
      )}
      defaultValue={["0"]}
      type="multiple"
      {...props}
    >
      <div className="flex flex-col">
        <a
          className="flex flex-wrap items-center gap-4"
          href={company.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Avatar.Root className="size-14">
            <Avatar.Image alt={company.title} src={company.image} />
            <Avatar.Fallback />
          </Avatar.Root>
          <div className="flex items-center gap-4 font-semibold text-4xl max-md:text-3xl">
            {company.title}
            {!roles.at(-1)?.date.to && (
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
                      <Timeline.Date className="font-semibold text-muted-foreground text-sm">
                        {dayjs(role.date.from).format("MM/YYYY")}
                        {" - "}
                        {role.date.to
                          ? dayjs(role.date.to).format("MM/YYYY")
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
                  {role.description}
                </Accordion.Content>
                {role.skills && role.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 py-2">
                    {role.skills.map((skill) => (
                      <Badge
                        className="uppercase"
                        key={skill.id}
                        variant="secondary"
                      >
                        {skill.title}
                      </Badge>
                    ))}
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
