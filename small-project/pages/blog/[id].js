import { useRouter } from 'next/router';
import Link from 'next/link';
import blogData from '../../data/blog-data.json';

// Generate static paths for all blog posts
export async function getStaticPaths() {
  // Get all post IDs from our data
  const paths = blogData.map((post) => ({
    params: { id: post.id },
  }));

  // fallback: true allows accessing posts not generated at build time
  // They will be generated on-demand (ISR behavior)
  return {
    paths,
    fallback: true,
  };
}

// Fetch data for specific post based on ID
export async function getStaticProps({ params }) {
  const post = blogData.find((p) => p.id === params.id);

  // If post not found, return 404
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    // Enable ISR: revalidate every 60 seconds
    revalidate: 60,
  };
}

export default function BlogPost({ post }) {
  const router = useRouter();

  // Show loading state when fallback page is being generated
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
            <Link
              href="/blog"
              className="inline-flex items-center text-white hover:text-indigo-100 mb-4"
            >
              ← Back to all posts
            </Link>
            <h1 className="text-3xl font-bold text-white mt-2">
              {post.title}
            </h1>
            <div className="flex items-center text-indigo-100 text-sm mt-3">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Implementation Details */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Exercise 1 Features Demonstrated:
              </h3>
              <ul className="text-sm text-green-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>getStaticPaths:</strong> Generates paths for all posts at build time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>getStaticProps:</strong> Fetches specific post data based on ID parameter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>fallback: true:</strong> Enables on-demand generation for new posts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>revalidate: 60:</strong> ISR - regenerates page every 60 seconds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>router.isFallback:</strong> Shows loading state for fallback pages</span>
                </li>
              </ul>
            </div>

            {/* Challenge Section */}
            <div className="mt-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">
                🎯 Challenge Task:
              </h3>
              <p className="text-sm text-purple-700">
                Try adding a new post to <code className="bg-purple-100 px-2 py-1 rounded">data/blog-data.json</code> with id "6".
                Without rebuilding, navigate to <code className="bg-purple-100 px-2 py-1 rounded">/blog/6</code> to see the fallback behavior in action!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
