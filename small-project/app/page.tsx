'use client'

import { useState } from 'react'
import Link from 'next/link'

type Tab = 'exercise1' | 'exercise2' | 'exercise3' | 'exercise4'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('exercise1')

  const tabs = [
    {
      id: 'exercise1' as Tab,
      title: 'Exercise 1',
      subtitle: 'Dynamic Blog System',
      description: 'Pages Router with SSG, getStaticPaths, and getStaticProps',
      color: 'from-blue-500 to-indigo-600',
      icon: '📝',
      link: '/blog',
      features: [
        'Static Site Generation (SSG)',
        'getStaticPaths for dynamic routes',
        'getStaticProps for data fetching',
        'ISR with revalidate',
        'Fallback behavior demonstration',
      ],
    },
    {
      id: 'exercise2' as Tab,
      title: 'Exercise 2',
      subtitle: 'Hybrid Rendering Dashboard',
      description: 'App Router with Server and Client Components',
      color: 'from-purple-500 to-pink-600',
      icon: '⚛️',
      link: '/dashboard',
      features: [
        'React Server Components',
        'Client Components with "use client"',
        'Server-side data fetching',
        'Interactive UI with useState',
        'Component composition patterns',
      ],
    },
    {
      id: 'exercise3' as Tab,
      title: 'Exercise 3',
      subtitle: 'API Route & Middleware',
      description: 'Secure API endpoints with authentication middleware',
      color: 'from-cyan-500 to-blue-600',
      icon: '🔒',
      link: '/api-test',
      features: [
        'API Routes in App Router',
        'Middleware for authentication',
        'Request/Response handling',
        'GET and POST methods',
        'Security headers validation',
      ],
    },
    {
      id: 'exercise4' as Tab,
      title: 'Exercise 4',
      subtitle: 'Image & Font Optimization',
      description: 'next/image and next/font for performance',
      color: 'from-orange-500 to-red-600',
      icon: '🖼️',
      link: '/optimization',
      features: [
        'next/image component',
        'Automatic WebP/AVIF conversion',
        'Lazy loading & responsive images',
        'next/font optimization',
        'Core Web Vitals improvements',
      ],
    },
  ]

  const activeTabData = tabs.find((tab) => tab.id === activeTab)!

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Next.js Lab 6 - Student Exercises
              </h1>
              <p className="text-gray-600 mt-1">
                Advanced Next.js Framework Architecture and Application
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Vu The Vinh</p>
              <p className="text-xs text-gray-500">Module 6</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">{tab.icon}</span>
                    <span className="font-semibold">{tab.title}</span>
                    <span className="text-xs mt-1 hidden sm:block">{tab.subtitle}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <div className={`bg-gradient-to-r ${activeTabData.color} rounded-lg p-8 text-white mb-6`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-4xl mr-4">{activeTabData.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{activeTabData.title}</h2>
                      <p className="text-white/90">{activeTabData.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-white/80 mt-4">{activeTabData.description}</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {activeTabData.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Learning Objectives
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  {activeTab === 'exercise1' && (
                    <>
                      <p>• Understand Static Site Generation (SSG)</p>
                      <p>• Master dynamic routing with Next.js</p>
                      <p>• Implement Incremental Static Regeneration</p>
                      <p>• Learn data fetching at build time</p>
                    </>
                  )}
                  {activeTab === 'exercise2' && (
                    <>
                      <p>• Differentiate Server vs Client Components</p>
                      <p>• Build hybrid rendering architectures</p>
                      <p>• Optimize bundle size with RSC</p>
                      <p>• Manage component composition</p>
                    </>
                  )}
                  {activeTab === 'exercise3' && (
                    <>
                      <p>• Create API routes in Next.js</p>
                      <p>• Implement middleware for security</p>
                      <p>• Handle authentication flows</p>
                      <p>• Secure backend endpoints</p>
                    </>
                  )}
                  {activeTab === 'exercise4' && (
                    <>
                      <p>• Optimize images for performance</p>
                      <p>• Prevent Cumulative Layout Shift</p>
                      <p>• Self-host fonts with next/font</p>
                      <p>• Improve Core Web Vitals scores</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <Link
                href={activeTabData.link}
                className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r ${activeTabData.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
              >
                <span>Launch {activeTabData.title}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.link}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{tab.icon}</span>
                <svg 
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{tab.title}</h3>
              <p className="text-sm text-gray-600">{tab.subtitle}</p>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
          <h3 className="font-semibold text-indigo-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Project Structure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 mb-2">Pages Router:</h4>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>• <code className="bg-gray-100 px-1 rounded">pages/blog/</code> - Exercise 1</li>
                <li>• <code className="bg-gray-100 px-1 rounded">pages/api/</code> - API routes (legacy)</li>
                <li>• <code className="bg-gray-100 px-1 rounded">data/blog-data.json</code> - Blog data</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 mb-2">App Router:</h4>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>• <code className="bg-gray-100 px-1 rounded">app/dashboard/</code> - Exercise 2</li>
                <li>• <code className="bg-gray-100 px-1 rounded">app/api/secret/</code> - Exercise 3</li>
                <li>• <code className="bg-gray-100 px-1 rounded">app/optimization/</code> - Exercise 4</li>
                <li>• <code className="bg-gray-100 px-1 rounded">middleware.ts</code> - Auth middleware</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
