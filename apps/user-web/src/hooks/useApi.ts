import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const useApi = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        Cookies.remove("user_token");
        Cookies.remove("user_data");
        router.push("/login?message=Session expired. Please log in again.");
      } else {
        setError(err.response?.data?.message || "An error occurred");
      }
    } else {
      setError("An unexpected error occurred");
    }
  };

  const get = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("user_token");
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const post = async (url: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("user_token");
      const response = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const patch = async (url: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("user_token");
      const response = await axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return { get, post, patch, loading, error };
};

export default useApi;
