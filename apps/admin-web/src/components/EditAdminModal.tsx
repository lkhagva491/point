import { Button } from '@point/ui';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface Admin {
  email: string;
  username: string;
  role: string;
}

interface EditAdminModalProps {
  admin: Admin | null;
  onClose: () => void;
  onAdminUpdated: () => void;
}

export default function EditAdminModal({ admin, onClose, onAdminUpdated }: EditAdminModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (admin) {
      setFormData({ username: admin.username, email: admin.email });
    }
  }, [admin]);

  if (!admin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = Cookies.get('admin_token');
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admins/${admin.email}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success('Admin updated successfully!');
      onAdminUpdated();
      onClose();
    } catch (err: any) {
      if (err.response?.status === 401) {
        Cookies.remove('admin_token');
        Cookies.remove('admin_data');
        router.push('/?message=Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'Failed to update admin');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Admin</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input mt-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input mt-1 w-full"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" loading={loading} variant="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
