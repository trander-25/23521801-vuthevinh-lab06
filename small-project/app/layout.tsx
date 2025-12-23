import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AskAIWidget from '@/components/AskAIWidget'

const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Học Lập Trình Web - AI Knowledge Base',
  description: 'Tài liệu học lập trình web từ cơ bản đến nâng cao: HTML, CSS, JavaScript, React, Next.js. Tích hợp AI hỗ trợ tìm kiếm và trả lời câu hỏi thông minh với RAG.',
  keywords: ['học lập trình web', 'HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'web development', 'AI', 'RAG', 'học web cơ bản'],
  authors: [{ name: 'Student' }],
  openGraph: {
    title: 'Học Lập Trình Web - AI Knowledge Base',
    description: 'Tài liệu học lập trình web từ cơ bản đến nâng cao với AI hỗ trợ học tập',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <a href="/" className="flex items-center space-x-3">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span className="text-xl font-bold">Học Lập Trình Web</span>
                </a>
                <nav className="flex space-x-6">
                  <a
                    href="/"
                    className="hover:text-blue-200 transition-colors font-medium"
                  >
                    Trang chủ
                  </a>
                  <a
                    href="/docs"
                    className="hover:text-blue-200 transition-colors font-medium"
                  >
                    Tài liệu
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p>&copy; 2024 Học Lập Trình Web. Tài liệu cơ bản cho người mới bắt đầu - Built with Next.js 15 & AI.</p>
            </div>
          </footer>
        </div>
        <AskAIWidget />
      </body>
    </html>
  )
}
