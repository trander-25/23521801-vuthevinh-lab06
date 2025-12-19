'use client'

import { useState } from 'react'

export default function SettingsToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div className={`rounded-lg shadow-lg p-6 border transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Settings Panel
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Interactive client component
          </p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
          Client Component
        </div>
      </div>

      <div className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Dark Mode
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Toggle dark/light theme
            </p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Notifications
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Enable push notifications
            </p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Auto-save Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Auto-save
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Automatically save changes
            </p>
          </div>
          <button
            onClick={() => setAutoSave(!autoSave)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              autoSave ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoSave ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Status Display */}
      <div className={`mt-6 p-4 rounded-lg ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Current Settings:
        </h4>
        <div className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <p>🎨 Theme: <strong>{isDarkMode ? 'Dark' : 'Light'}</strong></p>
          <p>🔔 Notifications: <strong>{notifications ? 'Enabled' : 'Disabled'}</strong></p>
          <p>💾 Auto-save: <strong>{autoSave ? 'On' : 'Off'}</strong></p>
        </div>
      </div>

      {/* Implementation Info */}
      <div className={`mt-6 p-4 rounded-lg border ${
        isDarkMode 
          ? 'bg-blue-900/20 border-blue-700' 
          : 'bg-blue-50 border-blue-200'
      }`}>
        <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
          💡 Client Component Features:
        </h4>
        <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
          <li>• Uses 'use client' directive</li>
          <li>• useState hook for interactivity</li>
          <li>• onClick event handlers</li>
          <li>• Real-time UI updates</li>
        </ul>
      </div>
    </div>
  )
}
