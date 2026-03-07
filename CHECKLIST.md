# Tutorial Completo: Better Auth + Next.js (Passo a Passo)

Projeto: Next.js + Prisma + Postgres (Neon) + Better Auth + shadcn/ui\
Objetivo: criar um sistema de autenticação profissional do zero ao
avançado.

---

## 🧱 Preparação do Projeto

### Configuração inicial

- [ ] remover arquivos de `public/*`
- [ ] limpar `globals.css`
- [ ] adiconar color theme `https://tweakcn.com/` (Amber Minimal)
- [ ] ajustar `layout.tsx`
  - [ ] fonte inter
  - [ ] metadata [`title`, `description`]
  - [ ] lang="pt-BR"
  - [ ] `html suppressHydrationWarning`
  - [ ] opcional `<body cz-shortcut-listen="true">`
  - [ ] `<Toaster />`
- [ ] limpar `page.tsx`
- [ ] instalar shadcn `npx shadcn@latest init`
- [ ] instalar componentes `npx shadcn@latest add button label input sonner card field`
- [ ] mostrar botão e testar servidor `npm run dev`
- [ ] instalar prettier para tailwind css (ajuste de classes automáticas)
  - [ ] `https://tailwindcss.com/blog/automatic-class-sorting-with-prettier`
  - [ ] `npm install -D prettier prettier-plugin-tailwindcss`
  - [ ] criar na raiz do projeto `.prettierrc.json ou .prettierrc`
  - [ ] `{ "plugins": ["prettier-plugin-tailwindcss"] }`

---

## 🧩 PARTE 1 --- Setup Prisma

- [ ] instalar prisma `pnpm add prisma tsx @types/pg --save-dev`
- [ ] instalar pacotes `pnpm add @prisma/client @prisma/adapter-pg pg dotenv`
- [ ] inicializar o prisma `pnpm dlx prisma init`
- [ ] mudar o output do schema.prisma `prisma/schema.prisma`
  - [ ] `output   = "../src/lib/generated/prisma"`
- [ ] o arquivo `.env` na raiz do projeto vai mostrar o `DATABASE_URL`
- [ ] acessar `https://neon.com/`
  - [ ] logar com a conta
  - [ ] new project
  - [ ] project name
  - [ ] escolher região (opcional)
  - [ ] create
  - [ ] dentro do projeto entrar em `Connect`
  - [ ] desmarcar `Connection pooling`
  - [ ] copiar a `Connetion string` para o arquivo `.env` e colar em `DATABASE_URL`
- [ ] gerar o Prisma Client `pnpm dlx prisma generate`
- [ ] criar arquivo `prisma.ts` dentro da pasta `lib`

  ```
  import { PrismaClient } from "@/lib/generated/prisma/client"
  import { PrismaPg } from "@prisma/adapter-pg";

  const globalForPrisma = global as unknown as { prisma: PrismaClient };

  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
  ```

- [ ] adicionar `/src/lib/generated/prisma` no arquivo `.gitignore`
- [ ] ajustar **scripts build** no `package.json` para vercel `"build": "prisma generate && next build",`

---

## 🧩 PARTE 2 --- Setup da Autenticação

- [ ] instalar Better Auth `npm install better-auth`
- [ ] editar o arquivo `.env` e configurar variáveis de ambiente
  - [ ] (`BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_URL`)
  - [ ] gerar a secret `pnpm dlx @better-auth/cli@latest secret`
  - [ ] ou copiar da doc do Better Auth `https://better-auth.com/docs/installation` passo 2
- [ ] criar `auth.ts` dentro da pasta `lib`

```
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
});
```

- [ ] gerar os models do better auth no prisma `pnpm dlx @better-auth/cli generate`
- [ ] vai criar os models no `schema.prisma`:
  - `User` renomear o @@map para users
  - `Session` renomear o @@map para sessions
  - `Account` renomear o @@map para accounts
  - `Verification` renomear o @@map para verifications
- [ ] criar migration `pnpm dlx prisma migrate dev --name add-auth-models`
- [ ] gerar o Prisma Client `pnpm dlx prisma generate`
- [ ] criar Mount Handler em `app/api/auth/[...all]/route.ts`

