import {
  DesktopIcon,
  ListIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { type ComponentProps, Fragment, useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { redirect, usePathname } from "@/i18n/navigation";
import { type Locale, locales } from "@/i18n/routing";
import { type ThemePreference, usePreferencesStore } from "@/stores/theme";
import { Button } from "./ui/button";
import { Popover } from "./ui/popover";
import { Select } from "./ui/select";

interface Props extends ComponentProps<"div"> {
  locale: Locale;
}

export function LayoutMenu({ locale, ...props }: Props) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <div className="flex items-center gap-2 max-sm:hidden">
        <LayoutMenuControls locale={locale} />
      </div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button className="sm:hidden" size="icon" variant="ghost">
            <ListIcon className="size-6" weight="bold" />
          </Button>
        </Popover.Trigger>
        <Popover.Content className="flex gap-2" collisionPadding={4}>
          <LayoutMenuControls locale={locale} />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

export function LayoutMenuControls({ locale }: { locale: Locale }) {
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
        <Select.Trigger aria-label="language" className="flex-1">
          <Select.Value placeholder="Language" />
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
        className="flex-1"
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
