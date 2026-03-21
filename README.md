# Rigify

Rigify is an AI-powered PC build intelligence app that helps users evaluate a planned gaming setup using their CPU, GPU, RAM, display target, and favorite games.

It analyzes submitted builds with Gemini, stores results in Supabase, and lets authenticated users revisit or refine previous build analyses from their dashboard.

Live App: [rigify.vercel.app](https://rigify.vercel.app)

## Features

- Email/password authentication with Supabase
- Protected dashboard for authenticated users
- New build submission flow
- AI-powered build analysis with Gemini
- Bottleneck and compatibility scoring
- FPS estimate breakdowns across multiple games
- PSU recommendations
- Upgrade suggestions
- Recent builds history
- Refine-build workflow for updating an existing build
- Responsive UI with animated transitions

## Tech Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase Auth + Postgres
- Google Gemini API via `@google/genai` 
- Model: `gemini-2.5-flash-lite`
- Sonner for toast notifications
- Playwright for E2E testing

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables
Create `.env.local`:
```js
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
GEMINI_API_KEY=your_gemini_api_key
```

## Database Setup

Run this SQL in your Supabase SQL editor to create the `builds` table and enable row-level security:

```sql
create table builds (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  build_name text not null,
  overall_review text not null,
  bottleneck_percentage numeric not null,
  build_inputs jsonb not null,
  gemini_response jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table builds enable row level security;

create policy "Users can view their own builds"
  on builds for select
  using (auth.email() = user_email);

create policy "Users can insert their own builds"
  on builds for insert
  with check (auth.email() = user_email);

create policy "Users can update their own builds"
  on builds for update
  using (auth.email() = user_email);
```

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test:e2e
```

## Build Analysis Flow
User signs in and opens the dashboard
User submits build inputs
The server validates input and applies rate limiting
Gemini generates a structured JSON analysis
The result is saved to Supabase
The user is redirected to a build results page
Past builds can be reopened or refined later
Project Status
Rigify currently supports authenticated build analysis, saved build history, and animated results pages. Additional improvements to AI prompting, persistence, and test coverage are ongoing.

## Deployment
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

Rigify is deployed on Vercel.

## License

This project is licensed under the MIT License.