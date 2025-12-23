import Link from 'next/link'
import { getAllDocuments } from '@/database'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tài liệu - AI Knowledge Base',
  description: 'Danh sách tất cả tài liệu trong hệ thống Knowledge Base',
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

export default async function DocsPage() {
  let documents: Awaited<ReturnType<typeof getAllDocuments>> = []
  let error: string | null = null

  try {
    documents = await getAllDocuments()
  } catch (err) {
    console.error('Error fetching documents:', err)
    error = 'Không thể tải danh sách tài liệu. Vui lòng kiểm tra kết nối database.'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tài liệu</h1>
        <p className="text-lg text-gray-600">
          Khám phá các tài liệu trong hệ thống. Bạn cũng có thể sử dụng nút
          &quot;Hỏi AI&quot; ở góc phải để đặt câu hỏi về nội dung.
        </p>
      </div>

      {error ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <svg
            className="w-12 h-12 text-yellow-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-yellow-800">{error}</p>
          <p className="text-yellow-600 text-sm mt-2">
            Vui lòng xem hướng dẫn trong file SETUP_GUIDE.md để cấu hình database.
          </p>
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <svg
            className="w-12 h-12 text-blue-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-blue-800 font-medium">Chưa có tài liệu nào</p>
          <p className="text-blue-600 text-sm mt-2">
            Chạy <code className="bg-blue-100 px-2 py-1 rounded">npm run db:setup</code> để thêm tài liệu mẫu.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/docs/${doc.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                  {doc.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {doc.content.substring(0, 150)}...
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {new Date(doc.created_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-end">
                <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Đọc thêm
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
