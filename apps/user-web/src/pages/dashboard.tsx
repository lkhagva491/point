import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'

interface User {
  _id: string
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
    const fetchUserData = async () => {
      const token = Cookies.get('user_token');
      const userDataCookie = Cookies.get('user_data');

      if (!token || !userDataCookie) {
        router.push('/login');
        return;
      }

      try {
        // Fetch latest user data from backend
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {}, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const latestUser = response.data;
        
        setUser(latestUser);
        Cookies.set('user_data', JSON.stringify(latestUser), { expires: 7 });
      } catch (error) {
        console.error("Failed to fetch latest user data:", error);
        // Optionally handle error, e.g., redirect to login if token is invalid
        Cookies.remove('user_token');
        Cookies.remove('user_data');
        router.push('/login?message=Session expired. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('user_token')
    Cookies.remove('user_data')
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
        <title>Dashboard - Point</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">Point</h1>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">Profile</h3>
                  <p className="text-primary-700 mb-4">Manage account settings.</p>
                  <Link href="/change-password" className="btn btn-primary">Change Password</Link>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Deposit Points</h3>
                  <p className="text-green-700 mb-4">Request to deposit points into your account.</p>
                  <Link href="/deposit" className="btn bg-green-600 text-white hover:bg-green-700">Deposit</Link>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Transaction History</h3>
                  <p className="text-purple-700 mb-4">View your past point transactions.</p>
                  <Link href="/transaction-history" className="btn bg-purple-600 text-white hover:bg-purple-700">View History</Link>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="pb-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Username:</span>
                      <p className="text-gray-900 text-base">{user?.username}</p>
                    </div>
                    <div className="pb-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Email:</span>
                      <p className="text-gray-900 text-base">{user?.email}</p>
                    </div>
                    <div className="pb-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Role:</span>
                      <p className="text-gray-900 text-base capitalize">{user?.role}</p>
                    </div>
                    <div className="pb-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Points:</span>
                      <p className="text-gray-900 text-base">{user?.point || 0}</p>
                    </div>
                    <div className="pb-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Member Since:</span>
                      <p className="text-gray-900 text-base">Today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
