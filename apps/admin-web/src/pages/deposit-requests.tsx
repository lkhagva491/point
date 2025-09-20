import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button } from '@point/ui';
import Link from 'next/link';

interface Transaction {
  _id: string;
  userEmail: string;
  points: number;
  type: 'earn' | 'redeem' | 'deposit';
  status: 'pending' | 'approved' | 'declined';
  requestedAmount: number;
  approvedByAdminEmail?: string;
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

export default function DepositRequests() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null)
  const [requests, setRequests] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDepositRequests = async () => {
    try {
      const token = Cookies.get('admin_token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setRequests(response.data.filter((req: Transaction) => req.type === 'deposit' && req.status === 'pending'));
    } catch (err: any) {
      if (err.response?.status === 401) {
        Cookies.remove('admin_token');
        Cookies.remove('admin_data');
        router.push('/?message=Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch deposit requests');
        toast.error(err.response?.data?.message || 'Failed to fetch deposit requests');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get('admin_token')
    const userData = Cookies.get('admin_data')
    
    if (!token || !userData) {
      router.push('/')
      return
    }

    setUser(JSON.parse(userData))
    fetchDepositRequests();
  }, [router]);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'declined') => {
    setLoading(true);
    try {
      const token = Cookies.get('admin_token');
      const adminUser = JSON.parse(Cookies.get('admin_data') || '{}');
      const approvedByAdminEmail = adminUser.email; 

      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/deposit/${id}/status`, {
        status,
        approvedByAdminEmail,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success(`Deposit request ${status} successfully!`);
      fetchDepositRequests();
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to ${status} deposit request`);
      toast.error(err.response?.data?.message || `Failed to ${status} deposit request`);
    } finally {
      setLoading(false);
    }
  };

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

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>Deposit Requests - Admin</title>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Pending Deposit Requests</h2>
                <Link href="/dashboard" className="btn btn-secondary">Dashboard</Link>
              </div>
              
              {requests.length === 0 ? (
                <p className="text-gray-600">No pending deposit requests found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Amount</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests.map((request, index) => (
                        <tr key={request._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(request.createdAt).toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{request.userEmail}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{request.requestedAmount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            <div className="flex space-x-2 justify-center">
                              <Button
                                onClick={() => handleStatusUpdate(request._id, 'approved')}
                                className="btn bg-green-600 text-white hover:bg-green-700"
                                size="sm"
                                loading={loading}
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleStatusUpdate(request._id, 'declined')}
                                className="btn bg-purple-600 text-white hover:bg-purple-700"
                                size="sm"
                                loading={loading}
                              >
                                Decline
                              </Button>
                            </div>
                          </td>
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
