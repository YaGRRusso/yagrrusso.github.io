import {
  ArrowUpRightIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  GlobeIcon,
  LinkedinLogoIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

type UrlType = { value: string; key: string; icon: ReactNode };

export const URLS = {
  other: {
    value: "other",
    key: "urls.other",
    icon: <GlobeIcon />,
  },
  github: {
    value: "github",
    key: "urls.github",
    icon: <GithubLogoIcon />,
  },
  linkedin: {
    value: "linkedin",
    key: "urls.linkedin",
    icon: <LinkedinLogoIcon />,
  },
  whatsapp: {
    value: "whatsapp",
    key: "urls.whatsapp",
    icon: <WhatsappLogoIcon />,
  },
  email: {
    value: "email",
    key: "urls.email",
    icon: <EnvelopeIcon />,
  },
  phone: {
    value: "phone",
    key: "urls.phone",
    icon: <PhoneIcon />,
  },
  website: {
    value: "website",
    key: "urls.website",
    icon: <GlobeIcon />,
  },
  repository: {
    value: "repository",
    key: "urls.repository",
    icon: <GithubLogoIcon />,
  },
  demo: {
    value: "demo",
    key: "urls.demo",
    icon: <ArrowUpRightIcon />,
  },
} as const satisfies Record<string, UrlType>;

export function getUrl(value: string) {
  const url = URLS[value as keyof typeof URLS];
  if (url) return url;

  return URLS.other;
}
