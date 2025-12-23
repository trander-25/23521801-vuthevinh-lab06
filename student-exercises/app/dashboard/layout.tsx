import Link from 'next/link'
import SettingsToggle from './SettingsToggle'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Sidebar Navigation - Server Component */}
        <aside className="w-64 min-h-screen bg-gradient-to-b from-indigo-600 to-blue-700 text-white p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-indigo-200 text-sm mt-1">Exercise 2</p>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </div>
            </Link>
            
            <div className="px-4 py-3 rounded-lg bg-white/5">
              <div className="flex items-center text-indigo-200">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </div>
            </div>

            <Link
              href="/"
              className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </div>
            </Link>
          </nav>

          {/* Sidebar Info */}
          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <p className="text-xs text-indigo-200 mb-2">📌 Sidebar is a:</p>
            <p className="text-sm font-semibold">Server Component</p>
            <p className="text-xs text-indigo-200 mt-2">Static navigation that doesn't need client-side JavaScript</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Exercise 2: Hybrid Rendering Dashboard
              </h1>
              <p className="text-gray-600 mb-6">
                Demonstrating Server Components and Client Components working together
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Server Component Content */}
                <div>
                  {children}
                </div>

                {/* Client Component */}
                <div>
                  <SettingsToggle />
                </div>
              </div>
            </div>

            {/* Architecture Explanation */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-3">
                🏗️ Architecture Overview:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-green-600 font-semibold mb-2">Server Components:</div>
                  <ul className="text-gray-700 space-y-1 text-xs">
                    <li>• Layout (sidebar)</li>
                    <li>• Profile page</li>
                    <li>• Data fetching</li>
                    <li>• No client JS</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-blue-600 font-semibold mb-2">Client Components:</div>
                  <ul className="text-gray-700 space-y-1 text-xs">
                    <li>• Settings panel</li>
                    <li>• Interactive toggles</li>
                    <li>• useState hooks</li>
                    <li>• Event handlers</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-purple-600 font-semibold mb-2">Benefits:</div>
                  <ul className="text-gray-700 space-y-1 text-xs">
                    <li>• Reduced bundle size</li>
                    <li>• Better performance</li>
                    <li>• SEO friendly</li>
                    <li>• Optimal UX</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
