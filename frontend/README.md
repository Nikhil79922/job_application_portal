This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Dir structure to follow 
frontend
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src
│   │
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components
│   │   │
│   │   ├── ui
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── dialog.tsx
│   │   │
│   │   ├── layout
│   │   │   └── navbar.tsx
│   │   │
│   │   ├── shared
│   │   │   ├── theme-toggle.tsx
│   │   │   └── button-loader.tsx
│   │   │
│   │   ├── modals
│   │   │   ├── custom-modal.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── sheet.tsx
│   │   │
│   │   └── providers
│   │       └── theme-provider.tsx
│   │
│   ├── features
│   │   │
│   │   ├── home
│   │   │   ├── components
│   │   │   │   ├── hero.tsx
│   │   │   │   └── career-guide.tsx
│   │   │
│   │   ├── ai-career
│   │   │   ├── components
│   │   │   │   └── career-roadmap-modal.tsx
│   │   │   │
│   │   │   ├── services
│   │   │   │   └── ai-career.service.ts
│   │   │   │
│   │   │   ├── types
│   │   │   │   └── ai-career.types.ts
│   │   │   │
│   │   │   └── utils
│   │   │       └── download-career-guide.ts
│   │   │
│   │   └── resume-analysis
│   │       ├── components
│   │       │   └── resume-analysis-modal.tsx
│   │       │
│   │       ├── services
│   │       │   └── resume-analysis.service.ts
│   │       │
│   │       ├── types
│   │       │   └── resume-analysis.types.ts
│   │       │
│   │       └── utils
│   │           └── download-resume-analysis.ts
│   │
│   ├── services
│   │   └── axios.ts
│   │
│   ├── config
│   │   └── env.ts
│   │
│   ├── lib
│   │   └── utils.ts
│   │
│   ├── hooks
│   │
│   ├── constants
│   │
│   ├── stores
│   │
│   ├── schemas
│   │
│   └── types
│       ├── api
│       │   └── response.types.ts
│       │
│       └── global
│           └── window.d.ts
│
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json





profile
├── components
│   ├── modals
│   │   ├── update-profile-modal.tsx
│   │   ├── upload-avatar-modal.tsx
│   │   └── upload-resume-modal.tsx
│   │
│   ├── profile-page.tsx
│   ├── profile-hero.tsx
│   ├── profile-actions.tsx
│   ├── profile-status.tsx
│   ├── profile-about.tsx
│   ├── profile-skills.tsx
│   └── profile-resume.tsx
│
├── hooks
│   ├── use-profile.ts
│   ├── use-update-profile.ts
│   ├── use-upload-avatar.ts
│   └── use-upload-resume.ts
│
├── services
│   ├── profile.service.ts
│   ├── update-profile.service.ts
│   ├── upload-avatar.service.ts
│   └── upload-resume.service.ts
│
├── schemas
│   ├── update-profile.schema.ts
│   ├── upload-avatar.schema.ts
│   └── upload-resume.schema.ts
│
└── types