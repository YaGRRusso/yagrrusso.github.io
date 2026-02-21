export const skills = [
  {
    category: "DEV",
    color: "#61DAFB",
    createdAt: new Date(),
    id: "s1",
    title: "React",
    slug: "react",
    updatedAt: new Date(),
  },
  {
    category: "DEV",
    color: "#3178C6",
    createdAt: new Date(),
    id: "s2",
    title: "TypeScript",
    slug: "typescript",
    updatedAt: new Date(),
  },
  {
    category: "DEV",
    color: "#339933",
    createdAt: new Date(),
    id: "s3",
    title: "Node.js",
    slug: "nodejs",
    updatedAt: new Date(),
  },
  {
    category: "DEV",
    color: "#000000",
    createdAt: new Date(),
    id: "s4",
    title: "Next.js",
    slug: "nextjs",
    updatedAt: new Date(),
  },
  {
    category: "OPS",
    color: "#2496ED",
    createdAt: new Date(),
    id: "s5",
    title: "Docker",
    slug: "docker",
    updatedAt: new Date(),
  },
  {
    category: "OPS",
    color: "#D24939",
    createdAt: new Date(),
    id: "s6",
    title: "AWS",
    slug: "aws",
    updatedAt: new Date(),
  },
  {
    category: "DB",
    color: "#4479A1",
    createdAt: new Date(),
    id: "s7",
    title: "MySQL",
    slug: "mysql",
    updatedAt: new Date(),
  },
  {
    category: "DB",
    color: "#336791",
    createdAt: new Date(),
    id: "s8",
    title: "PostgreSQL",
    slug: "postgresql",
    updatedAt: new Date(),
  },
  {
    category: "DEV",
    color: "#38B2AC",
    createdAt: new Date(),
    id: "s9",
    title: "Tailwind CSS",
    slug: "tailwindcss",
    updatedAt: new Date(),
  },
];

