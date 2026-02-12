export const skills = [
  {
    category: "DEV",
    color: "#663399",
    createdAt: new Date(),
    id: "123",
    title: "CSS",
    slug: "css",
    updatedAt: new Date(),
  },
  {
    category: "DEV",
    color: "#F7DF1E",
    createdAt: new Date(),
    id: "456",
    title: "JavaScript",
    slug: "javascript",
    updatedAt: new Date(),
  },
  {
    category: "DEV",
    color: "#E34F26",
    createdAt: new Date(),
    id: "789",
    title: "HTML",
    slug: "html5",
    updatedAt: new Date(),
  },
];

export const experiences = [
  {
    id: "123",
    slug: "company-abc",
    company: "Company ABC",
    type: "FULL_TIME",
    roles: [
      {
        i18n: [
          {
            locale: "pt",
            messages: {
              title: "Engenheiro de Software",
              description:
                "Desenvolvimento de aplicações web utilizando React, Node.js e AWS.",
            },
          },
          {
            locale: "en",
            messages: {
              title: "Software Engineer",
              description:
                "Development of web applications using React, Node.js and AWS.",
            },
          },
        ],
        date: {
          from: new Date(2020, 10, 15),
          to: new Date(2023, 10, 15),
        },
        skills,
      },
      {
        i18n: [
          {
            locale: "pt",
            messages: {
              title: "Engenheiro de Software Jr",
              description:
                "Desenvolvimento de aplicações web utilizando HTML, CSS e JavaScript.",
            },
          },
          {
            locale: "en",
            messages: {
              title: "Software Engineer Jr",
              description:
                "Development of web applications using HTML, CSS and JavaScript.",
            },
          },
        ],
        date: {
          from: new Date(2023, 10, 15),
        },
        skills,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "456",
    slug: "yago-russo",
    company: "Yago Russo",
    type: "PART_TIME",
    roles: [
      {
        i18n: [
          {
            locale: "pt",
            messages: {
              title: "Freelancer",
              description: "Desenvolvimento de tudo.",
            },
          },
          {
            locale: "en",
            messages: {
              title: "Freelancer",
              description: "Development of everything.",
            },
          },
        ],
        date: {
          from: new Date(2020, 10, 15),
        },
        skills,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const educations = [
  {
    id: "123",
    slug: "example",
    school: "Example",
    type: "ACADEMIC",
    status: "COMPLETED",
    url: "https://www.example.com",
    hours: 120,
    i18n: [
      {
        locale: "pt",
        messages: {
          title: "Curso de Exemplo",
          description: "Descrição do curso de exemplo.",
        },
      },
      {
        locale: "en",
        messages: {
          title: "Example Course",
          description: "Description of the example course.",
        },
      },
    ],
    skills,
    date: {
      from: new Date(2020, 10, 15),
      to: new Date(2023, 10, 15),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "14563",
    slug: "sample",
    school: "Sample",
    type: "COURSE",
    url: "https://www.example.com",
    status: "IN_PROGRESS",
    hours: 24,
    i18n: [
      {
        locale: "pt",
        messages: {
          title: "Curso de Exemplo",
          description: "Descrição do curso de exemplo.",
        },
      },
      {
        locale: "en",
        messages: {
          title: "Example Course",
          description: "Description of the example course.",
        },
      },
    ],
    skills,
    date: {
      from: new Date(2020, 10, 15),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
