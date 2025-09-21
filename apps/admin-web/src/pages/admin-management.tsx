import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import EditAdminModal from "../components/EditAdminModal";
import { toast } from "react-toastify";
import Link from "next/link";
import { Admin, User } from "../types";
import withAuth from "../hooks/withAuth";
import useApi from "../hooks/useApi";
import AdminList from "../components/AdminList";
import Header from "../components/Header";
import { Card, LoadingSpinner } from "@point/ui";

function AdminManagement() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const { get, del, loading } = useApi();

  const fetchAdmins = async () => {
    const data = await get(`${process.env.NEXT_PUBLIC_API_URL}/admins`);
    if (data) {
      setAdmins(data);
    }
  };

  useEffect(() => {
    const adminData = Cookies.get("admin_data");
    if (adminData) {
      setUser(JSON.parse(adminData));
    }
    fetchAdmins();
  }, []);

  const handleEditAdmin = (adminToEdit: Admin) => {
    setEditingAdmin(adminToEdit);
  };

  const handleDeleteAdmin = async (adminEmail: string) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      const response = await del(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/${adminEmail}`
      );
      if (response) {
        toast.success("Admin deleted successfully!");
        fetchAdmins(); // Refresh the admin list
      }
    }
  };

  const handleCloseModal = () => {
    setEditingAdmin(null);
  };

  const handleLogout = () => {
    Cookies.remove("admin_token");
    Cookies.remove("admin_data");
    router.push("/");
  };

  if (loading && !editingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner color="border-purple-600" size="xl" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Management - Point Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />

        <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8 sm:max-w-7xl">
          <div className="py-6 sm:px-0">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Admin Management
                </h2>
                <Link href="/dashboard" className="btn btn-secondary">
                  Dashboard
                </Link>
              </div>

              <AdminList
                admins={admins}
                onEdit={handleEditAdmin}
                onDelete={handleDeleteAdmin}
              />
            </Card>
          </div>
        </main>
      </div>

      {editingAdmin && (
        <EditAdminModal
          admin={editingAdmin}
          onClose={handleCloseModal}
          onAdminUpdated={fetchAdmins}
        />
      )}
    </>
  );
}

export default withAuth(AdminManagement);