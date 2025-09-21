import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import useApi from "../hooks/useApi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Transaction, User } from "../types";
import withAuth from "../hooks/withAuth";
import Header from "../components/Header";
import RequestList from "../components/RequestList";
import { Card, LoadingSpinner } from "@point/ui";

function DepositRequests() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<Transaction[]>([]);
  const { get, patch, loading, error } = useApi();

  const fetchDepositRequests = async () => {
    const response = await get(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions`
    );
    if (response) {
      setRequests(
        response.filter(
          (req: Transaction) =>
            req.type === "deposit" && req.status === "pending"
        )
      );
    }
  };

  useEffect(() => {
    const userData = Cookies.get("admin_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDepositRequests();
  }, []);

  const handleStatusUpdate = async (
    id: string,
    status: "approved" | "declined"
  ) => {
    const adminUser = JSON.parse(Cookies.get("admin_data") || "{}");
    const approvedByAdminEmail = adminUser.email;

    const response = await patch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/deposit/${id}/status`,
      {
        status,
        approvedByAdminEmail,
      }
    );

    if (response) {
      toast.success(`Deposit request ${status} successfully!`);
      fetchDepositRequests();
    }
  };

  const handleLogout = () => {
    Cookies.remove("admin_token");
    Cookies.remove("admin_data");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner color="border-purple-600" size="xl" />
      </div>
    );
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
        <Header user={user} onLogout={handleLogout} />

        {/* Main Content */}
        <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8 sm:max-w-7xl">
          <div className="py-6 sm:px-0">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Pending Deposit Requests
                </h2>
                <Link href="/dashboard" className="btn btn-secondary">
                  Dashboard
                </Link>
              </div>

              {requests.length === 0 ? (
                <p className="text-gray-600">
                  No pending deposit requests found.
                </p>
              ) : (
                <RequestList
                  requests={requests}
                  onStatusUpdate={handleStatusUpdate}
                  loading={loading}
                />
              )}
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuth(DepositRequests);
