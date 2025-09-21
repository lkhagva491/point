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
import { Card, LoadingSpinner, Pagination } from "@point/ui";

const ADMINS_PER_PAGE = 10;

function AdminManagement() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { get, del, loading } = useApi();

  const fetchAdmins = async (page: number, limit: number) => {
    const data = await get(
      `${process.env.NEXT_PUBLIC_API_URL}/admins?page=${page}&limit=${limit}`
    );
    if (data && data.admins && data.totalCount !== undefined) {
      setAdmins(data.admins);
      setTotalCount(data.totalCount);
    }
  };

  useEffect(() => {
    const adminData = Cookies.get("admin_data");
    if (adminData) {
      setUser(JSON.parse(adminData));
    }
    fetchAdmins(currentPage, ADMINS_PER_PAGE);
  }, [currentPage]);

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
        fetchAdmins(currentPage, ADMINS_PER_PAGE); // Refresh the admin list
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

  const totalPages = Math.ceil(totalCount / ADMINS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </Card>
          </div>
        </main>
      </div>

      {editingAdmin && (
        <EditAdminModal
          admin={editingAdmin}
          onClose={handleCloseModal}
          onAdminUpdated={() => fetchAdmins(currentPage, ADMINS_PER_PAGE)}
        />
      )}
    </>
  );
}

export default withAuth(AdminManagement);