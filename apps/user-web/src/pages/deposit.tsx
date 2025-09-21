import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Link from "next/link";
import { User } from "../types";
import withAuth from "../hooks/withAuth";
import useApi from "../hooks/useApi";
import Header from "../components/Header";
import DepositForm from "../components/DepositForm";
import { Card } from "@point/ui";

function Deposit() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { post, loading, error } = useApi();

  useEffect(() => {
    const userData = Cookies.get("user_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = async (amount: number) => {
    const currentUser = JSON.parse(Cookies.get("user_data") || "{}");

    const response = await post(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/deposit`,
      {
        userEmail: currentUser.email,
        requestedAmount: amount,
      }
    );

    if (response) {
      toast.success("Deposit request submitted successfully!");
      router.push("/transaction-history");
    }
  };

  const handleLogout = () => {
    Cookies.remove("user_token");
    Cookies.remove("user_data");
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Deposit Points - Point</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Deposit Points
                </h2>
                <div className="flex space-x-2">
                  <Link href="/dashboard" className="btn btn-secondary">
                    Dashboard
                  </Link>
                  <Link
                    href="/transaction-history"
                    className="btn bg-purple-600 text-white hover:bg-purple-700"
                  >
                    View History
                  </Link>
                </div>
              </div>

              <DepositForm
                onSubmit={handleSubmit}
                loading={loading}
                error={error || ""}
              />
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuth(Deposit);