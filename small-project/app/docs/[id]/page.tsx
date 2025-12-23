import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDocumentById, getAllDocuments } from '@/database'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

// Generate static params for SSG
export async function generateStaticParams() {
  try {
    const documents = await getAllDocuments()
    return documents.map((doc) => ({
      id: doc.id.toString(),
    }))
  } catch {
    return []
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  
  try {
    const document = await getDocumentById(parseInt(id))
    
    if (!document) {
      return {
        title: 'Không tìm thấy tài liệu',
      }
    }

    return {
      title: `${document.title} - AI Knowledge Base`,
      description: document.content.substring(0, 160),
      openGraph: {
        title: document.title,
        description: document.content.substring(0, 160),
        type: 'article',
      },
    }
  } catch {
    return {
      title: 'Lỗi tải tài liệu',
    }
  }
}

// Enable ISR
export const revalidate = 60

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params
  let document = null
  let error: string | null = null

  try {
    document = await getDocumentById(parseInt(id))
  } catch (err) {
    console.error('Error fetching document:', err)
    error = 'Không thể tải tài liệu. Vui lòng thử lại sau.'
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    )
  }

  if (!document) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">
          Trang chủ
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/docs" className="hover:text-blue-600">
          Tài liệu
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">{document.title}</span>
      </nav>

      {/* Document content */}
      <article className="bg-white rounded-xl shadow-lg p-8">
        <header className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{document.title}</h1>
          <div className="flex items-center text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Ngày tạo: {new Date(document.created_at).toLocaleDateString('vi-VN')}</span>
            {document.updated_at && document.updated_at !== document.created_at && (
              <>
                <span className="mx-2">•</span>
                <span>
                  Cập nhật: {new Date(document.updated_at).toLocaleDateString('vi-VN')}
                </span>
              </>
            )}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {document.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* Back button */}
      <div className="mt-8">
        <Link
          href="/docs"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại danh sách tài liệu
        </Link>
      </div>

      {/* Ask AI CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 text-center">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">
          Có câu hỏi về tài liệu này?
        </h3>
        <p className="text-blue-700 mb-4">
          Sử dụng widget &quot;Hỏi AI&quot; ở góc phải màn hình để đặt câu hỏi!
        </p>
      </div>
    </div>
  )
}
