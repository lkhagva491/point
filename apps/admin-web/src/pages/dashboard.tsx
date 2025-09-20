import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Link from 'next/link'

interface User {
  email: string
  username: string
  userType: string
  role: string
  point?: number
  permissions?: number
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('admin_token')
    const userData = Cookies.get('admin_data')
    
    if (!token || !userData) {
      router.push('/')
      return
    }

    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    Cookies.remove('admin_token')
    Cookies.remove('admin_data')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard - Point Admin</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">Point Admin</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Admin Management</h3>
                  <p className="text-purple-700 mb-4">Manage admin accounts, edit details, or delete admins.</p>
                  <Link href="/admin-management" className="btn bg-purple-600 text-white hover:bg-purple-700">View Admins</Link>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Users Management</h3>
                  <p className="text-blue-700 mb-4">Manage user accounts, edit details, or delete users.</p>
                  <Link href="/users-management" className="btn bg-blue-600 text-white hover:bg-blue-700">View Users</Link>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Deposit Requests</h3>
                  <p className="text-green-700 mb-4">Review and manage pending user deposit requests.</p>
                  <Link href="/deposit-requests" className="btn bg-green-600 text-white hover:bg-green-700">View Requests</Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}