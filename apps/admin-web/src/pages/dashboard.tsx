import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { User } from "../types";
import withAuth from "../hooks/withAuth";
import Header from "../components/Header";
import DashboardLinks from "../components/DashboardLinks";
import { Card } from "@point/ui";

function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = Cookies.get("admin_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("admin_token");
    Cookies.remove("admin_data");
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Dashboard - Point Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Admin Dashboard
              </h2>

              <DashboardLinks />
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuth(Dashboard);