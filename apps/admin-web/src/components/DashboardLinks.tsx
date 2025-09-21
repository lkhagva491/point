import Link from "next/link";

const DashboardLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">
          Admin Management
        </h3>
        <p className="text-purple-700 mb-4">
          Manage admin accounts, edit details, or delete admins.
        </p>
        <Link
          href="/admin-management"
          className="btn bg-purple-600 text-white hover:bg-purple-700"
        >
          View Admins
        </Link>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Users Management
        </h3>
        <p className="text-blue-700 mb-4">
          Manage user accounts, edit details, or delete users.
        </p>
        <Link
          href="/users-management"
          className="btn bg-blue-600 text-white hover:bg-blue-700"
        >
          View Users
        </Link>
      </div>
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Deposit Requests
        </h3>
        <p className="text-green-700 mb-4">
          Review and manage pending user deposit requests.
        </p>
        <Link
          href="/deposit-requests"
          className="btn bg-green-600 text-white hover:bg-green-700"
        >
          View Requests
        </Link>
      </div>
    </div>
  );
};

export default DashboardLinks;
