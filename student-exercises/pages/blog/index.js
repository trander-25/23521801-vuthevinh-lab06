import Link from 'next/link';
import blogData from '../../data/blog-data.json';

export async function getStaticProps() {
  // In a real application, this might be an API call or database query
  // For this exercise, we're using the local JSON file
  const posts = blogData;
  
  return {
    props: {
      posts,
    },
  };
}

export default function BlogIndex({ posts }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Next.js Blog
          </h1>
          <p className="text-gray-600 mb-8">
            Exercise 1: Dynamic Blog System using SSG (Static Site Generation)
          </p>
          
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="block p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-lg transition-shadow duration-200 border border-indigo-100"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-gray-700 line-clamp-2">
                  {post.content}
                </p>
                <span className="inline-block mt-4 text-indigo-600 font-medium">
                  Read more →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">
              💡 Implementation Details:
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>✓ Using getStaticProps to fetch data at build time</li>
              <li>✓ Data from local JSON file (simulating API)</li>
              <li>✓ All pages pre-rendered as static HTML</li>
              <li>✓ Optimal performance and SEO</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
