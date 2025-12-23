/**
 * Database Seeding Script
 * 
 * This script adds sample documentation to the database.
 * Run with: npx tsx scripts/seed-docs.ts
 */

import { Pool } from 'pg'
import 'dotenv/config'

const sampleDocuments = [
  {
    title: 'HTML cơ bản - Nền tảng của Web Development',
    slug: 'html-co-ban',
    content: `HTML (HyperText Markup Language) là ngôn ngữ đánh dấu chuẩn để tạo các trang web. HTML cung cấp cấu trúc cho nội dung web, định nghĩa các phần tử như headings, paragraphs, links, images và nhiều hơn nữa.

Cấu trúc cơ bản của một trang HTML:
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tiêu đề trang</title>
</head>
<body>
  <h1>Đây là heading</h1>
  <p>Đây là đoạn văn bản.</p>
</body>
</html>

Các thẻ HTML quan trọng:
- Heading tags: <h1> đến <h6> - Tạo tiêu đề từ lớn nhất đến nhỏ nhất
- Paragraph: <p> - Định nghĩa đoạn văn
- Link: <a href="url">Text</a> - Tạo liên kết
- Image: <img src="path" alt="description"> - Chèn hình ảnh
- Division: <div> - Container chung để nhóm các phần tử
- Span: <span> - Container inline cho text
- Lists: <ul>, <ol>, <li> - Danh sách có thứ tự và không thứ tự

Semantic HTML:
Sử dụng các thẻ semantic giúp cải thiện SEO và accessibility:
- <header> - Phần đầu trang hoặc section
- <nav> - Menu điều hướng
- <main> - Nội dung chính
- <article> - Nội dung độc lập
- <section> - Phần của trang
- <aside> - Nội dung phụ
- <footer> - Phần cuối trang

Forms và Input:
<form action="/submit" method="POST">
  <label for="name">Tên:</label>
  <input type="text" id="name" name="name" required>
  <button type="submit">Gửi</button>
</form>

Best Practices cho SEO:
- Sử dụng đúng thẻ heading hierarchy (h1, h2, h3...)
- Thêm alt text cho images
- Sử dụng semantic HTML
- Meta tags quan trọng: description, keywords, viewport`,
  },
  {
    title: 'CSS cơ bản - Styling cho Web',
    slug: 'css-co-ban',
    content: `CSS (Cascading Style Sheets) được sử dụng để điều khiển cách hiển thị của các phần tử HTML. CSS cho phép bạn thay đổi màu sắc, fonts, spacing, layout và nhiều thuộc tính visual khác.

Cách thêm CSS vào HTML:
1. Inline CSS: <p style="color: red;">Text</p>
2. Internal CSS: <style> trong <head>
3. External CSS: <link rel="stylesheet" href="styles.css">

CSS Selectors:
- Element selector: p { color: blue; }
- Class selector: .classname { font-size: 16px; }
- ID selector: #idname { margin: 10px; }
- Descendant selector: div p { ... }
- Pseudo-classes: a:hover { ... }

Box Model:
Mọi phần tử HTML được coi như một box với:
- Content: Nội dung thực tế
- Padding: Khoảng trống bên trong border
- Border: Đường viền quanh padding
- Margin: Khoảng trống bên ngoài border

.box {
  width: 300px;
  padding: 20px;
  border: 1px solid black;
  margin: 10px;
}

Display Properties:
- display: block - Chiếm toàn bộ width, xuống dòng
- display: inline - Nằm cùng dòng, không set width/height
- display: inline-block - Kết hợp cả hai
- display: none - Ẩn element

Positioning:
- static: Mặc định, theo document flow
- relative: Tương đối so với vị trí ban đầu
- absolute: Tương đối so với parent positioned gần nhất
- fixed: Cố định so với viewport
- sticky: Kết hợp relative và fixed

Flexbox Layout:
.container {
  display: flex;
  justify-content: center; /* horizontal alignment */
  align-items: center; /* vertical alignment */
  gap: 10px;
}

Grid Layout:
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

Responsive Design với Media Queries:
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

CSS Variables:
:root {
  --primary-color: #3490dc;
  --spacing: 16px;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing);
}`,
  },
  {
    title: 'JavaScript cơ bản - Ngôn ngữ lập trình Web',
    slug: 'javascript-co-ban',
    content: `JavaScript là ngôn ngữ lập trình được sử dụng để tạo tính tương tác cho web. Nó chạy trên browser (client-side) và cả server (Node.js).

Biến và Kiểu dữ liệu:
// Khai báo biến
let name = "John";        // có thể thay đổi
const age = 25;           // không thể thay đổi
var oldWay = "legacy";    // cách cũ, tránh dùng

// Kiểu dữ liệu
let string = "text";
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = { key: "value" };
let nullValue = null;
let undefinedValue = undefined;

Functions:
// Function declaration
function greet(name) {
  return "Hello " + name;
}

// Arrow function (ES6+)
const greet = (name) => {
  return \`Hello \${name}\`;
};

// Short arrow function
const add = (a, b) => a + b;

Điều kiện và Vòng lặp:
// If-else
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

// Switch
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  default:
    console.log("Other day");
}

// For loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Array methods
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num));
const doubled = numbers.map(num => num * 2);
const filtered = numbers.filter(num => num > 2);

DOM Manipulation:
// Selecting elements
const element = document.getElementById("myId");
const elements = document.querySelectorAll(".myClass");

// Modifying content
element.textContent = "New text";
element.innerHTML = "<strong>Bold text</strong>";

// Changing styles
element.style.color = "red";
element.classList.add("active");

// Event listeners
element.addEventListener("click", () => {
  console.log("Clicked!");
});

Async JavaScript:
// Promises
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/Await
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

ES6+ Features:
// Destructuring
const { name, age } = person;
const [first, second] = array;

// Spread operator
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newKey: "value" };

// Template literals
const message = \`Hello \${name}, you are \${age} years old\`;`,
  },
  {
    title: 'React cơ bản - UI Library hiện đại',
    slug: 'react-co-ban',
    content: `React là một thư viện JavaScript để xây dựng user interfaces. React sử dụng component-based architecture, cho phép tái sử dụng code và quản lý state hiệu quả.

Components:
React components là các building blocks của ứng dụng. Có hai loại:

// Function Component (Modern approach)
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Arrow function component
const Welcome = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};

JSX - JavaScript XML:
JSX cho phép viết HTML-like syntax trong JavaScript:

const element = (
  <div className="container">
    <h1>Hello World</h1>
    <p>This is JSX</p>
  </div>
);

Lưu ý: Sử dụng className thay vì class, htmlFor thay vì for

Props - Truyền dữ liệu giữa components:
function Card({ title, content }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

// Sử dụng
<Card title="My Card" content="Some content" />

State - Quản lý dữ liệu động:
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

useEffect Hook - Side effects:
import { useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array = run once on mount
  
  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}

Lists và Keys:
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

Conditional Rendering:
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  );
}

Event Handling:
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

Component Lifecycle với useEffect:
useEffect(() => {
  // ComponentDidMount
  console.log('Component mounted');
  
  return () => {
    // ComponentWillUnmount
    console.log('Component will unmount');
  };
}, []);

useEffect(() => {
  // ComponentDidUpdate (when dependency changes)
  console.log('Count changed:', count);
}, [count]);`,
  },
  {
    title: 'Next.js - React Framework for Production',
    slug: 'nextjs-framework',
    content: `Next.js là một React framework cung cấp các tính năng production-ready như server-side rendering, static site generation, routing, và API routes.

Tại sao dùng Next.js:
- SEO tốt hơn với SSR/SSG
- Performance optimization tự động
- File-based routing
- API routes không cần server riêng
- Image optimization
- Built-in CSS và Sass support

App Router (Next.js 13+):
Next.js 13+ sử dụng app directory với React Server Components:

// app/page.tsx - Homepage
export default function Home() {
  return <h1>Welcome to Next.js</h1>;
}

// app/about/page.tsx - About page
export default function About() {
  return <h1>About Us</h1>;
}

Server Components vs Client Components:
// Server Component (mặc định)
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}

// Client Component
'use client'
import { useState } from 'react';

function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

Routing:
Folder structure tự động tạo routes:
- app/page.tsx → /
- app/about/page.tsx → /about
- app/blog/[slug]/page.tsx → /blog/:slug (dynamic route)

Dynamic Routes:
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}

Data Fetching:
// Server Component - fetch tại server
async function Posts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store' // SSR
    // hoặc next: { revalidate: 60 } // ISR
  });
  const posts = await res.json();
  
  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}

Metadata cho SEO:
// Static metadata
export const metadata = {
  title: 'My Page',
  description: 'This is my page description',
  openGraph: {
    title: 'My Page',
    description: 'This is my page description',
    images: ['/og-image.jpg'],
  },
};

// Dynamic metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.id);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

API Routes:
// app/api/hello/route.ts
export async function GET(request: Request) {
  return Response.json({ message: 'Hello' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ received: body });
}

Loading và Error States:
// app/loading.tsx - Hiển thị khi loading
export default function Loading() {
  return <div>Loading...</div>;
}

// app/error.tsx - Hiển thị khi có lỗi
'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`,
  },
  {
    title: 'TypeScript cho Web Development',
    slug: 'typescript-web-development',
    content: `TypeScript là một superset của JavaScript thêm static typing. TypeScript giúp phát hiện lỗi sớm, cải thiện developer experience với autocomplete và refactoring tools tốt hơn.

Cài đặt TypeScript:
npm install -g typescript
tsc --init  // Tạo tsconfig.json

Basic Types:
// Primitive types
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Tuple
let tuple: [string, number] = ["John", 25];

// Any (tránh dùng nếu có thể)
let anything: any = "can be anything";

Interfaces:
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional property
  readonly createdAt: Date;  // Read-only
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  createdAt: new Date(),
};

Type Aliases:
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

interface Post {
  id: ID;
  title: string;
  status: Status;
}

Functions:
// Function with types
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional parameters
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "Hello"} \${name}\`;
}

// Default parameters
function createUser(name: string, role: string = "user") {
  return { name, role };
}

Generics:
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("hello");

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const response: ApiResponse<User> = {
  data: user,
  status: 200,
  message: "Success",
};

Union và Intersection Types:
// Union - có thể là một trong các types
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log(id);
}

// Intersection - kết hợp nhiều types
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type Staff = Person & Employee;

const staff: Staff = {
  name: "John",
  employeeId: 123,
};

Type Guards:
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

TypeScript với React:
import { FC, useState, useEffect } from 'react';

interface Props {
  title: string;
  count?: number;
}

const Component: FC<Props> = ({ title, count = 0 }) => {
  const [value, setValue] = useState<number>(count);
  
  useEffect(() => {
    console.log(value);
  }, [value]);
  
  return <div>{title}: {value}</div>;
};

Utility Types:
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial - tất cả properties optional
type PartialUser = Partial<User>;

// Required - tất cả properties required
type RequiredUser = Required<User>;

// Pick - chọn một số properties
type UserNameEmail = Pick<User, 'name' | 'email'>;

// Omit - loại bỏ một số properties
type UserWithoutId = Omit<User, 'id'>;`,
  },
  {
    title: 'Responsive Web Design',
    slug: 'responsive-web-design',
    content: `Responsive Web Design đảm bảo website hiển thị tốt trên mọi thiết bị, từ desktop đến mobile. Đây là yêu cầu thiết yếu cho mọi website hiện đại.

Mobile-First Approach:
Thiết kế từ màn hình nhỏ trước, sau đó mở rộng cho màn hình lớn:

/* Mobile styles (default) */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 15px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 960px;
    padding: 20px;
  }
}

Viewport Meta Tag:
<meta name="viewport" content="width=device-width, initial-scale=1.0">

Fluid Grids:
Sử dụng percentages thay vì fixed pixels:

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.column {
  width: 48%;
  float: left;
  margin: 1%;
}

Flexible Images:
img {
  max-width: 100%;
  height: auto;
}

CSS Grid cho Responsive:
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

Flexbox cho Responsive:
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.flex-item {
  flex: 1 1 300px; /* grow shrink basis */
}

Common Breakpoints:
/* Mobile: 0-767px */
/* Tablet: 768px-1023px */
/* Desktop: 1024px+ */

@media (max-width: 767px) {
  /* Mobile styles */
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

Container Queries (Modern):
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

Responsive Typography:
/* Using clamp() */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}

/* Using media queries */
body {
  font-size: 16px;
}

@media (min-width: 768px) {
  body {
    font-size: 18px;
  }
}

Hide/Show Elements:
.mobile-only {
  display: block;
}

.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
  
  .desktop-only {
    display: block;
  }
}

Touch-Friendly Design:
/* Larger tap targets for mobile */
button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}`,
  },
  {
    title: 'Web Performance Optimization',
    slug: 'web-performance-optimization',
    content: `Web Performance là yếu tố quan trọng ảnh hưởng đến user experience và SEO. Website nhanh giúp tăng conversion rate và ranking trên search engines.

Core Web Vitals:
Google sử dụng 3 metrics chính để đánh giá performance:

1. LCP (Largest Contentful Paint):
   - Đo thời gian load content chính
   - Mục tiêu: < 2.5 giây
   - Cải thiện: Optimize images, remove render-blocking resources

2. FID (First Input Delay):
   - Đo thời gian phản hồi với tương tác đầu tiên
   - Mục tiêu: < 100ms
   - Cải thiện: Minimize JavaScript, code splitting

3. CLS (Cumulative Layout Shift):
   - Đo độ ổn định visual
   - Mục tiêu: < 0.1
   - Cải thiện: Set dimensions cho images/videos, avoid dynamic content

Image Optimization:
// Next.js Image component
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>

// HTML
<img 
  src="photo.jpg" 
  alt="Photo"
  loading="lazy"
  width="800"
  height="600"
/>

// Modern formats
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description">
</picture>

Code Splitting:
// React lazy loading
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// Next.js dynamic imports
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable server-side rendering
});

Minimize JavaScript:
// Tree shaking - import only what you need
import { map } from 'lodash'; // ❌ Bad
import map from 'lodash/map'; // ✅ Good

// Or use lodash-es
import { map } from 'lodash-es'; // ✅ Better

Caching Strategies:
// HTTP Cache headers
Cache-Control: public, max-age=31536000, immutable

// Service Worker caching
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

Resource Hints:
<!-- Preconnect to important origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="https://api.example.com">

<!-- Preload critical resources -->
<link rel="preload" href="/font.woff2" as="font" crossorigin>

<!-- Prefetch resources for next page -->
<link rel="prefetch" href="/next-page.html">

Font Optimization:
/* Use font-display */
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
}

/* Subset fonts */
/* Only include characters you need */

Critical CSS:
/* Inline critical CSS in <head> */
<style>
  /* Above-the-fold styles */
  .hero { ... }
  .header { ... }
</style>

<!-- Load remaining CSS async -->
<link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

Compression:
# Enable Gzip/Brotli on server
# Reduces file size by 70-90%

Bundle Analysis:
# Next.js
npm run build
# Check .next/analyze/

# Webpack Bundle Analyzer
npx webpack-bundle-analyzer build/stats.json

Performance Monitoring:
// Web Vitals library
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);`,
  },
]

async function seedDocuments() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  })

  console.log('🔌 Connecting to database...')

  try {
    await pool.query('SELECT NOW()')
    console.log('✅ Connected to database!')

    console.log('📚 Seeding documents...\n')

    for (const doc of sampleDocuments) {
      // Check if document already exists
      const existing = await pool.query(
        'SELECT id FROM documents WHERE slug = $1',
        [doc.slug]
      )

      if (existing.rows.length > 0) {
        console.log(`⏭️  Skipping "${doc.title}" (already exists)`)
        continue
      }

      await pool.query(
        'INSERT INTO documents (title, content, slug) VALUES ($1, $2, $3)',
        [doc.title, doc.content, doc.slug]
      )
      console.log(`✅ Added: ${doc.title}`)
    }

    console.log('\n🎉 Seeding complete!')
    console.log('\nNext step:')
    console.log('Run: npm run db:embed - to generate embeddings for the documents')

  } catch (error) {
    console.error('❌ Error seeding documents:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

seedDocuments()
