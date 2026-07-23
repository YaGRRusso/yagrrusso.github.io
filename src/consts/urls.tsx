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

export type UrlType = { value: string; key: string; icon: ReactNode };

export const URLS = {
  demo: {
    icon: <ArrowUpRightIcon />,
    key: "urls.demo",
    value: "demo",
  },
  email: {
    icon: <EnvelopeIcon />,
    key: "urls.email",
    value: "email",
  },
  github: {
    icon: <GithubLogoIcon />,
    key: "urls.github",
    value: "github",
  },
  linkedin: {
    icon: <LinkedinLogoIcon />,
    key: "urls.linkedin",
    value: "linkedin",
  },
  other: {
    icon: <GlobeIcon />,
    key: "urls.other",
    value: "other",
  },
  phone: {
    icon: <PhoneIcon />,
    key: "urls.phone",
    value: "phone",
  },
  repository: {
    icon: <GithubLogoIcon />,
    key: "urls.repository",
    value: "repository",
  },
  website: {
    icon: <GlobeIcon />,
    key: "urls.website",
    value: "website",
  },
  whatsapp: {
    icon: <WhatsappLogoIcon />,
    key: "urls.whatsapp",
    value: "whatsapp",
  },
} as const satisfies Record<string, UrlType>;

export function getUrl(value: keyof typeof URLS | (string & {})) {
  const url = URLS[value as keyof typeof URLS];
  if (url) return url;

  return URLS.other;
}
