import Link from "next/link";

const DashboardLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-primary-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">Profile</h3>
        <p className="text-primary-700 mb-4">Manage account settings.</p>
        <Link href="/change-password" className="btn btn-primary">
          Change Password
        </Link>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Deposit Points
        </h3>
        <p className="text-green-700 mb-4">
          Request to deposit points into your account.
        </p>
        <Link
          href="/deposit"
          className="btn bg-green-600 text-white hover:bg-green-700"
        >
          Deposit
        </Link>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">
          Transaction History
        </h3>
        <p className="text-purple-700 mb-4">
          View your past point transactions.
        </p>
        <Link
          href="/transaction-history"
          className="btn bg-purple-600 text-white hover:bg-purple-700"
        >
          View History
        </Link>
      </div>
    </div>
  );
};

export default DashboardLinks;
