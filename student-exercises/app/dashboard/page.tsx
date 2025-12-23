async function getUserProfile() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
    name: 'Vu The Vinh',
    role: 'Student',
    email: 'student@example.com',
    joinDate: '2025-01-15',
    stats: {
      projects: 12,
      exercises: 24,
      score: 95,
    },
  };
}

export default async function DashboardPage() {
  // This is a Server Component - can fetch data directly
  const userProfile = await getUserProfile();

  return (
    <div className="space-y-6">
      {/* User Profile Card - Server Component */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
            <p className="text-sm text-gray-600 mt-1">Fetched on the server</p>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
            Server Component
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-lg font-semibold text-gray-900">{userProfile.name}</p>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600">Role</label>
              <p className="text-lg font-semibold text-gray-900">{userProfile.role}</p>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-lg font-semibold text-gray-900">{userProfile.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Member Since</label>
              <p className="text-lg font-semibold text-gray-900">{userProfile.joinDate}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projects</span>
                <span className="text-2xl font-bold text-indigo-600">{userProfile.stats.projects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Exercises</span>
                <span className="text-2xl font-bold text-indigo-600">{userProfile.stats.exercises}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Score</span>
                <span className="text-2xl font-bold text-indigo-600">{userProfile.stats.score}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Info */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <h3 className="font-semibold text-green-800 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Exercise 2: Server Component Features
        </h3>
        <ul className="text-sm text-green-700 space-y-2">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span><strong>async/await:</strong> Direct data fetching in component</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span><strong>No client JavaScript:</strong> This component doesn't send JS to browser</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span><strong>Server-only execution:</strong> Could access database or filesystem directly</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span><strong>Automatic loading UI:</strong> Next.js shows loading state during fetch</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
