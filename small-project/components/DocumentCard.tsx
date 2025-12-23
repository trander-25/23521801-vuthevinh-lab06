import Link from 'next/link'

interface DocumentCardProps {
  id: number
  title: string
  content: string
  createdAt: Date
}

export default function DocumentCard({
  id,
  title,
  content,
  createdAt,
}: DocumentCardProps) {
  return (
    <Link
      href={`/docs/${id}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
          {title}
        </h2>
        <p className="text-gray-600 line-clamp-3">
          {content.substring(0, 150)}...
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
          {createdAt.toLocaleDateString('vi-VN')}
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
  )
}
