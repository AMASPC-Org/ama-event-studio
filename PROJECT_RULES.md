# AMA Event Studio - Project Rules

## 1. Core Philosophy
> "There should only be one rule: Follow the best practices."

This file consolidates the rules for the **AMA Event Studio** (Frontend-only Next.js application).

## 2. Infrastructure & Region Policy
- **Hosting/Deployment**: `us-west1` (Oregon).
- **Environment Variables**:
  - `NEXT_PUBLIC_FIREBASE_REGION=us-west1`
  - `NEXT_PUBLIC_GCP_REGION=us-west1`

## 3. Technology Stack & Constraints
- **Framework**: **Next.js 14+ (App Router)**.
- **Language**: TypeScript 5.x (Strict Mode).
- **Styling**: **Tailwind CSS**.
- **Backend**: None (Pure Frontend). Connects to `AMAEventScraper` via Firebase SDK.

## 4. Coding Standards
- **Next.js / React**:
  - Use **Server Components** by default. Use `"use client"` only for interactive leaves.
  - **NO `pages/` directory**: Strictly use `app/` router.
- **Type Safety**:
  - **NO `any`**: Explicit types required.
  - **Zod**: Use for all form validation and API response parsing.
- **Styling**:
  - Use Tailwind utility classes.
  - Avoid custom CSS files unless absolutely necessary for complex animations.

## 5. Workflows
- **Verification**: Run `npm run verify` (Build + Lint).
- **Handoff**: Run `/handoff`.
- **Landing**: Run `/landing`.

## 6. File-Specific Rules
- `app/**/*.tsx`:
  - Must be responsive (mobile-first Tailwind).
  - Must implement proper loading/error states (`loading.tsx`, `error.tsx`).
