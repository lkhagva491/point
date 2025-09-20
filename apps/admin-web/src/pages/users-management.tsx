import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import EditUserModal from "../components/EditUserModal";
import { toast } from "react-toastify";
import Link from "next/link";

interface User {
  email: string;
  username: string;
  userType: string;
  role: string;
  point?: number;
  permissions?: number;
}

export default function UsersManagement() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("admin_token");
    const adminData = Cookies.get("admin_data");

    if (!token || !adminData) {
      router.push("/");
      return;
    }

    setUser(JSON.parse(adminData));
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setUsers(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Cookies.remove("admin_token");
        Cookies.remove("admin_data");
        router.push("/?message=Session expired. Please log in again.");
      } else {
        console.error("Failed to fetch users:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userToEdit: User) => {
    setEditingUser(userToEdit);
  };

  const handleDelete = async (userEmail: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = Cookies.get("admin_token");
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userEmail}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        toast.success("User deleted successfully!");
        fetchUsers(); // Refresh the user list
      } catch (error: any) {
        if (error.response?.status === 401) {
          Cookies.remove("admin_token");
          Cookies.remove("admin_data");
          router.push("/?message=Session expired. Please log in again.");
        } else {
          console.error("Failed to delete user:", error);
          alert("Failed to delete user");
        }
      }
    }
  };

  const handleCloseModal = () => {
    setEditingUser(null);
  };

  const handleLogout = () => {
    Cookies.remove("admin_token");
    Cookies.remove("admin_data");
    router.push("/");
  };

  if (loading && !editingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Users Management - Point Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">Point Admin</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.username}
                </span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8 sm:max-w-7xl">
          <div className="py-6 sm:px-0">
            <div className="card w-full mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Users Management
                </h2>
                <Link href="/dashboard" className="btn btn-secondary">
                  Dashboard
                </Link>
              </div>

              <div className="w-full mx-auto">
                <table className="min-w-full divide-y divide-gray-200 block sm:table">
                  <thead className="bg-gray-50 hidden sm:table-header-group">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 w-full flex flex-col items-center sm:table-row-group">
                    {users.map((user, index) => (
                      <tr
                        key={user.email}
                        className={`block sm:table-row mb-4 sm:mb-0 p-4 sm:p-0 rounded-lg shadow sm:shadow-none w-full max-w-4xl mx-auto ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td
                          data-label="Name:"
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
                        >
                          {user.username}
                        </td>
                        <td
                          data-label="Email:"
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
                        >
                          {user.email}
                        </td>
                        <td
                          data-label="Role:"
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
                        >
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td
                          data-label="Actions:"
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
                        >
                          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 justify-center">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-primary-600 hover:text-primary-900 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user.email)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={handleCloseModal}
          onUserUpdated={fetchUsers}
        />
      )}
    </>
  );
}
