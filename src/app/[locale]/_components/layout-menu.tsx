import {
  DesktopIcon,
  ListIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import {
  type ComponentProps,
  Fragment,
  useCallback,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { HOME_SECTIONS } from "@/consts/home-sections";
import { useActiveSection } from "@/hooks/reactive/use-active-section";
import { redirect, usePathname } from "@/i18n/navigation";
import { type Locale, locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { type ThemePreference, usePreferencesStore } from "@/stores/theme";

interface Props extends ComponentProps<"div"> {
  locale: Locale;
}

const SECTION_IDS = HOME_SECTIONS.map((section) => section.id);

export function LayoutMenu({ locale, ...props }: Props) {
  const t = useTranslations("homePage");
  const activeId = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2" {...props}>
      <div className="flex items-center gap-2 max-sm:hidden">
        <LayoutMenuControls locale={locale} />
      </div>
      {open && (
        <button
          aria-label="close menu"
          className="fixed inset-x-0 top-(--layout-header-height) bottom-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          type="button"
        />
      )}
      <Popover.Root onOpenChange={setOpen} open={open}>
        <Popover.Trigger asChild>
          <Button className="3xl:hidden" size="icon" variant="ghost">
            <ListIcon className="size-6" weight="bold" />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          align="end"
          className="z-50 flex w-56 flex-col gap-3"
          collisionPadding={4}
        >
          <div className="flex flex-col gap-2 sm:hidden">
            <LayoutMenuControls locale={locale} />
          </div>
          <Separator className="sm:hidden" />
          <nav className="flex flex-col gap-1">
            {HOME_SECTIONS.map((section) => (
              <Popover.Close asChild key={section.id}>
                <Button
                  asChild
                  className={cn(
                    "justify-start font-normal",
                    activeId === section.id && "font-bold text-primary"
                  )}
                  size="sm"
                  variant="ghost"
                >
                  <a href={`/${locale}/#${section.id}`}>
                    {t(`sections.${section.titleKey}.title`)}
                  </a>
                </Button>
              </Popover.Close>
            ))}
          </nav>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

export function LayoutMenuControls({ locale }: { locale: Locale }) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const { theme: preferredTheme, setTheme: setPreferredTheme } =
    usePreferencesStore();

  const lastInteractionRef = useRef<{ x: number; y: number } | null>(null);

  const changeTheme = useCallback(
    async (preference: ThemePreference) => {
      if (
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setPreferredTheme(preference);
        return;
      }

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setPreferredTheme(preference);
        });
      });

      const x = lastInteractionRef.current?.x ?? window.innerWidth / 2;
      const y = lastInteractionRef.current?.y ?? window.innerHeight / 2;

      const right = window.innerWidth - x;
      const bottom = window.innerHeight - y;

      const maxRadius = Math.hypot(Math.max(x, right), Math.max(y, bottom));

      await transition.ready;

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        { clipPath },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    },
    [setPreferredTheme]
  );

  return (
    <Fragment>
      <Select.Root
        onValueChange={(ev) => redirect({ href: pathname, locale: ev })}
        value={locale}
      >
        <Select.Trigger aria-label="language" className="w-full flex-1">
          <Select.Value placeholder={t("language")} />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {locales.map((lang) => (
              <Select.Item
                aria-label={lang.name}
                key={lang.value}
                value={lang.value}
              >
                {lang.flag} {lang.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <ToggleGroup.Root
        className="w-full flex-1"
        onPointerDown={(e) => {
          lastInteractionRef.current = { x: e.clientX, y: e.clientY };
        }}
        onValueChange={(value) => changeTheme(value as ThemePreference)}
        type="single"
        value={preferredTheme}
        variant="outline"
      >
        <ToggleGroup.Item aria-label="light" value="light">
          <SunIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item aria-label="dark" value="dark">
          <MoonIcon />
        </ToggleGroup.Item>
        <ToggleGroup.Item aria-label="system" value="system">
          <DesktopIcon />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </Fragment>
  );
}
