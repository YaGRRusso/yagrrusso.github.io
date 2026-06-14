import { HouseIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { type ComponentProps, Fragment } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "./ui/breadcrumb";
import { DropdownMenu } from "./ui/dropdown-menu";

interface Props extends ComponentProps<"div"> {
  path?: {
    label: string;
    href: string;
  }[];
  title: string;
}

export function PageTitle({
  children,
  className,
  title,
  path,
  ...props
}: Props) {
  const t = useTranslations("common");

  return (
    <div className={cn("flex flex-col gap-2 pb-4", className)} {...props}>
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">
              <HouseIcon className="mb-0.5" weight="bold" />
              <span className="max-sm:hidden">{t("home")}</span>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          {path && (
            <Fragment>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="hover:text-foreground">
                    <Breadcrumb.Ellipsis />
                    <span className="sr-only">{t("menu")}</span>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="start">
                    {path.map((item) => (
                      <DropdownMenu.Item asChild key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Breadcrumb.Item>
            </Fragment>
          )}
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>{title}</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <h1 className="font-bold text-4xl">{title}</h1>
    </div>
  );
}
