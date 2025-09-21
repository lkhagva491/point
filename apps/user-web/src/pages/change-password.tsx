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
import ChangePasswordForm from "../components/ChangePasswordForm";
import { Card, LoadingSpinner } from "@point/ui";

function ChangePassword() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { patch, loading, error } = useApi();

  useEffect(() => {
    const userData = Cookies.get("user_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = async (formData: any) => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const currentUser = JSON.parse(Cookies.get("user_data") || "{}");

    const response = await patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser.email}/password`,
      formData
    );

    if (response) {
      toast.success("Password changed successfully!");
      router.push("/dashboard");
    }
  };

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
        <title>Change Password - Point</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Change Password
                </h2>
                <Link href="/dashboard" className="btn btn-secondary">
                  Dashboard
                </Link>
              </div>

              <ChangePasswordForm
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

export default withAuth(ChangePassword);