```
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

- [ ]ajustar `eslint.config.mjs` para ignorar `/src/generated/**/*`
- create Client instance in `lib/auth-client.ts`

- Enable Email & Password Authentication
- Create Sign Up Page PT1
  - Create Form `components/register-form.tsx`
  - Log Form Values
- Setup Sonner
- Create Sign Up Page PT2
  - Add Form Validation
  - Destructure SignUp Function
  - Showcase `onError`
- OPTIONS - **minPasswordLength**
- Create Sign Up Page PT3
  - Sign Up _default automatically signs in the user_
- Show Session on Profile Page
- Show Data in Neon Dashboard
- Sign Out User
  - Destructure SignOut Function
  - Show Removed Cookies
- Create Sign In Page PT1
  - Create Form `components/login-form.tsx`
  - Log Form Values
  - Destructure SignIn Function
- Show Unauthorized on Profile Page
- Create Sign In Page PT2
  - Showcase `onError`
  - Sign In User
- FINISH PART 1

== PART 2 ==

- Showcase `onRequest` and `onResponse`
- Showcase Full Cycle Again
- Add Convenience Links for Auth Pages
- OPTIONS - **autoSignIn**
  - Showcase
- OPTIONS - **advanced.database.generateId**
  - Table IDs (change `schema.prisma` and push)
  - Showcase
  - Truncate Tables
- OPTIONS - **emailAndPassword.password**
  - Create User
  - Argon2 `npm install @node-rs/argon2`
  - Add to `next.config.ts`
  - Create Utilities `lib/argon2.ts`
  - Add to `lib/auth.ts`
  - Showcase
  - Truncate Tables
- Create User
- Sign Up User via SERVER ACTIONS
  - Create Action
  - Log Form Values
  - Sign Up User on Server
- Sign In User via SERVER ACTIONS
  - Create Action
  - Log Form Values
  - Sign In User on Server
  - Showcase - No Cookies
  - Manually Set Cookies
  - Showcase - Cookies
  - Passing Headers to Sign In
- PLUGINS - **nextCookies()**
- FINISH PART 2

== PART 3 ==

- Get Session on Client
  - Create Get Started Button
  - Destructure useSession
  - Showcase
- OPTIONS - **session.expiresIn**
  - Change to 15 seconds
  - Showcase
  - Change to 30 days
- Middleware
  - check for existence of a session cookie
  - showcase on auth routes
- Error Handling
- Hooks
  - Validate Email
  - Transform Name

== PART 4 ==

- Roles (Custom Method)
- Prisma
  - Add UserRole Enum
  - Push changes `npx prisma db push`
- User
  - Show field is added beacuse of `@default`
  - Truncate Tables
  - Create new User
- Profile PT1
  - Show role is not typed in `session.user`
- OPTIONS - **user.additionalFields**
  - Showcase `input` option
- Profile PT2
  - Show role is now typed and added to `session.user`
- ISSUE: Client Session has no Context of the Role
  - Cute circle on `get-started-button.tsx`
  - InferAdditionalFields plugin on Client
- Admin Panel
  - Create Page / Link
  - Manually Change Role
  - Update Middleware
  - Guard `/admin/dashboard`
  - List Users With Prisma Query
  - Delete User With Prisma Query
- Database Hooks
- Roles (Admin Plugin)
  - generate auth tables `npx @better-auth/cli generate --output=roles.schema.prisma`
  - compare and contrast (look at Schema section)
  - Push changes `npx prisma db push`
  - Create Permissions (No Posts)
  - Add to `lib/auth.ts` and `lib/auth-client.ts`
  - List Users With Admin Plugin
  - EXERCISE: Delete User With Admin Plugin
  - Change Permissions (With Posts)
- Create Dropdown to Change Role for Admins
- FINISH PART 4

== PART 5 ==

- Google OAuth
  - Create Buttons
- GitHub OAuth
- Account Linking
- Error Handling
  - `/auth/login/error`
- FINISH PART 5

== PART 6 ==

- Nodemailer
  - Create Template
- Verify Email
  - `emailAndPassword.requireEmailVerification`
  - `emailVerification`
  - Handle Error / Expired `/auth/verify`
  - Destructure sendVerificationEmail
  - Handle Login Page Not Verified
- Create Post Sign Up Page
  - Showcase
- Forgot Password
  - Page / Form / Success
- Reset Password
  - Page / Form / Success
  - Showcase
- FINISH PART 6

== PART 7 ==

- Show the image
- Updating User
  - change name / image
  - update hook
  - updating password
- Custom Sessions
  - type inference for plugins workaround
- PLUGINS - **Magic Link**
  - add to client instance
  - Create UI
  - adjust hooks
- Cookie Cache
- FINISH PART 7

THANK YOU FOR WATCHING

```

```
