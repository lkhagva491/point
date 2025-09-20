import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Button } from '@point/ui';
import Link from 'next/link';

interface User {
  email: string
  username: string
  userType: string
  role: string
  point?: number
  permissions?: number
}

export default function Deposit() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null)
  const [amount, setAmount] = useState<number | string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = Cookies.get('user_token')
    const userData = Cookies.get('user_data')
    
    if (!token || !userData) {
      router.push('/')
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (typeof amount !== 'number' || amount <= 0) {
      setError('Please enter a valid amount');
      setLoading(false);
      return;
    }

    try {
      const token = Cookies.get('user_token');
      const currentUser = JSON.parse(Cookies.get('user_data') || '{}');

      console.log('user', currentUser);

      if (!currentUser || !currentUser.email) {
        throw new Error('User not logged in');
      }

      console.log('Deposit Request - User Email:', currentUser.email);

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transactions/deposit`, {
        userEmail: currentUser.email,
        requestedAmount: amount,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      toast.success('Deposit request submitted successfully!');
      router.push('/transaction-history');
    } catch (err: any) {
      if (err.response?.status === 401) {
        Cookies.remove('user_token');
        Cookies.remove('user_data');
        router.push('/?message=Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'Failed to submit deposit request');
        toast.error(err.response?.data?.message || 'Failed to submit deposit request');
      }
    } finally {
      setLoading(false);
    }
  };

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
        <title>Deposit Points - Point</title>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Deposit Points</h2>
                <div className="flex space-x-2">
                  <Link href="/dashboard" className="btn btn-secondary">Dashboard</Link>
                  <Link href="/transaction-history" className="btn bg-purple-600 text-white hover:bg-purple-700">View History</Link>
                </div>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount to Deposit
                    </label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      required
                      className="input mt-1"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full"
                    variant="primary"
                  >
                    Submit Deposit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}