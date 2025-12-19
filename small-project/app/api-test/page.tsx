'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ApiTestPage() {
  const [apiKey, setApiKey] = useState('my-super-secret-key-12345')
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testApi = async (useCorrectKey: boolean) => {
    setLoading(true)
    setResponse(null)
    setError(null)

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (useCorrectKey) {
        headers['x-api-key'] = apiKey
      } else {
        headers['x-api-key'] = 'wrong-key'
      }

      const res = await fetch('/api/secret', {
        method: 'GET',
        headers,
      })

      const data = await res.json()

      if (res.ok) {
        setResponse(data)
      } else {
        setError(data.message || 'Request failed')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const testPost = async () => {
    setLoading(true)
    setResponse(null)
    setError(null)

    try {
      const res = await fetch('/api/secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          name: 'Student',
          exercise: 3,
          message: 'Testing POST request',
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setResponse(data)
      } else {
        setError(data.message || 'Request failed')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-6"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Exercise 3: API Route & Middleware
          </h1>
          <p className="text-gray-600 mb-8">
            Testing API authentication using middleware
          </p>

          {/* API Key Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key Configuration
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Enter API key"
            />
            <p className="text-sm text-gray-500 mt-1">
              Correct key: <code className="bg-gray-100 px-2 py-1 rounded">my-super-secret-key-12345</code>
            </p>
          </div>

          {/* Test Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => testApi(true)}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ✓ Valid Key (GET)
            </button>
            <button
              onClick={() => testApi(false)}
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ✗ Invalid Key (GET)
            </button>
            <button
              onClick={testPost}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              📤 POST Request
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Testing API...</p>
            </div>
          )}

          {/* Success Response */}
          {response && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-green-800 font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Success Response
              </h3>
              <pre className="bg-white p-4 rounded border border-green-300 overflow-x-auto text-sm">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}

          {/* Error Response */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-red-800 font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Error Response (401 Unauthorized)
              </h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Implementation Details */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200 mb-6">
            <h3 className="font-semibold text-purple-800 mb-3">
              🔒 Exercise 3 Implementation:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Middleware Features:</h4>
                <ul className="text-purple-700 space-y-1 text-xs">
                  <li>• Located in <code className="bg-purple-100 px-1 rounded">middleware.ts</code></li>
                  <li>• Runs before API route executes</li>
                  <li>• Checks <code className="bg-purple-100 px-1 rounded">x-api-key</code> header</li>
                  <li>• Returns 401 if invalid</li>
                  <li>• Adds custom headers on success</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">API Route Features:</h4>
                <ul className="text-purple-700 space-y-1 text-xs">
                  <li>• Located in <code className="bg-purple-100 px-1 rounded">app/api/secret/route.ts</code></li>
                  <li>• Supports GET and POST methods</li>
                  <li>• Returns JSON responses</li>
                  <li>• Protected by middleware</li>
                  <li>• Uses App Router conventions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">
              📝 Test with cURL:
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Valid request:</p>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
                  curl -H "x-api-key: my-super-secret-key-12345" http://localhost:3000/api/secret
                </pre>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Invalid request:</p>
                <pre className="bg-gray-800 text-red-400 p-3 rounded text-xs overflow-x-auto">
                  curl -H "x-api-key: wrong-key" http://localhost:3000/api/secret
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
