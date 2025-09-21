import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import { Transaction, User } from "../types";
import withAuth from "../hooks/withAuth";
import useApi from "../hooks/useApi";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import { Card, LoadingSpinner } from "@point/ui";

function TransactionHistory() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { get, loading, error } = useApi();

  useEffect(() => {
    const userData = Cookies.get("user_data");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchTransactions(parsedUser.email);
    }
  }, []);

  const fetchTransactions = async (email: string) => {
    const data = await get(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/user/${email}`
    );
    if (data) {
      setTransactions(data);
    }
  };

  const handleLogout = () => {
    Cookies.remove("user_token");
    Cookies.remove("user_data");
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
        <title>Transaction History - Point</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Transaction History
                </h2>
                <div className="flex space-x-2">
                  <Link href="/dashboard" className="btn btn-secondary">
                    Dashboard
                  </Link>
                  <Link
                    href="/deposit"
                    className="btn bg-green-600 text-white hover:bg-green-700"
                  >
                    Deposit
                  </Link>
                </div>
              </div>

              {transactions.length === 0 ? (
                <p className="text-gray-600">No transactions found.</p>
              ) : (
                <TransactionList transactions={transactions} />
              )}
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuth(TransactionHistory);
