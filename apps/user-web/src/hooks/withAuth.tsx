import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("user_token");
      const userData = Cookies.get("user_data");

      if (!token || !userData) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
