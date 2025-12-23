import Link from 'next/link'
import AskAIButton from '@/components/AskAIButton'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Học Lập Trình Web Từ Cơ Bản
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Khám phá kiến thức lập trình web từ HTML, CSS, JavaScript đến React và Next.js.
          Tích hợp AI thông minh giúp bạn tìm kiếm và học tập hiệu quả hơn.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/docs"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Xem tài liệu
          </Link>
          <AskAIButton />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Học tập thông minh với AI
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            }
            title="Tài liệu đầy đủ & Chính xác"
            description="Từ HTML, CSS, JavaScript cơ bản đến React, Next.js nâng cao. AI tìm kiếm và trả lời dựa trên nội dung tài liệu."
          />
          <FeatureCard
            icon={
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
            title="Học tập Tương tác"
            description="Hỏi AI bất cứ điều gì về lập trình web. Câu trả lời hiển thị realtime, giúp bạn học nhanh hơn."
          />
          <FeatureCard
            icon={
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            title="Tìm kiếm Thông minh"
            description="AI hiểu ngữ cảnh câu hỏi của bạn và tìm kiếm nội dung liên quan nhất trong toàn bộ tài liệu."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Cách hoạt động
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <Step
              number={1}
              title="Đặt câu hỏi"
              description="Hỏi bất cứ điều gì về HTML, CSS, JavaScript, React, Next.js qua widget AI."
            />
            <Step
              number={2}
              title="AI phân tích"
              description="Hệ thống hiểu ý nghĩa câu hỏi và tìm nội dung phù hợp nhất từ tài liệu lập trình web."
            />
            <Step
              number={3}
              title="Nhận câu trả lời"
              description="AI tổng hợp thông tin và trả lời câu hỏi của bạn một cách chi tiết, dễ hiểu."
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Công nghệ sử dụng
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <TechBadge name="Next.js 15" />
          <TechBadge name="React 19" />
          <TechBadge name="Vercel AI SDK" />
          <TechBadge name="PostgreSQL + pgvector" />
          <TechBadge name="Tailwind CSS" />
          <TechBadge name="OpenAI API" />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function Step({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
      {name}
    </span>
  )
}
