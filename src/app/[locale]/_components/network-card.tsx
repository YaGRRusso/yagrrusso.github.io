import type { ComponentProps } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { getUrl } from "@/consts/urls";

interface Props extends ComponentProps<typeof Carousel.Item> {
  avatar: string;
  name: string;
  role: string;
  urls: { title: string; value: string }[];
}

export function NetworkCard({ avatar, urls, name, role, ...props }: Props) {
  return (
    <Carousel.Item
      className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      {...props}
    >
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded border bg-card/40 px-8 py-12 text-card-foreground">
        <Avatar.Root className="size-20">
          <Avatar.Image alt={name} src={avatar} />
          <Avatar.Fallback>{name.charAt(0)}</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-semibold text-xl max-md:text-3xl">{name}</h3>
          <p className="text-muted-foreground">{role}</p>
        </div>
        {urls.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {urls?.map((url) => (
              <Button
                asChild
                key={url.title + url.value}
                size="icon"
                variant="outline"
              >
                <a href={url.value} rel="noopener noreferrer" target="_blank">
                  {getUrl(url.title).icon}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </Carousel.Item>
  );
}
