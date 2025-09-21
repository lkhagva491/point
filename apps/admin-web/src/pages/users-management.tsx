import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import EditUserModal from "../components/EditUserModal";
import { toast } from "react-toastify";
import Link from "next/link";
import { User } from "../types";
import withAuth from "../hooks/withAuth";
import useApi from "../hooks/useApi";
import UserList from "../components/UserList";
import Header from "../components/Header";
import { Card, LoadingSpinner } from "@point/ui";

function UsersManagement() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { get, del, loading } = useApi();

  const fetchUsers = async () => {
    const data = await get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    if (data) {
      setUsers(data);
    }
  };

  useEffect(() => {
    const adminData = Cookies.get("admin_data");
    if (adminData) {
      setUser(JSON.parse(adminData));
    }
    fetchUsers();
  }, []);

  const handleEdit = (userToEdit: User) => {
    setEditingUser(userToEdit);
  };

  const handleDelete = async (userEmail: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const response = await del(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userEmail}`
      );
      if (response) {
        toast.success("User deleted successfully!");
        fetchUsers(); // Refresh the user list
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner color="border-purple-600" size="xl" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Users Management - Point Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />

        <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8 sm:max-w-7xl">
          <div className="py-6 sm:px-0">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Users Management
                </h2>
                <Link href="/dashboard" className="btn btn-secondary">
                  Dashboard
                </Link>
              </div>

              <UserList
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Card>
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

export default withAuth(UsersManagement);