import type { ComponentProps, ReactNode } from "react";
import { Carousel } from "./ui/carousel";

interface Props extends ComponentProps<typeof Carousel.Item> {
  description: string;
  icon: ReactNode;
  title: string;
}

export function SkillCard({ title, description, icon, ...props }: Props) {
  return (
    <Carousel.Item className="basis-full sm:basis-1/2 lg:basis-1/3" {...props}>
      <div className="flex h-full flex-col justify-center gap-4 rounded border px-8 py-12">
        <div className="flex size-14 items-center justify-center rounded bg-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-4xl max-md:text-3xl">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Carousel.Item>
  );
}
