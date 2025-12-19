'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ImageOptimizationPage() {
  const [showOptimized, setShowOptimized] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Exercise 4: Image & Font Optimization
          </h1>
          <p className="text-gray-600 mb-8">
            Comparing standard images vs Next.js optimized images
          </p>

          {/* Toggle Button */}
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={() => setShowOptimized(!showOptimized)}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                showOptimized
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
            >
              {showOptimized ? '✓ Using next/image (Optimized)' : '✗ Using standard <img> tag'}
            </button>
          </div>

          {/* Image Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Standard Image */}
            <div className={`rounded-lg border-4 p-6 transition-all ${
              !showOptimized ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                {!showOptimized && <span className="text-red-600 mr-2">🔴</span>}
                Standard &lt;img&gt; Tag
              </h3>
              {!showOptimized && (
                <div className="mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://picsum.photos/800/600"
                    alt="Standard image"
                    className="w-full rounded-lg"
                  />
                </div>
              )}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-red-700 mb-2">Issues:</h4>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>❌ No automatic format conversion</li>
                  <li>❌ Causes layout shift (CLS)</li>
                  <li>❌ Loads at original size</li>
                  <li>❌ No lazy loading by default</li>
                  <li>❌ Not optimized for different devices</li>
                </ul>
              </div>
            </div>

            {/* Optimized Image */}
            <div className={`rounded-lg border-4 p-6 transition-all ${
              showOptimized ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                {showOptimized && <span className="text-green-600 mr-2">🟢</span>}
                Next.js &lt;Image&gt; Component
              </h3>
              {showOptimized && (
                <div className="mb-4">
                  <Image
                    src="https://picsum.photos/800/600"
                    alt="Optimized image"
                    width={800}
                    height={600}
                    className="w-full rounded-lg"
                    priority
                  />
                </div>
              )}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-green-700 mb-2">Benefits:</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>✅ Automatic WebP/AVIF conversion</li>
                  <li>✅ Prevents layout shift (reserves space)</li>
                  <li>✅ Responsive sizing</li>
                  <li>✅ Automatic lazy loading</li>
                  <li>✅ Device-optimized variants</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Multiple Images Demo */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h3 className="font-semibold text-blue-800 mb-4">
              📸 Image Gallery with Lazy Loading
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="relative aspect-square">
                  <Image
                    src={`https://picsum.photos/400/400?random=${num}`}
                    alt={`Gallery image ${num}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-700 mt-4">
              💡 These images use the <code className="bg-blue-100 px-2 py-1 rounded">fill</code> prop and only load when scrolled into view
            </p>
          </div>

          {/* Font Optimization Demo */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200 mb-8">
            <h3 className="font-semibold text-purple-800 mb-4">
              🔤 Font Optimization with next/font
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-purple-700 mb-3">Implementation:</h4>
                <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'] 
})

// In layout.tsx
<body className={inter.className}>
  {children}
</body>`}
                </pre>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-purple-700 mb-3">Benefits:</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span><strong>Self-hosted:</strong> No external requests to Google Fonts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span><strong>Zero layout shift:</strong> Font metrics matched to fallback</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span><strong>Automatic subsetting:</strong> Only load needed characters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span><strong>Build-time optimization:</strong> Downloaded during build</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementation Details */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Exercise 4 Key Features:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-green-700 mb-2">next/image:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Automatic optimization</li>
                  <li>• Responsive images</li>
                  <li>• Modern formats</li>
                  <li>• Lazy loading</li>
                  <li>• Priority loading</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-green-700 mb-2">Core Web Vitals:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Improved LCP</li>
                  <li>• Zero CLS</li>
                  <li>• Better FCP</li>
                  <li>• Optimized INP</li>
                  <li>• Smaller bundles</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-green-700 mb-2">Configuration:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• remotePatterns</li>
                  <li>• width & height</li>
                  <li>• fill mode</li>
                  <li>• sizes attribute</li>
                  <li>• quality settings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Testing Instructions */}
          <div className="mt-8 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-3">
              🧪 How to Test:
            </h3>
            <ol className="text-sm text-yellow-700 space-y-2">
              <li>1. Open Chrome DevTools → Performance tab</li>
              <li>2. Toggle between optimized and standard images</li>
              <li>3. Observe the Layout Shift (CLS) metric</li>
              <li>4. Check Network tab for image formats (WebP vs JPEG)</li>
              <li>5. Use Lighthouse to measure Core Web Vitals improvements</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
