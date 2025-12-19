# Next.js Lab 6 - Student Exercises

Comprehensive exercises for Next.js Advanced Framework Architecture and Application.

## Overview

This project contains 4 complete exercises demonstrating key Next.js concepts:

1. **Exercise 1: Dynamic Blog System** - Pages Router with SSG
2. **Exercise 2: Hybrid Rendering Dashboard** - App Router with Server/Client Components
3. **Exercise 3: API Route & Middleware** - Secure API endpoints
4. **Exercise 4: Image & Font Optimization** - Performance optimization

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the exercises.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                      # App Router (Next.js 13+)
│   ├── dashboard/           # Exercise 2 - Server & Client Components
│   ├── api/secret/          # Exercise 3 - API Route
│   ├── api-test/            # Exercise 3 - Demo page
│   ├── optimization/        # Exercise 4 - Image & Font demo
│   ├── layout.tsx           # Root layout with font optimization
│   └── page.tsx             # Homepage with tabs navigation
├── pages/                   # Pages Router (Legacy)
│   ├── blog/                # Exercise 1 - Dynamic blog
│   │   ├── index.js         # Blog listing page
│   │   └── [id].js          # Dynamic blog post page
│   └── _app.js              # Custom App component
├── data/
│   └── blog-data.json       # Blog posts data for Exercise 1
├── middleware.ts            # Exercise 3 - Authentication middleware
└── next.config.js           # Next.js configuration

```

## Exercise Details

### Exercise 1: Dynamic Blog System

**Location:** `/blog`

**Key Concepts:**
- Static Site Generation (SSG) with `getStaticProps`
- Dynamic routes with `getStaticPaths`
- Incremental Static Regeneration (ISR) with `revalidate`
- Fallback behavior for on-demand generation

**Files:**
- `pages/blog/index.js` - Blog listing page
- `pages/blog/[id].js` - Dynamic blog post page
- `data/blog-data.json` - Blog data source

**Try it:**
1. Visit `/blog` to see all posts
2. Click any post to see dynamic routing
3. Add a new post to `blog-data.json` with id "6"
4. Navigate to `/blog/6` to see fallback behavior

### Exercise 2: Dashboard with Hybrid Rendering

**Location:** `/dashboard`

**Key Concepts:**
- React Server Components (default in App Router)
- Client Components with `'use client'` directive
- Server-side data fetching with async/await
- Component composition patterns
- Interactive UI with React hooks

**Files:**
- `app/dashboard/layout.tsx` - Dashboard layout (Server Component)
- `app/dashboard/page.tsx` - Profile page (Server Component)
- `app/dashboard/SettingsToggle.tsx` - Settings panel (Client Component)

**Features:**
- Static sidebar navigation
- Server-fetched user profile data
- Interactive dark/light mode toggle
- Real-time settings updates

### Exercise 3: API Route & Middleware

**Location:** `/api-test`

**Key Concepts:**
- API Routes in App Router
- Middleware for authentication
- Request/Response handling
- HTTP methods (GET, POST)
- Security headers validation

**Files:**
- `app/api/secret/route.ts` - Protected API endpoint
- `middleware.ts` - Authentication middleware
- `app/api-test/page.tsx` - Interactive testing interface
- `.env.local` - API secret key configuration

**How it works:**
1. Middleware intercepts requests to `/api/secret`
2. Checks for valid `x-api-key` header
3. Returns 401 if invalid, allows request if valid
4. API route returns secret data on successful authentication

**Test with cURL:**
```bash
# Valid request
curl -H "x-api-key: my-super-secret-key-12345" http://localhost:3000/api/secret

# Invalid request
curl -H "x-api-key: wrong-key" http://localhost:3000/api/secret
```

### Exercise 4: Image & Font Optimization

**Location:** `/optimization`

**Key Concepts:**
- `next/image` component for automatic image optimization
- Automatic WebP/AVIF conversion
- Lazy loading and responsive images
- `next/font` for self-hosted fonts
- Core Web Vitals improvements (LCP, CLS)

**Files:**
- `app/optimization/page.tsx` - Image optimization demo
- `app/layout.tsx` - Font optimization with Inter font
- `next.config.js` - Image domain configuration

**Features:**
- Side-by-side comparison of standard vs optimized images
- Image gallery with lazy loading
- Font optimization demonstration
- Performance testing guide

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **next/image** - Image optimization
- **next/font** - Font optimization

## Environment Variables

Create a `.env.local` file:

```env
API_SECRET_KEY=my-super-secret-key-12345
```

## Learning Outcomes

After completing these exercises, you will understand:

1. **Rendering Strategies:**
   - Static Site Generation (SSG)
   - Server-Side Rendering (SSR)
   - Incremental Static Regeneration (ISR)
   - Client-Side Rendering (CSR)

2. **Architecture Patterns:**
   - Pages Router vs App Router
   - Server Components vs Client Components
   - File-based routing
   - API route handling

3. **Performance Optimization:**
   - Image optimization techniques
   - Font optimization and self-hosting
   - Code splitting and lazy loading
   - Core Web Vitals improvements

4. **Security:**
   - Middleware implementation
   - API authentication
   - Environment variables
   - Request validation

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## Author

**MSc. Tran Vinh Khiem**  
Module 6: Advanced Next.js Framework Architecture and Application  
Lab 6: Next.js

---

Made with ❤️ for students learning Next.js