type Experience = {
  id: string;
  slug: string;
  company: {
    title: string;
    url: string;
    image: string;
  };
  category: "FULL_TIME" | "PART_TIME" | "FREELANCE";
  roles: {
    i18n: {
      locale: string;
      messages: {
        title: string;
        description: string;
      };
    }[];
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
  createdAt: Date;
  updatedAt: Date;
};

export const experiences: Experience[] = [
  {
    id: "exp1",
    slug: "tech-corp",
    company: {
      title: "Tech Solutions Corp",
      url: "https://www.google.com",
      image: "https://via.placeholder.com/150",
    },
    category: "FULL_TIME",
    roles: [
      {
        i18n: [
          {
            locale: "pt",
            messages: {
              title: "Engenheiro de Software Senior",
              description:
                "Liderança técnica no desenvolvimento de aplicações web escaláveis utilizando React, Next.js e Node.js. Responsável pela arquitetura de microsserviços e implementação de pipelines CI/CD. Mentoria de desenvolvedores júnior e revisão de código.",
            },
          },
          {
            locale: "en",
            messages: {
              title: "Senior Software Engineer",
              description:
                "Technical leadership in developing scalable web applications using React, Next.js, and Node.js. Responsible for microservices architecture and CI/CD pipeline implementation. Mentoring junior developers and conducting code reviews.",
            },
          },
        ],
        date: {
          from: new Date(2023, 0, 15),
          to: undefined,
        },
        skills: [
          skills[0], // React
          skills[1], // TypeScript
          skills[3], // Next.js
          skills[5], // AWS
        ],
      },
      {
        i18n: [
          {
            locale: "pt",
            messages: {
              title: "Engenheiro de Software Pleno",
              description:
                "Desenvolvimento full-stack de novas features para a plataforma principal. Migração de sistemas legados para arquitetura moderna baseada em nuvem. Otimização de performance de banco de dados e APIs.",
            },
          },
          {
            locale: "en",
            messages: {
              title: "Mid-level Software Engineer",
              description:
                "Full-stack development of new features for the main platform. Migrating legacy systems to modern cloud-based architecture. Optimizing database and API performance.",
            },
          },
        ],
        date: {
          from: new Date(2021, 5, 1),
          to: new Date(2023, 0, 14),
        },
        skills: [
          skills[0], // React
          skills[2], // Node.js
          skills[7], // PostgreSQL
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "exp2",
    slug: "startup-agile",
    company: {
      title: "Agile Startup",
      url: "https://www.google.com",
      image: "https://via.placeholder.com/150",
    },
    category: "FULL_TIME",
    roles: [
      {
        i18n: [
          {
            locale: "pt",
            messages: {
              title: "Desenvolvedor Frontend",
              description:
                "Criação de interfaces de usuário responsivas e interativas. Colaboração próxima com designers e product managers para entregar experiências de usuário excepcionais. Implementação de testes automatizados e integração contínua.",
            },
          },
          {
            locale: "en",
            messages: {
              title: "Frontend Developer",
              description:
                "Creating responsive and interactive user interfaces. Close collaboration with designers and product managers to deliver exceptional user experiences. Implementation of automated tests and continuous integration.",
            },
          },
        ],
        date: {
          from: new Date(2019, 2, 10),
          to: new Date(2021, 4, 30),
        },
        skills: [
          skills[0], // React
          skills[8], // Tailwind
          skills[1], // TypeScript
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "exp3",
    slug: "freelance-projects",
    company: {
      title: "Freelance",
      url: "https://github.com",
      image: "https://via.placeholder.com/150",
    },
    category: "FREELANCE",
    roles: [
      {
        i18n: [
          {
            locale: "pt",
            messages: {
              title: "Consultor de Desenvolvimento Web",
              description:
                "Desenvolvimento de soluções personalizadas para diversos clientes, variando de e-commerce a sistemas de gestão interna. Foco em entrega rápida e qualidade de código.",
            },
          },
          {
            locale: "en",
            messages: {
              title: "Web Development Consultant",
              description:
                "Developing custom solutions for various clients, ranging from e-commerce to internal management systems. Focus on fast delivery and code quality.",
            },
          },
        ],
        date: {
          from: new Date(2018, 0, 1),
          to: new Date(2019, 1, 28),
        },
        skills: [
          skills[2], // Node.js
          skills[6], // MySQL
          skills[4], // Docker
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

type Education = {
  id: string;
  slug: string;
  school: {
    title: string;
    url: string;
    image: string;
  };
  category: "ACADEMIC" | "COURSE";
  status: "COMPLETED" | "IN_PROGRESS" | "PAUSED";
  url?: string;
  hours?: number;
  i18n: {
    locale: string;
    messages: {
      title: string;
      description: string;
    };
  }[];
  skills?: {
    id: string;
    title: string;
    slug: string;
  }[];
  date?: {
    from: Date;
    to?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
};

export const educations: Education[] = [
  {
    id: "edu1",
    slug: "uni-tech",
    school: {
      title: "University of Technology",
      url: "https://www.google.com",
      image: "https://via.placeholder.com/150",
    },
    category: "ACADEMIC",
    status: "COMPLETED",
    url: "https://www.google.com",
    hours: 3600,
    i18n: [
      {
        locale: "pt",
        messages: {
          title: "Bacharelado em Ciência da Computação",
          description:
            "Fundamentos sólidos em algoritmos, estruturas de dados, engenharia de software e sistemas distribuídos. Participação em projetos de pesquisa e desenvolvimento.",
        },
      },
      {
        locale: "en",
        messages: {
          title: "Bachelor of Computer Science",
          description:
            "Solid foundations in algorithms, data structures, software engineering, and distributed systems. Participation in research and development projects.",
        },
      },
    ],
    skills: [skills[0], skills[1], skills[2], skills[6], skills[7]], // React, TypeScript, Node.js, MySQL, PostgreSQL
    date: {
      from: new Date(2016, 2, 1),
      to: new Date(2020, 11, 20),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "edu2",
    slug: "mba-management",
    school: {
      title: "Business School of Innovation",
      url: "https://www.google.com",
      image: "https://via.placeholder.com/150",
    },
    category: "ACADEMIC",
    status: "IN_PROGRESS",
    hours: 450,
    i18n: [
      {
        locale: "pt",
        messages: {
          title: "MBA em Gestão de Projetos de TI",
          description:
            "Foco em metodologias ágeis, liderança de equipes técnicas e estratégia de negócios digitais. Atualmente cursando o último semestre.",
        },
      },
      {
        locale: "en",
        messages: {
          title: "MBA in IT Project Management",
          description:
            "Focus on agile methodologies, technical team leadership, and digital business strategy. Currently attending the last semester.",
        },
      },
    ],
    skills: [skills[0], skills[1], skills[2], skills[3], skills[5]], // React, TypeScript, Node.js, Express, AWS
    date: {
      from: new Date(2023, 1, 15),
      to: new Date(2025, 6, 30),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "edu3",
    slug: "postgrad-cybersecurity",
    school: {
      title: "Tech Security Institute",
      url: "https://www.google.com",
      image: "https://via.placeholder.com/150",
    },
    category: "ACADEMIC",
    status: "PAUSED",
    hours: 360,
    i18n: [
      {
        locale: "pt",
        messages: {
          title: "Pós-graduação em Cibersegurança",
          description:
            "Estudos focados em segurança de redes, criptografia e hacking ético. Curso pausado devido a compromissos profissionais intensos.",
        },
      },
      {
        locale: "en",
        messages: {
          title: "Postgraduate in Cybersecurity",
          description:
            "Studies focused on network security, cryptography, and ethical hacking. Course paused due to intense professional commitments.",
        },
      },
    ],
    skills: [skills[4], skills[5]],
    date: {
      from: new Date(2022, 5, 1),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "edu4",
    slug: "adv-react",
    school: {
      title: "Online Coding Academy",
      url: "https://www.google.com",
      image: "https://via.placeholder.com/150",
    },
    category: "COURSE",
    status: "COMPLETED",
    url: "https://www.google.com",
    hours: 40,
    i18n: [
      {
        locale: "pt",
        messages: {
          title: "React Avançado e Padrões de Design",
          description:
            "Deep dive em hooks, context API, otimização de performance e gerenciamento de estado complexo.",
        },
      },
      {
        locale: "en",
        messages: {
          title: "Advanced React and Design Patterns",
          description:
            "Deep dive into hooks, context API, performance optimization, and complex state management.",
        },
      },
    ],
    skills: [skills[0], skills[3]],
    date: {
      from: new Date(2021, 3, 10),
      to: new Date(2021, 5, 20),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "edu5",
    slug: "aws-cert",
    school: {
      title: "Cloud Masters",
      url: "https://www.google.com",
      image: "https://via.placeholder.com/150",
    },
    category: "COURSE",
    status: "IN_PROGRESS",
    hours: 60,
    i18n: [
      {
        locale: "pt",
        messages: {
          title: "Arquiteto de Soluções AWS - Associate",
          description:
            "Preparação para certificação cobrindo serviços principais da AWS como EC2, S3, RDS e VPC. Aprendendo a desenhar sistemas resilientes na nuvem.",
        },
      },
      {
        locale: "en",
        messages: {
          title: "AWS Certified Solutions Architect - Associate",
          description:
            "Certification preparation covering core AWS services like EC2, S3, RDS, and VPC. Learning to design resilient cloud systems.",
        },
      },
    ],
    skills: [skills[5]], // AWS
    date: {
      from: new Date(2024, 0, 10),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "edu6",
    slug: "docker-mastery",
    school: {
      title: "DevOps University",
      url: "https://www.google.com",
      image: "https://via.placeholder.com/150",
    },
    category: "COURSE",
    status: "COMPLETED",
    url: "https://www.google.com",
    hours: 20,
    i18n: [
      {
        locale: "pt",
        messages: {
          title: "Docker e Kubernetes: O guia completo",
          description:
            "Curso prático sobre containerização de aplicações, orquestração com Kubernetes e deployment automatizado.",
        },
      },
      {
        locale: "en",
        messages: {
          title: "Docker and Kubernetes: The Complete Guide",
          description:
            "Hands-on course on application containerization, orchestration with Kubernetes, and automated deployment.",
        },
      },
    ],
    skills: [skills[4]], // Docker
    date: {
      from: new Date(2020, 8, 1),
      to: new Date(2020, 9, 15),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
