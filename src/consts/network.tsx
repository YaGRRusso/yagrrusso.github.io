export type NetworkType = {
  avatar: string;
  name: string;
  role: string;
  urls: { title: string; value: string }[];
};

export const NETWORKS = {
  aeciobrumel: {
    avatar: "https://github.com/aeciobrumel.png?size=128",
    name: "Aecio Brumel",
    role: "Software Engineer",
    urls: [
      { title: "github", value: "https://github.com/aeciobrumel" },
      { title: "linkedin", value: "https://www.linkedin.com/in/aeciobrumel/" },
      { title: "website", value: "https://brumel.dev/" },
    ],
  },
  andre94cavalcante: {
    avatar: "https://github.com/andre94cavalcante.png?size=128",
    name: "André Cavalcante",
    role: "Software Engineer",
    urls: [
      { title: "github", value: "https://github.com/andre94cavalcante" },
      {
        title: "linkedin",
        value: "https://www.linkedin.com/in/andre94cavalcante/",
      },
      { title: "website", value: "https://andre94cavalcante.github.io/" },
    ],
  },
  ftarganski: {
    avatar: "https://github.com/ftarganski.png?size=128",
    name: "Francis Targanski",
    role: "Software Engineer",
    urls: [
      { title: "github", value: "https://github.com/ftarganski" },
      { title: "linkedin", value: "https://www.linkedin.com/in/targanski/" },
      { title: "website", value: "https://www.targanski.com/" },
    ],
  },
  "gabrielh-silvestre": {
    avatar: "https://github.com/gabrielh-silvestre.png?size=128",
    name: "Gabriel Silvestre",
    role: "Software Engineer",
    urls: [
      { title: "github", value: "https://github.com/gabrielh-silvestre" },
      {
        title: "linkedin",
        value: "https://www.linkedin.com/in/gabrielh-silvestre/",
      },
    ],
  },
  TVInacio: {
    avatar: "https://github.com/TVInacio.png?size=128",
    name: "Thiago Veronesi",
    role: "Software Engineer",
    urls: [
      { title: "github", value: "https://github.com/TVInacio" },
      {
        title: "linkedin",
        value: "https://www.linkedin.com/in/tiago-veronesi/",
      },
    ],
  },
  yagrrusso: {
    avatar: "https://github.com/yagrrusso.png?size=128",
    name: "Yago Russo",
    role: "Software Engineer",
    urls: [{ title: "github", value: "https://github.com/yagrrusso" }],
  },
} as const satisfies Record<string, NetworkType>;

export function getNetwork(value: keyof typeof NETWORKS | (string & {})) {
  const network = NETWORKS[value as keyof typeof NETWORKS];
  if (network) return network;

  return NETWORKS.yagrrusso;
}
