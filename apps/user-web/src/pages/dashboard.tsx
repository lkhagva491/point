import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { User } from "../types";
import withAuth from "../hooks/withAuth";
import useApi from "../hooks/useApi";
import Header from "../components/Header";
import DashboardLinks from "../components/DashboardLinks";
import AccountInfo from "../components/AccountInfo";
import { Card, LoadingSpinner } from "@point/ui";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { post, loading } = useApi();

  const fetchUserData = async () => {
    const response = await post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      {}
    );
    if (response) {
      setUser(response);
      Cookies.set("user_data", JSON.stringify(response), { expires: 7 });
      return response;
    }
    return null;
  };

  useEffect(() => {
    const userData = Cookies.get("user_data");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      fetchUserData();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUserData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("user_token");
    Cookies.remove("user_data");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner color="border-purple-600" size="xl" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t('dashboard_page_title')}</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('dashboard_title')}
              </h2>

              <DashboardLinks />

              <AccountInfo user={user} />
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
