import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface Transaction {
  _id: string;
  userId: string;
  points: number;
  type: 'earn' | 'redeem' | 'deposit';
  status?: 'pending' | 'approved' | 'declined';
  requestedAmount?: number;
  approvedByAdminId?: string;
  createdAt: string;
}

interface User {
  email: string
  username: string
  userType: string
  role: string
  point?: number
  permissions?: number
}

export default function TransactionHistory() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = Cookies.get('user_token')
    const userData = Cookies.get('user_data')
    
    if (!token || !userData) {
      router.push('/')
      return
    }

    setUser(JSON.parse(userData))
    const fetchTransactions = async () => {
      try {
        const token = Cookies.get('user_token');
        const user = JSON.parse(Cookies.get('user_data') || '{}');

        if (!user || !user.email) {
          throw new Error('User not logged in');
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/user/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setTransactions(response.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          Cookies.remove('user_token');
          Cookies.remove('user_data');
          router.push('/?message=Session expired. Please log in again.');
        } else {
          setError(err.response?.data?.message || 'Failed to fetch transactions');
          toast.error(err.response?.data?.message || 'Failed to fetch transactions');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
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

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  const getStatusColorClass = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>Transaction History - Point</title>
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
                <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
                <div className="flex space-x-2">
                  <Link href="/dashboard" className="btn btn-secondary">Dashboard</Link>
                  <Link href="/deposit" className="btn bg-green-600 text-white hover:bg-green-700">Deposit</Link>
                </div>
              </div>

              {transactions.length === 0 ? (
                <p className="text-gray-600">No transactions found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction, index) => (
                        <tr key={transaction._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(transaction.createdAt).toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{transaction.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{transaction.points}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(transaction.status)}`}>
                              {transaction.status || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{transaction.requestedAmount || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}