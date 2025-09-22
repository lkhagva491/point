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
import { Card, LoadingSpinner, Pagination } from "@point/ui";
import { useTranslation } from "react-i18next";

const TRANSACTIONS_PER_PAGE = 10;

function TransactionHistory() {
  const { t } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { get, loading, error } = useApi();

  useEffect(() => {
    const userData = Cookies.get("user_data");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchTransactions(parsedUser.email, currentPage, TRANSACTIONS_PER_PAGE);
    }
  }, [currentPage]);

  const fetchTransactions = async (
    email: string,
    page: number,
    limit: number,
  ) => {
    const data = await get(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/user/${email}?page=${page}&limit=${limit}`,
    );
    if (data && data.transactions && data.totalCount !== undefined) {
      setTransactions(data.transactions);
      setTotalCount(data.totalCount);
    }
  };

  const handleLogout = () => {
    Cookies.remove("user_token");
    Cookies.remove("user_data");
    router.push("/");
  };

  const totalPages = Math.ceil(totalCount / TRANSACTIONS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner color="border-purple-600" size="xl" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{t('error_message', { error })}</div>;
  }

  return (
    <>
      <Head>
        <title>{t('transaction_history_page_title')}</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('transaction_history_title')}
                </h2>
                <div className="flex space-x-2">
                  <Link href="/dashboard" className="btn btn-secondary">
                    {t('dashboard_button')}
                  </Link>
                  <Link
                    href="/deposit"
                    className="btn bg-green-600 text-white hover:bg-green-700"
                  >
                    {t('deposit_link')}
                  </Link>
                </div>
              </div>

              {transactions.length === 0 ? (
                <p className="text-gray-600">{t('no_transactions_found')}</p>
              ) : (
                <TransactionList transactions={transactions} />
              )}

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
    </>
  );
}

export default withAuth(TransactionHistory);